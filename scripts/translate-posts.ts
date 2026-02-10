#!/usr/bin/env node
/**
 * Batch Translation Script
 * 
 * Automates translation of all blog posts to Spanish and French.
 * Usage: npx tsx scripts/translate-posts.ts [--languages=es,fr] [--slugs=slug1,slug2]
 * 
 * @module scripts/translate-posts
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';

// =============================================================================
// CONFIGURATION
// =============================================================================

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const POSTS_DIR = join(__dirname, '../src/lib/content/posts');
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

// Default languages to translate to
const DEFAULT_LANGUAGES: SupportedLanguage[] = ['es', 'fr'];

// Rate limiting (DeepL Free: ~30 requests per minute)
const RATE_LIMIT_DELAY = 2000; // 2 seconds between requests

// =============================================================================
// TYPES
// =============================================================================

type SupportedLanguage = 'es' | 'fr';

interface TranslationResult {
  slug: string;
  language: SupportedLanguage;
  success: boolean;
  segmentsTranslated: number;
  qualityScore: number;
  outputPath: string;
  error?: string;
  warnings: string[];
}

interface TranslatableSegment {
  id: string;
  type: 'text' | 'attribute' | 'script-string';
  content: string;
  original: string;
}

// =============================================================================
// UTILITIES
// =============================================================================

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function log(message: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    error: '\x1b[31m',   // Red
    warn: '\x1b[33m'     // Yellow
  };
  const reset = '\x1b[0m';
  console.log(`${colors[type]}[${type.toUpperCase()}]${reset} ${message}`);
}

function parseArgs(): { languages: SupportedLanguage[]; slugs?: string[] } {
  const args = process.argv.slice(2);
  const result: { languages: SupportedLanguage[]; slugs?: string[] } = {
    languages: DEFAULT_LANGUAGES
  };

  for (const arg of args) {
    if (arg.startsWith('--languages=')) {
      const langs = arg.replace('--languages=', '').split(',') as SupportedLanguage[];
      result.languages = langs.filter(l => ['es', 'fr'].includes(l));
    }
    if (arg.startsWith('--slugs=')) {
      result.slugs = arg.replace('--slugs=', '').split(',');
    }
  }

  return result;
}

// =============================================================================
// CONTENT EXTRACTION
// =============================================================================

/**
 * Parse Svelte component into parts
 */
function parseSvelteComponent(content: string): { script: string; template: string } {
  const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  const script = scriptMatch ? scriptMatch[1].trim() : '';
  let template = content;
  
  if (scriptMatch) {
    template = template.replace(scriptMatch[0], '');
  }
  
  return { script, template: template.trim() };
}

/**
 * Extract translatable segments from template
 */
function extractTranslatableSegments(template: string): TranslatableSegment[] {
  const segments: TranslatableSegment[] = [];
  let segmentId = 0;
  
  // Extract text content between HTML tags
  const textContentRegex = />([^<]*[a-zA-Z]{3,}[^<]*)</g;
  let match;
  
  while ((match = textContentRegex.exec(template)) !== null) {
    const content = match[1].trim();
    
    // Skip Svelte expressions and empty text
    if (!content || content.includes('{') || /^[\s\d\W]+$/.test(content)) {
      continue;
    }
    
    segments.push({
      id: `text_${segmentId++}`,
      type: 'text',
      content,
      original: match[0]
    });
  }
  
  // Extract alt/title attributes
  const attrRegex = /\b(alt|title|placeholder)=["']([^"']+)["']/g;
  while ((match = attrRegex.exec(template)) !== null) {
    segments.push({
      id: `attr_${segmentId++}`,
      type: 'attribute',
      content: match[2],
      original: match[0]
    });
  }
  
  return segments;
}

// =============================================================================
// TRANSLATION
// =============================================================================

/**
 * Translate text using DeepL API
 */
async function translateWithDeepL(
  text: string,
  targetLang: SupportedLanguage
): Promise<string | null> {
  if (!DEEPL_API_KEY) {
    throw new Error('DEEPL_API_KEY environment variable not set');
  }
  
  const langMap: Record<SupportedLanguage, string> = { es: 'ES', fr: 'FR' };
  
  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: [text],
        target_lang: langMap[targetLang],
        preserve_formatting: true,
        tag_handling: 'html'
      })
    });
    
    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.translations?.[0]?.text || null;
  } catch (err) {
    console.error('Translation error:', err);
    return null;
  }
}

/**
 * Protect ASINs in text
 */
function protectAsins(text: string): { text: string; asins: Map<string, string> } {
  const asins = new Map<string, string>();
  let protectedText = text;
  let index = 0;
  
  protectedText = protectedText.replace(/B[A-Z0-9]{9}/g, (asin) => {
    const placeholder = `__ASIN_${index++}__`;
    asins.set(placeholder, asin);
    return placeholder;
  });
  
  return { text: protectedText, asins };
}

function restoreAsins(text: string, asins: Map<string, string>): string {
  let result = text;
  asins.forEach((asin, placeholder) => {
    result = result.replace(new RegExp(placeholder, 'g'), asin);
  });
  return result;
}

// =============================================================================
// FILE GENERATION
// =============================================================================

/**
 * Generate translated Svelte component
 */
function generateTranslatedComponent(
  originalContent: string,
  translations: Map<string, string>,
  segments: TranslatableSegment[]
): string {
  let translatedContent = originalContent;
  
  // Apply translations
  for (const segment of segments) {
    const translated = translations.get(segment.id);
    if (!translated) continue;
    
    if (segment.type === 'text') {
      // Replace text between tags
      const escapedContent = segment.content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(>)${escapedContent}(<)`, 'g');
      translatedContent = translatedContent.replace(regex, `$1${translated}$2`);
    } else if (segment.type === 'attribute') {
      // Replace attribute values
      const escapedContent = segment.content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(alt|title|placeholder)=(["'])${escapedContent}\\2`, 'g');
      translatedContent = translatedContent.replace(regex, `$1=$2${translated}$2`);
    }
  }
  
  // Add translation comment at the top
  return `<!-- Translated automatically - Please review for accuracy -->\n${translatedContent}`;
}

// =============================================================================
// MAIN TRANSLATION FUNCTION
// =============================================================================

/**
 * Translate a single blog post
 */
async function translatePost(
  slug: string,
  targetLang: SupportedLanguage
): Promise<TranslationResult> {
  const warnings: string[] = [];
  
  log(`Translating ${slug} to ${targetLang}...`);
  
  try {
    // Read source file
    const sourcePath = join(POSTS_DIR, `${slug}.svelte`);
    if (!existsSync(sourcePath)) {
      return {
        slug,
        language: targetLang,
        success: false,
        segmentsTranslated: 0,
        qualityScore: 0,
        outputPath: '',
        error: `Source file not found: ${sourcePath}`,
        warnings
      };
    }
    
    const sourceContent = readFileSync(sourcePath, 'utf-8');
    const { template } = parseSvelteComponent(sourceContent);
    const segments = extractTranslatableSegments(template);
    
    if (segments.length === 0) {
      return {
        slug,
        language: targetLang,
        success: false,
        segmentsTranslated: 0,
        qualityScore: 0,
        outputPath: '',
        error: 'No translatable content found',
        warnings
      };
    }
    
    log(`  Found ${segments.length} translatable segments`);
    
    // Translate segments
    const translations = new Map<string, string>();
    let successCount = 0;
    
    for (const segment of segments) {
      // Protect ASINs
      const { text: protectedText, asins } = protectAsins(segment.content);
      
      // Translate
      const translated = await translateWithDeepL(protectedText, targetLang);
      
      if (translated) {
        // Restore ASINs
        const finalText = restoreAsins(translated, asins);
        translations.set(segment.id, finalText);
        successCount++;
      } else {
        warnings.push(`Failed to translate segment ${segment.id}`);
      }
      
      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    }
    
    // Generate translated component
    const translatedContent = generateTranslatedComponent(
      sourceContent,
      translations,
      segments
    );
    
    // Write output file
    const outputPath = join(POSTS_DIR, `${slug}.${targetLang}.svelte`);
    writeFileSync(outputPath, translatedContent, 'utf-8');
    
    // Calculate quality score
    const qualityScore = Math.round((successCount / segments.length) * 100);
    
    log(`  ✓ Translated ${successCount}/${segments.length} segments (${qualityScore}% quality)`, 'success');
    
    return {
      slug,
      language: targetLang,
      success: true,
      segmentsTranslated: successCount,
      qualityScore,
      outputPath,
      warnings
    };
    
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    log(`  ✗ Translation failed: ${errorMessage}`, 'error');
    
    return {
      slug,
      language: targetLang,
      success: false,
      segmentsTranslated: 0,
      qualityScore: 0,
      outputPath: '',
      error: errorMessage,
      warnings
    };
  }
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  console.log('\n');
  log('═══════════════════════════════════════════════', 'info');
  log('    HAIRVEN BLOG TRANSLATION SCRIPT', 'info');
  log('═══════════════════════════════════════════════', 'info');
  console.log('\n');
  
  // Check for DeepL API key
  if (!DEEPL_API_KEY) {
    log('Error: DEEPL_API_KEY environment variable not set', 'error');
    log('Set it with: export DEEPL_API_KEY=your_api_key', 'info');
    process.exit(1);
  }
  
  // Parse arguments
  const args = parseArgs();
  
  // Get list of posts to translate
  let slugs: string[] = [];
  
  if (args.slugs) {
    slugs = args.slugs;
  } else {
    // Get all .svelte files (excluding translations)
    const files = readdirSync(POSTS_DIR);
    slugs = files
      .filter(f => extname(f) === '.svelte' && !f.includes('.es.') && !f.includes('.fr.'))
      .map(f => basename(f, '.svelte'))
      .filter(f => f !== 'index' && f !== 'default');
  }
  
  log(`Found ${slugs.length} posts to translate`);
  log(`Target languages: ${args.languages.join(', ')}`);
  console.log('\n');
  
  // Track results
  const results: TranslationResult[] = [];
  let current = 0;
  const total = slugs.length * args.languages.length;
  
  // Translate each post
  for (const slug of slugs) {
    for (const lang of args.languages) {
      current++;
      log(`[${current}/${total}] Processing ${slug}.${lang}...`);
      
      const result = await translatePost(slug, lang);
      results.push(result);
      
      console.log('\n');
    }
  }
  
  // Summary
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const avgQuality = successful.length > 0
    ? Math.round(successful.reduce((sum, r) => sum + r.qualityScore, 0) / successful.length)
    : 0;
  
  log('═══════════════════════════════════════════════', 'info');
  log('    TRANSLATION SUMMARY', 'info');
  log('═══════════════════════════════════════════════', 'info');
  console.log('\n');
  
  log(`Total: ${results.length} translations`, 'info');
  log(`Successful: ${successful.length}`, 'success');
  log(`Failed: ${failed.length}`, failed.length > 0 ? 'error' : 'info');
  log(`Average Quality: ${avgQuality}%`, avgQuality >= 80 ? 'success' : avgQuality >= 60 ? 'warn' : 'error');
  console.log('\n');
  
  if (failed.length > 0) {
    log('Failed translations:', 'error');
    failed.forEach(f => {
      log(`  - ${f.slug}.${f.language}: ${f.error}`, 'error');
    });
    console.log('\n');
  }
  
  // Exit with error code if any translations failed
  process.exit(failed.length > 0 ? 1 : 0);
}

// Run main
main().catch(err => {
  log(`Fatal error: ${err.message}`, 'error');
  process.exit(1);
});
