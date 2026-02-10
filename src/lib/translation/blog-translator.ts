/**
 * Blog Post Translation System
 * 
 * Extracts text from .svelte blog post components, translates content,
 * and creates new {slug}.{lang}.svelte files while preserving HTML structure,
 * component imports, and affiliate links.
 * 
 * @module lib/translation/blog-translator
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import type { SupportedLanguage, TranslationResult } from './service';
import { translateServerSide, calculateQualityScore } from './service';

// =============================================================================
// TYPES
// =============================================================================

export interface BlogPostContent {
  script: string;
  template: string;
  style?: string;
}

export interface TranslatableSegment {
  id: string;
  type: 'text' | 'attribute' | 'script-string';
  content: string;
  context: string;
  lineNumber: number;
}

export interface BlogTranslationResult {
  slug: string;
  language: SupportedLanguage;
  success: boolean;
  segmentsTranslated: number;
  qualityScore: number;
  outputPath: string;
  error?: string;
  warnings: string[];
}

export interface TranslationProgress {
  currentPost: number;
  totalPosts: number;
  currentLanguage: SupportedLanguage;
  phase: 'extracting' | 'translating' | 'generating' | 'complete';
  percentComplete: number;
}

// =============================================================================
// CONTENT EXTRACTION
// =============================================================================

/**
 * Parse a Svelte component into its parts
 */
export function parseSvelteComponent(content: string): BlogPostContent {
  const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  
  let template = content;
  let script = '';
  let style = '';
  
  if (scriptMatch) {
    script = scriptMatch[1].trim();
    template = template.replace(scriptMatch[0], '');
  }
  
  if (styleMatch) {
    style = styleMatch[1].trim();
    template = template.replace(styleMatch[0], '');
  }
  
  template = template.trim();
  
  return { script, template, style };
}

/**
 * Extract translatable segments from template HTML
 * Preserves Svelte syntax, components, and expressions
 */
export function extractTranslatableSegments(template: string): TranslatableSegment[] {
  const segments: TranslatableSegment[] = [];
  let segmentId = 0;
  
  // Split by lines for line number tracking
  const lines = template.split('\n');
  
  lines.forEach((line, lineIndex) => {
    const lineNumber = lineIndex + 1;
    
    // Skip Svelte logic blocks and component tags
    if (/^\s*{#/.test(line) || /^\s*{:else/.test(line)) {
      return;
    }
    
    // Extract text content between HTML tags
    // Pattern: >text content<
    const textContentRegex = />([^<]*[a-zA-Z]{3,}[^<]*)</g;
    let match;
    
    while ((match = textContentRegex.exec(line)) !== null) {
      const content = match[1].trim();
      
      // Skip if empty or just whitespace/special chars
      if (!content || /^[\s\d\W]+$/.test(content)) {
        continue;
      }
      
      // Skip if it contains Svelte expressions
      if (content.includes('{') && content.includes('}')) {
        continue;
      }
      
      // Skip URLs and paths
      if (/^(https?:|www\.|\/)/.test(content)) {
        continue;
      }
      
      segments.push({
        id: `text_${segmentId++}`,
        type: 'text',
        content,
        context: 'html_content',
        lineNumber
      });
    }
    
    // Extract alt and title attributes
    const attrRegex = /\b(alt|title|placeholder|aria-label)=["']([^"']+)["']/g;
    while ((match = attrRegex.exec(line)) !== null) {
      segments.push({
        id: `attr_${segmentId++}`,
        type: 'attribute',
        content: match[2],
        context: `${match[1]}_attribute`,
        lineNumber
      });
    }
  });
  
  return segments;
}

/**
 * Extract translatable strings from script section
 * Finds string literals that likely contain user-facing text
 */
export function extractScriptStrings(script: string): TranslatableSegment[] {
  const segments: TranslatableSegment[] = [];
  let segmentId = 0;
  
  const lines = script.split('\n');
  
  lines.forEach((line, lineIndex) => {
    const lineNumber = lineIndex + 1;
    
    // Skip import statements
    if (/^\s*import\s/.test(line)) {
      return;
    }
    
    // Extract quoted strings that look like content
    const stringRegex = /["']([^"']{5,})["']/g;
    let match;
    
    while ((match = stringRegex.exec(line)) !== null) {
      const content = match[1];
      
      // Skip if looks like code (camelCase, paths, etc.)
      if (/^[a-z]+[A-Z]/.test(content) || 
          content.includes('/') || 
          content.startsWith('B') && /^B[A-Z0-9]{9}$/.test(content)) { // ASIN
        continue;
      }
      
      // Skip if it looks like a CSS class
      if (content.includes('-') && !content.includes(' ')) {
        continue;
      }
      
      segments.push({
        id: `script_${segmentId++}`,
        type: 'script-string',
        content,
        context: 'script_content',
        lineNumber
      });
    }
  });
  
  return segments;
}

// =============================================================================
// HTML STRUCTURE PRESERVATION
// =============================================================================

/**
 * Escape special regex characters
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Replace text in template while preserving surrounding HTML
 */
function replaceTextInTemplate(
  template: string,
  originalText: string,
  translatedText: string
): string {
  // Create a safe replacement that preserves surrounding context
  const escapedOriginal = escapeRegex(originalText);
  
  // Match text between > and <
  const regex = new RegExp(`(>)${escapedOriginal}(<)`, 'g');
  
  return template.replace(regex, `$1${translatedText}$2`);
}

/**
 * Replace attribute values in template
 */
function replaceAttributeInTemplate(
  template: string,
  attrName: string,
  originalValue: string,
  translatedValue: string
): string {
  const escapedOriginal = escapeRegex(originalValue);
  const regex = new RegExp(`(${attrName}=["'])${escapedOriginal}(["'])`, 'g');
  
  return template.replace(regex, `$1${translatedValue}$2`);
}

/**
 * Replace string in script section
 */
function replaceStringInScript(
  script: string,
  originalString: string,
  translatedString: string
): string {
  // Use a more careful replacement to avoid replacing partial matches
  const escapedOriginal = escapeRegex(originalString);
  
  // Match the string with quotes
  const doubleQuoteRegex = new RegExp(`"${escapedOriginal}"`, 'g');
  const singleQuoteRegex = new RegExp(`'${escapedOriginal}'`, 'g');
  
  let result = script.replace(doubleQuoteRegex, `"${translatedString}"`);
  result = result.replace(singleQuoteRegex, `'${translatedString}'`);
  
  return result;
}

// =============================================================================
// ASIN & AFFILIATE LINK PROTECTION
// =============================================================================

/**
 * ASIN pattern (Amazon product IDs)
 */
const ASIN_PATTERN = /B[A-Z0-9]{9}/g;

/**
 * Protect ASINs in text by wrapping them in placeholders
 */
function protectAsins(text: string): { text: string; asins: Map<string, string> } {
  const asins = new Map<string, string>();
  let protectedText = text;
  let placeholderIndex = 0;
  
  protectedText = protectedText.replace(ASIN_PATTERN, (asin) => {
    const placeholder = `__ASIN_${placeholderIndex++}__`;
    asins.set(placeholder, asin);
    return placeholder;
  });
  
  return { text: protectedText, asins };
}

/**
 * Restore ASINs in text
 */
function restoreAsins(text: string, asins: Map<string, string>): string {
  let restoredText = text;
  
  asins.forEach((asin, placeholder) => {
    restoredText = restoredText.replace(new RegExp(placeholder, 'g'), asin);
  });
  
  return restoredText;
}

/**
 * Validate that all ASINs are preserved
 */
function validateAsinPreservation(
  originalText: string,
  translatedText: string
): { valid: boolean; missing: string[] } {
  const originalAsins = originalText.match(ASIN_PATTERN) || [];
  const translatedAsins = translatedText.match(ASIN_PATTERN) || [];
  
  const missing = originalAsins.filter(asin => !translatedAsins.includes(asin));
  
  return {
    valid: missing.length === 0,
    missing
  };
}

// =============================================================================
// TRANSLATION GENERATION
// =============================================================================

/**
 * Translate a blog post component
 */
export async function translateBlogPost(
  slug: string,
  sourceContent: string,
  targetLang: SupportedLanguage,
  onProgress?: (phase: TranslationProgress['phase'], percent: number) => void
): Promise<BlogTranslationResult> {
  const warnings: string[] = [];
  
  try {
    // Phase 1: Parse component
    onProgress?.('extracting', 10);
    const { script, template, style } = parseSvelteComponent(sourceContent);
    
    // Phase 2: Extract translatable content
    onProgress?.('extracting', 20);
    const templateSegments = extractTranslatableSegments(template);
    const scriptSegments = extractScriptStrings(script);
    const allSegments = [...templateSegments, ...scriptSegments];
    
    if (allSegments.length === 0) {
      return {
        slug,
        language: targetLang,
        success: false,
        segmentsTranslated: 0,
        qualityScore: 0,
        outputPath: '',
        error: 'No translatable content found',
        warnings: ['Post appears to have no translatable text content']
      };
    }
    
    // Phase 3: Translate segments
    onProgress?.('translating', 30);
    const translatedTemplate = { ...template };
    const translatedScript = { ...script };
    let currentProgress = 30;
    const progressPerSegment = 50 / allSegments.length;
    
    const translationResults: TranslationResult[] = [];
    
    for (const segment of allSegments) {
      // Protect ASINs before translation
      const { text: protectedContent, asins } = protectAsins(segment.content);
      
      // Translate
      const result = await translateServerSide(protectedContent, targetLang);
      
      // Restore ASINs
      const translatedContent = restoreAsins(result.text, asins);
      
      // Validate ASIN preservation
      const asinCheck = validateAsinPreservation(segment.content, translatedContent);
      if (!asinCheck.valid) {
        warnings.push(`ASINs may have been lost in segment ${segment.id}: ${asinCheck.missing.join(', ')}`);
      }
      
      // Apply translation based on segment type
      if (segment.type === 'text') {
        translatedTemplate[0] = replaceTextInTemplate(
          translatedTemplate[0] || template,
          segment.content,
          translatedContent
        );
      } else if (segment.type === 'attribute') {
        // Determine attribute name from context
        const attrName = segment.context.replace('_attribute', '');
        translatedTemplate[0] = replaceAttributeInTemplate(
          translatedTemplate[0] || template,
          attrName,
          segment.content,
          translatedContent
        );
      } else if (segment.type === 'script-string') {
        translatedScript[0] = replaceStringInScript(
          translatedScript[0] || script,
          segment.content,
          translatedContent
        );
      }
      
      translationResults.push({
        ...result,
        text: translatedContent
      });
      
      currentProgress += progressPerSegment;
      onProgress?.('translating', Math.min(currentProgress, 80));
    }
    
    // Phase 4: Generate translated component
    onProgress?.('generating', 80);
    
    const finalTemplate = translatedTemplate[0] || template;
    const finalScript = translatedScript[0] || script;
    
    const translatedComponent = generateTranslatedComponent(
      finalScript,
      finalTemplate,
      style,
      targetLang
    );
    
    // Calculate overall quality score
    const avgQuality = translationResults.length > 0
      ? translationResults.reduce((sum, r) => sum + r.qualityScore, 0) / translationResults.length
      : 0;
    
    onProgress?.('complete', 100);
    
    return {
      slug,
      language: targetLang,
      success: true,
      segmentsTranslated: allSegments.length,
      qualityScore: Math.round(avgQuality),
      outputPath: `src/lib/content/posts/${slug}.${targetLang}.svelte`,
      warnings
    };
    
  } catch (error) {
    console.error(`Translation failed for ${slug}:`, error);
    return {
      slug,
      language: targetLang,
      success: false,
      segmentsTranslated: 0,
      qualityScore: 0,
      outputPath: '',
      error: error instanceof Error ? error.message : 'Unknown error',
      warnings
    };
  }
}

/**
 * Generate the final translated Svelte component
 */
function generateTranslatedComponent(
  script: string,
  template: string,
  style: string | undefined,
  lang: SupportedLanguage
): string {
  const langComment = `<!-- Translated to ${lang.toUpperCase()} - Generated automatically -->`;
  
  let component = langComment + '\n';
  
  if (script) {
    component += `<script>\n${script}\n</script>\n\n`;
  }
  
  component += template;
  
  if (style) {
    component += `\n\n<style>\n${style}\n</style>`;
  }
  
  return component;
}

// =============================================================================
// BATCH TRANSLATION
// =============================================================================

/**
 * Translate multiple blog posts
 */
export async function translateMultiplePosts(
  posts: Array<{ slug: string; content: string }>,
  targetLangs: SupportedLanguage[],
  onProgress?: (progress: TranslationProgress) => void
): Promise<BlogTranslationResult[]> {
  const results: BlogTranslationResult[] = [];
  const totalPosts = posts.length * targetLangs.length;
  let currentPost = 0;
  
  for (const post of posts) {
    for (const lang of targetLangs) {
      currentPost++;
      
      onProgress?.({
        currentPost,
        totalPosts,
        currentLanguage: lang,
        phase: 'extracting',
        percentComplete: Math.round((currentPost - 1) / totalPosts * 100)
      });
      
      const result = await translateBlogPost(
        post.slug,
        post.content,
        lang,
        (phase, percent) => {
          onProgress?.({
            currentPost,
            totalPosts,
            currentLanguage: lang,
            phase,
            percentComplete: Math.round(
              ((currentPost - 1) / totalPosts + percent / 100 / totalPosts) * 100
            )
          });
        }
      );
      
      results.push(result);
    }
  }
  
  return results;
}

// =============================================================================
// POST METADATA TRANSLATION
// =============================================================================

/**
 * Translatable blog post metadata fields
 */
export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

/**
 * Translate blog post metadata (title, description, etc.)
 */
export async function translatePostMetadata(
  metadata: PostMetadata,
  targetLang: SupportedLanguage
): Promise<PostMetadata & { qualityScore: number }> {
  const [titleResult, descriptionResult] = await Promise.all([
    translateServerSide(metadata.title, targetLang),
    translateServerSide(metadata.description, targetLang)
  ]);
  
  // Tags are usually kept as-is or translated carefully
  const translatedTags = await Promise.all(
    metadata.tags.map(async (tag) => {
      const result = await translateServerSide(tag, targetLang);
      // Only use translation if quality is good
      return result.qualityScore > 70 ? result.text : tag;
    })
  );
  
  const avgQuality = Math.round(
    (titleResult.qualityScore + descriptionResult.qualityScore) / 2
  );
  
  return {
    slug: `${metadata.slug}`,
    title: titleResult.text,
    description: descriptionResult.text,
    category: metadata.category, // Categories usually stay in English
    tags: translatedTags,
    qualityScore: avgQuality
  };
}

// =============================================================================
// CONTENT ANALYSIS
// =============================================================================

/**
 * Analyze a blog post for translation complexity
 */
export function analyzePostForTranslation(content: string): {
  totalSegments: number;
  estimatedCost: number;
  estimatedTimeMinutes: number;
  hasProductCards: boolean;
  hasAffiliateLinks: boolean;
  complexity: 'simple' | 'moderate' | 'complex';
} {
  const { script, template } = parseSvelteComponent(content);
  const templateSegments = extractTranslatableSegments(template);
  const scriptSegments = extractScriptStrings(script);
  const totalSegments = templateSegments.length + scriptSegments.length;
  
  // Calculate total characters to translate
  const totalChars = [...templateSegments, ...scriptSegments]
    .reduce((sum, seg) => sum + seg.content.length, 0);
  
  // Check for ProductCard components
  const hasProductCards = content.includes('ProductCard') || 
                          content.includes('ProductCard');
  
  // Check for affiliate links
  const hasAffiliateLinks = content.includes('amazon') || 
                            content.includes('ASIN') || 
                            content.includes('createAmazonLink');
  
  // Determine complexity
  let complexity: 'simple' | 'moderate' | 'complex' = 'simple';
  if (totalSegments > 100 || hasProductCards) {
    complexity = 'complex';
  } else if (totalSegments > 50) {
    complexity = 'moderate';
  }
  
  // DeepL Pro: ~$0.00002 per character
  const estimatedCost = totalChars * 0.00002;
  
  // Estimate time (2 seconds per segment for API calls)
  const estimatedTimeMinutes = (totalSegments * 2) / 60;
  
  return {
    totalSegments,
    estimatedCost,
    estimatedTimeMinutes,
    hasProductCards,
    hasAffiliateLinks,
    complexity
  };
}
