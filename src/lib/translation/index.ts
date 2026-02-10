/**
 * Translation Module
 * 
 * Main exports for the translation system.
 * 
 * @module lib/translation
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

// Service exports
export {
  translate,
  translateBatch,
  translateWithContext,
  translateServerSide,
  translateBatchServerSide,
  calculateQualityScore,
  calculateQualityMetrics,
  clearTranslationCache,
  isTranslationAvailable,
  getTranslationStats,
  estimateTranslationCost,
  type SupportedLanguage,
  type TranslationOptions,
  type TranslationResult,
  type TranslationCacheEntry,
  type QualityMetrics
} from './service';

// Blog translator exports
export {
  parseSvelteComponent,
  extractTranslatableSegments,
  extractScriptStrings,
  translateBlogPost,
  translateMultiplePosts,
  translatePostMetadata,
  analyzePostForTranslation,
  type BlogPostContent,
  type TranslatableSegment,
  type BlogTranslationResult,
  type TranslationProgress,
  type PostMetadata
} from './blog-translator';
