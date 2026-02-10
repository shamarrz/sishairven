/**
 * Translation Status API Route
 * 
 * GET /api/admin/translation-status - Get translation status for all posts
 * GET /api/admin/translation-status?slug={slug} - Get status for specific post
 * GET /api/admin/translation-status?batchJobId={id} - Get batch job progress
 * 
 * @module routes/api/admin/translation-status
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
  getAllTranslationRecords,
  getPostTranslations,
  getTranslationStats,
  getPostTranslationSummary,
  getActiveBatchJob,
  getBatchJob,
  getRecentBatchJobs
} from '$lib/db/translations';
import { posts } from '$lib/content/posts';

// =============================================================================
// AUTHENTICATION
// =============================================================================

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
// TYPES
// =============================================================================

interface PostStatus {
  slug: string;
  title: string;
  category: string;
  es: {
    status: string | null;
    qualityScore: number;
    translatedAt: string | null;
  };
  fr: {
    status: string | null;
    qualityScore: number;
    translatedAt: string | null;
  };
  isComplete: boolean;
  needsUpdate: boolean;
}

interface StatusResponse {
  stats: {
    totalPosts: number;
    translatedPosts: number;
    pendingTranslations: number;
    failedTranslations: number;
    averageQualityScore: number;
    completionPercentage: number;
    lastBatchRun: string | null;
  };
  posts: PostStatus[];
  activeBatchJob: {
    id: string;
    status: string;
    progress: number;
    totalPosts: number;
    completedPosts: number;
  } | null;
}

// =============================================================================
// API HANDLER
// =============================================================================

export const GET: RequestHandler = async ({ request, url }) => {
  // Authenticate
  if (!authenticate(request)) {
    throw error(401, 'Unauthorized');
  }
  
  const slug = url.searchParams.get('slug');
  const batchJobId = url.searchParams.get('batchJobId');
  
  try {
    // Get specific batch job status
    if (batchJobId) {
      const job = getBatchJob(batchJobId);
      if (!job) {
        throw error(404, 'Batch job not found');
      }
      
      return json({
        id: job.id,
        status: job.status,
        startedAt: job.started_at,
        completedAt: job.completed_at,
        progress: job.total_posts > 0 
          ? Math.round((job.completed_posts / job.total_posts) * 100) 
          : 0,
        totalPosts: job.total_posts,
        completedPosts: job.completed_posts,
        failedPosts: job.failed_posts,
        targetLanguages: job.target_languages
      });
    }
    
    // Get specific post status
    if (slug) {
      const post = posts.find(p => p.slug === slug);
      if (!post) {
        throw error(404, 'Post not found');
      }
      
      const translations = getPostTranslations(slug);
      const summary = getPostTranslationSummary(slug);
      
      return json({
        slug: post.slug,
        title: post.title,
        category: post.category,
        translations: translations.map(t => ({
          language: t.language,
          status: t.status,
          qualityScore: t.quality_score,
          translatedAt: t.translated_at,
          updatedAt: t.updated_at,
          segmentsCount: t.segments_count,
          outputPath: t.output_path
        })),
        summary
      });
    }
    
    // Get all posts status
    const publishedPosts = posts.filter(p => p.published);
    const stats = getTranslationStats();
    
    const postsStatus: PostStatus[] = publishedPosts.map(post => {
      const summary = getPostTranslationSummary(post.slug);
      const translations = getPostTranslations(post.slug);
      
      const esTranslation = translations.find(t => t.language === 'es');
      const frTranslation = translations.find(t => t.language === 'fr');
      
      return {
        slug: post.slug,
        title: post.title,
        category: post.category,
        es: {
          status: summary.es,
          qualityScore: summary.esQuality,
          translatedAt: esTranslation?.translated_at || null
        },
        fr: {
          status: summary.fr,
          qualityScore: summary.frQuality,
          translatedAt: frTranslation?.translated_at || null
        },
        isComplete: summary.isComplete,
        needsUpdate: summary.needsUpdate
      };
    });
    
    // Calculate completion percentage
    const totalVariants = publishedPosts.length * 2; // es + fr
    const completionPercentage = totalVariants > 0 
      ? Math.round((stats.translatedPosts / totalVariants) * 100) 
      : 0;
    
    // Get active batch job
    const activeJob = getActiveBatchJob();
    
    const response: StatusResponse = {
      stats: {
        totalPosts: stats.totalPosts,
        translatedPosts: stats.translatedPosts,
        pendingTranslations: stats.pendingTranslations,
        failedTranslations: stats.failedTranslations,
        averageQualityScore: stats.averageQualityScore,
        completionPercentage,
        lastBatchRun: stats.lastBatchRun
      },
      posts: postsStatus,
      activeBatchJob: activeJob ? {
        id: activeJob.id,
        status: activeJob.status,
        progress: activeJob.total_posts > 0 
          ? Math.round((activeJob.completed_posts / activeJob.total_posts) * 100) 
          : 0,
        totalPosts: activeJob.total_posts,
        completedPosts: activeJob.completed_posts
      } : null
    };
    
    return json(response);
    
  } catch (err) {
    if (err instanceof Error && 'status' in err) {
      throw err;
    }
    console.error('Translation status API error:', err);
    throw error(500, 'Internal server error');
  }
};

// =============================================================================
// RECENT BATCH JOBS ENDPOINT
// =============================================================================

export const POST: RequestHandler = async ({ request, url }) => {
  // Authenticate
  if (!authenticate(request)) {
    throw error(401, 'Unauthorized');
  }
  
  const action = url.searchParams.get('action');
  
  if (action === 'recent-jobs') {
    const jobs = getRecentBatchJobs(10);
    return json({
      jobs: jobs.map(job => ({
        id: job.id,
        status: job.status,
        startedAt: job.started_at,
        completedAt: job.completed_at,
        progress: job.total_posts > 0 
          ? Math.round((job.completed_posts / job.total_posts) * 100) 
          : 0,
        totalPosts: job.total_posts,
        targetLanguages: job.target_languages
      }))
    });
  }
  
  throw error(400, 'Invalid action');
};
