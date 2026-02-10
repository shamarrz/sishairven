/**
 * Translation API Route
 * 
 * POST /api/admin/translate - Trigger translation for one or more posts
 * Supports single post translation and batch translation
 * 
 * @module routes/api/admin/translate
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { translateBlogPost, type SupportedLanguage } from '$lib/translation/blog-translator';
import {
  getOrCreateTranslationRecord,
  updateTranslationStatus,
  markTranslationCompleted,
  markTranslationFailed,
  createBatchJob,
  updateBatchJobProgress,
  type TranslationRecord
} from '$lib/db/translations';
import { posts, type BlogPost } from '$lib/content/posts';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// =============================================================================
// AUTHENTICATION
// =============================================================================

// Simple API key authentication
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'dev-key-change-in-production';

function authenticate(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.slice(7);
  return token === ADMIN_API_KEY;
}

// =============================================================================
// REQUEST TYPES
// =============================================================================

interface SingleTranslationRequest {
  slug: string;
  languages: SupportedLanguage[];
}

interface BatchTranslationRequest {
  batch: true;
  slugs?: string[]; // If not provided, translate all posts
  languages: SupportedLanguage[];
}

type TranslationRequest = SingleTranslationRequest | BatchTranslationRequest;

interface TranslationResponse {
  success: boolean;
  message: string;
  results: Array<{
    slug: string;
    language: SupportedLanguage;
    success: boolean;
    qualityScore: number;
    outputPath?: string;
    error?: string;
  }>;
  batchJobId?: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const POSTS_DIR = join(process.cwd(), 'src/lib/content/posts');

/**
 * Read source content for a blog post
 */
function readPostContent(slug: string): string | null {
  // Check for existing .svelte file
  const sveltePath = join(POSTS_DIR, `${slug}.svelte`);
  
  if (existsSync(sveltePath)) {
    try {
      return readFileSync(sveltePath, 'utf-8');
    } catch (e) {
      console.error(`Failed to read ${sveltePath}:`, e);
      return null;
    }
  }
  
  return null;
}

/**
 * Write translated content to file
 */
function writeTranslatedContent(
  slug: string,
  language: SupportedLanguage,
  content: string
): string | null {
  const outputPath = join(POSTS_DIR, `${slug}.${language}.svelte`);
  
  try {
    writeFileSync(outputPath, content, 'utf-8');
    return outputPath;
  } catch (e) {
    console.error(`Failed to write ${outputPath}:`, e);
    return null;
  }
}

/**
 * Get post metadata
 */
function getPostMetadata(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

// =============================================================================
// SINGLE TRANSLATION
// =============================================================================

/**
 * Translate a single blog post
 */
async function translateSinglePost(
  slug: string,
  languages: SupportedLanguage[]
): Promise<TranslationResponse['results']> {
  const results: TranslationResponse['results'] = [];
  
  // Get source content
  const sourceContent = readPostContent(slug);
  if (!sourceContent) {
    return languages.map(lang => ({
      slug,
      language: lang,
      success: false,
      qualityScore: 0,
      error: 'Source content not found'
    }));
  }
  
  // Translate for each language
  for (const language of languages) {
    // Get or create record
    const record = getOrCreateTranslationRecord(slug, language, sourceContent);
    
    // Update status to in_progress
    updateTranslationStatus(slug, language, { status: 'in_progress' });
    
    try {
      // Perform translation
      const translationResult = await translateBlogPost(
        slug,
        sourceContent,
        language,
        (phase, percent) => {
          console.log(`[${slug}.${language}] ${phase}: ${percent}%`);
        }
      );
      
      if (translationResult.success) {
        // Write translated file
        const outputPath = writeTranslatedContent(slug, language, sourceContent);
        
        if (outputPath) {
          // Mark as completed
          markTranslationCompleted(
            slug,
            language,
            translationResult.qualityScore,
            translationResult.segmentsTranslated
          );
          
          results.push({
            slug,
            language,
            success: true,
            qualityScore: translationResult.qualityScore,
            outputPath
          });
        } else {
          markTranslationFailed(slug, language, 'Failed to write output file');
          results.push({
            slug,
            language,
            success: false,
            qualityScore: 0,
            error: 'Failed to write output file'
          });
        }
      } else {
        markTranslationFailed(slug, language, translationResult.error || 'Unknown error');
        results.push({
          slug,
          language,
          success: false,
          qualityScore: 0,
          error: translationResult.error
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      markTranslationFailed(slug, language, errorMessage);
      results.push({
        slug,
        language,
        success: false,
        qualityScore: 0,
        error: errorMessage
      });
    }
  }
  
  return results;
}

// =============================================================================
// BATCH TRANSLATION
// =============================================================================

/**
 * Process batch translation asynchronously
 */
async function processBatchTranslation(
  jobId: string,
  slugs: string[],
  languages: SupportedLanguage[]
): Promise<void> {
  let completedCount = 0;
  let failedCount = 0;
  
  for (const slug of slugs) {
    try {
      const results = await translateSinglePost(slug, languages);
      
      const allSuccess = results.every(r => r.success);
      if (allSuccess) {
        completedCount++;
      } else {
        failedCount++;
      }
    } catch (err) {
      console.error(`Batch translation failed for ${slug}:`, err);
      failedCount++;
    }
    
    // Update progress
    updateBatchJobProgress(jobId, completedCount, failedCount);
    
    // Small delay to prevent rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// =============================================================================
// API HANDLER
// =============================================================================

export const POST: RequestHandler = async ({ request }) => {
  // Authenticate
  if (!authenticate(request)) {
    throw error(401, 'Unauthorized');
  }
  
  try {
    const body: TranslationRequest = await request.json();
    
    // Validate request
    if (!body.languages || body.languages.length === 0) {
      throw error(400, 'At least one target language is required');
    }
    
    // Handle batch translation
    if ('batch' in body && body.batch) {
      const slugs = body.slugs || posts.filter(p => p.published).map(p => p.slug);
      
      // Create batch job
      const totalPosts = slugs.length * body.languages.length;
      const batchJob = createBatchJob(totalPosts, body.languages, 'api');
      
      // Start async processing
      processBatchTranslation(batchJob.id, slugs, body.languages).catch(err => {
        console.error('Batch translation failed:', err);
      });
      
      return json({
        success: true,
        message: `Batch translation started for ${slugs.length} posts in ${body.languages.length} languages`,
        results: [],
        batchJobId: batchJob.id
      } as TranslationResponse);
    }
    
    // Handle single translation
    if (!body.slug) {
      throw error(400, 'Post slug is required');
    }
    
    const results = await translateSinglePost(body.slug, body.languages);
    
    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;
    
    return json({
      success: successCount === totalCount,
      message: `Translated ${successCount}/${totalCount} language variants`,
      results
    } as TranslationResponse);
    
  } catch (err) {
    if (err instanceof Error && 'status' in err) {
      throw err;
    }
    console.error('Translation API error:', err);
    throw error(500, 'Internal server error');
  }
};

// =============================================================================
// GET HANDLER - Get translation options/info
// =============================================================================

export const GET: RequestHandler = async ({ request }) => {
  // Authenticate
  if (!authenticate(request)) {
    throw error(401, 'Unauthorized');
  }
  
  return json({
    supportedLanguages: [
      { code: 'es', name: 'Spanish', nameNative: 'Español' },
      { code: 'fr', name: 'French', nameNative: 'Français' }
    ],
    availablePosts: posts.filter(p => p.published).map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category
    })),
    deeplConfigured: !!process.env.DEEPL_API_KEY
  });
};
