/**
 * Translation Database Schema
 * 
 * Tracks translation status, quality scores, and metadata for blog posts.
 * Uses the existing JSON-based database pattern from db.ts.
 * 
 * @module lib/db/translations
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { dirname, join } from 'path';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';

// =============================================================================
// CONFIGURATION
// =============================================================================

const DB_PATH = process.env.TRANSLATIONS_DB_PATH || '/data/translations.json';
const DB_DIR = dirname(DB_PATH);

// Ensure directory exists
try {
  mkdirSync(DB_DIR, { recursive: true });
} catch (err) {
  // Directory might already exist
}

// =============================================================================
// TYPES
// =============================================================================

export type TranslationStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'outdated';
export type SupportedLanguage = 'es' | 'fr';

export interface TranslationRecord {
  id: string;
  post_slug: string;
  language: SupportedLanguage;
  status: TranslationStatus;
  quality_score: number;
  translated_at: string | null;
  updated_at: string;
  error_message?: string;
  segments_count: number;
  translated_by: 'api' | 'manual' | 'batch';
  source_hash: string; // Hash of source content for change detection
  output_path: string;
}

export interface TranslationStats {
  totalPosts: number;
  translatedPosts: number;
  pendingTranslations: number;
  failedTranslations: number;
  averageQualityScore: number;
  lastBatchRun: string | null;
}

export interface BatchTranslationJob {
  id: string;
  started_at: string;
  completed_at: string | null;
  status: 'running' | 'completed' | 'failed';
  total_posts: number;
  completed_posts: number;
  failed_posts: number;
  target_languages: SupportedLanguage[];
  initiated_by: string;
}

// =============================================================================
// DATABASE INITIALIZATION
// =============================================================================

interface TranslationDatabase {
  records: TranslationRecord[];
  batchJobs: BatchTranslationJob[];
  lastUpdated: string;
}

function initializeDatabase(): TranslationDatabase {
  if (!existsSync(DB_PATH)) {
    const initialData: TranslationDatabase = {
      records: [],
      batchJobs: [],
      lastUpdated: new Date().toISOString()
    };
    writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  
  try {
    const data = readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    // If corrupted, reset
    const initialData: TranslationDatabase = {
      records: [],
      batchJobs: [],
      lastUpdated: new Date().toISOString()
    };
    writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveDatabase(db: TranslationDatabase): void {
  db.lastUpdated = new Date().toISOString();
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

// =============================================================================
// RECORD MANAGEMENT
// =============================================================================

/**
 * Generate a unique ID for translation records
 */
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a hash of content for change detection
 */
export function generateContentHash(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

/**
 * Get or create a translation record
 */
export function getOrCreateTranslationRecord(
  postSlug: string,
  language: SupportedLanguage,
  sourceContent: string
): TranslationRecord {
  const db = initializeDatabase();
  const sourceHash = generateContentHash(sourceContent);
  
  const existingRecord = db.records.find(
    r => r.post_slug === postSlug && r.language === language
  );
  
  if (existingRecord) {
    // Check if source content has changed
    if (existingRecord.source_hash !== sourceHash && existingRecord.status === 'completed') {
      existingRecord.status = 'outdated';
      existingRecord.updated_at = new Date().toISOString();
      saveDatabase(db);
    }
    return existingRecord;
  }
  
  // Create new record
  const newRecord: TranslationRecord = {
    id: generateId(),
    post_slug: postSlug,
    language,
    status: 'pending',
    quality_score: 0,
    translated_at: null,
    updated_at: new Date().toISOString(),
    segments_count: 0,
    translated_by: 'api',
    source_hash: sourceHash,
    output_path: `src/lib/content/posts/${postSlug}.${language}.svelte`
  };
  
  db.records.push(newRecord);
  saveDatabase(db);
  
  return newRecord;
}

/**
 * Update translation record status
 */
export function updateTranslationStatus(
  postSlug: string,
  language: SupportedLanguage,
  updates: Partial<TranslationRecord>
): TranslationRecord | null {
  const db = initializeDatabase();
  
  const recordIndex = db.records.findIndex(
    r => r.post_slug === postSlug && r.language === language
  );
  
  if (recordIndex === -1) {
    return null;
  }
  
  db.records[recordIndex] = {
    ...db.records[recordIndex],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  saveDatabase(db);
  return db.records[recordIndex];
}

/**
 * Mark translation as completed
 */
export function markTranslationCompleted(
  postSlug: string,
  language: SupportedLanguage,
  qualityScore: number,
  segmentsCount: number
): TranslationRecord | null {
  return updateTranslationStatus(postSlug, language, {
    status: 'completed',
    quality_score: qualityScore,
    segments_count: segmentsCount,
    translated_at: new Date().toISOString()
  });
}

/**
 * Mark translation as failed
 */
export function markTranslationFailed(
  postSlug: string,
  language: SupportedLanguage,
  errorMessage: string
): TranslationRecord | null {
  return updateTranslationStatus(postSlug, language, {
    status: 'failed',
    error_message: errorMessage
  });
}

// =============================================================================
// QUERIES
// =============================================================================

/**
 * Get translation record by slug and language
 */
export function getTranslationRecord(
  postSlug: string,
  language: SupportedLanguage
): TranslationRecord | undefined {
  const db = initializeDatabase();
  return db.records.find(r => r.post_slug === postSlug && r.language === language);
}

/**
 * Get all translation records for a post
 */
export function getPostTranslations(postSlug: string): TranslationRecord[] {
  const db = initializeDatabase();
  return db.records.filter(r => r.post_slug === postSlug);
}

/**
 * Get all translation records
 */
export function getAllTranslationRecords(): TranslationRecord[] {
  const db = initializeDatabase();
  return db.records;
}

/**
 * Get translations by status
 */
export function getTranslationsByStatus(status: TranslationStatus): TranslationRecord[] {
  const db = initializeDatabase();
  return db.records.filter(r => r.status === status);
}

/**
 * Get translation statistics
 */
export function getTranslationStats(): TranslationStats {
  const db = initializeDatabase();
  const records = db.records;
  
  const completedRecords = records.filter(r => r.status === 'completed');
  const pendingRecords = records.filter(r => r.status === 'pending' || r.status === 'in_progress');
  const failedRecords = records.filter(r => r.status === 'failed');
  
  const totalQuality = completedRecords.reduce((sum, r) => sum + r.quality_score, 0);
  
  // Get unique post slugs
  const uniqueSlugs = new Set(records.map(r => r.post_slug));
  
  // Get last batch job
  const lastBatch = db.batchJobs
    .filter(j => j.status === 'completed')
    .sort((a, b) => new Date(b.completed_at || 0).getTime() - new Date(a.completed_at || 0).getTime())[0];
  
  return {
    totalPosts: uniqueSlugs.size,
    translatedPosts: completedRecords.length,
    pendingTranslations: pendingRecords.length,
    failedTranslations: failedRecords.length,
    averageQualityScore: completedRecords.length > 0 ? Math.round(totalQuality / completedRecords.length) : 0,
    lastBatchRun: lastBatch?.completed_at || null
  };
}

/**
 * Get translation status summary for a post
 */
export function getPostTranslationSummary(postSlug: string): {
  es: TranslationStatus | null;
  fr: TranslationStatus | null;
  esQuality: number;
  frQuality: number;
  isComplete: boolean;
  needsUpdate: boolean;
} {
  const records = getPostTranslations(postSlug);
  
  const esRecord = records.find(r => r.language === 'es');
  const frRecord = records.find(r => r.language === 'fr');
  
  const es = esRecord?.status || null;
  const fr = frRecord?.status || null;
  
  const isComplete = es === 'completed' && fr === 'completed';
  const needsUpdate = es === 'outdated' || fr === 'outdated';
  
  return {
    es,
    fr,
    esQuality: esRecord?.quality_score || 0,
    frQuality: frRecord?.quality_score || 0,
    isComplete,
    needsUpdate
  };
}

// =============================================================================
// BATCH JOB MANAGEMENT
// =============================================================================

/**
 * Create a new batch translation job
 */
export function createBatchJob(
  totalPosts: number,
  targetLanguages: SupportedLanguage[],
  initiatedBy: string = 'system'
): BatchTranslationJob {
  const db = initializeDatabase();
  
  const job: BatchTranslationJob = {
    id: generateId(),
    started_at: new Date().toISOString(),
    completed_at: null,
    status: 'running',
    total_posts: totalPosts,
    completed_posts: 0,
    failed_posts: 0,
    target_languages: targetLanguages,
    initiated_by: initiatedBy
  };
  
  db.batchJobs.push(job);
  saveDatabase(db);
  
  return job;
}

/**
 * Update batch job progress
 */
export function updateBatchJobProgress(
  jobId: string,
  completedPosts: number,
  failedPosts: number
): BatchTranslationJob | null {
  const db = initializeDatabase();
  
  const job = db.batchJobs.find(j => j.id === jobId);
  if (!job) return null;
  
  job.completed_posts = completedPosts;
  job.failed_posts = failedPosts;
  
  if (completedPosts + failedPosts >= job.total_posts) {
    job.status = failedPosts > 0 ? 'failed' : 'completed';
    job.completed_at = new Date().toISOString();
  }
  
  saveDatabase(db);
  return job;
}

/**
 * Get active batch job
 */
export function getActiveBatchJob(): BatchTranslationJob | null {
  const db = initializeDatabase();
  return db.batchJobs.find(j => j.status === 'running') || null;
}

/**
 * Get batch job by ID
 */
export function getBatchJob(jobId: string): BatchTranslationJob | null {
  const db = initializeDatabase();
  return db.batchJobs.find(j => j.id === jobId) || null;
}

/**
 * Get recent batch jobs
 */
export function getRecentBatchJobs(limit: number = 10): BatchTranslationJob[] {
  const db = initializeDatabase();
  return db.batchJobs
    .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
    .slice(0, limit);
}

// =============================================================================
// CLEANUP OPERATIONS
// =============================================================================

/**
 * Delete translation record
 */
export function deleteTranslationRecord(postSlug: string, language: SupportedLanguage): boolean {
  const db = initializeDatabase();
  const initialLength = db.records.length;
  
  db.records = db.records.filter(
    r => !(r.post_slug === postSlug && r.language === language)
  );
  
  if (db.records.length < initialLength) {
    saveDatabase(db);
    return true;
  }
  
  return false;
}

/**
 * Reset all translations (use with caution!)
 */
export function resetAllTranslations(): void {
  const db: TranslationDatabase = {
    records: [],
    batchJobs: [],
    lastUpdated: new Date().toISOString()
  };
  saveDatabase(db);
}

/**
 * Clean up old batch jobs
 */
export function cleanupOldBatchJobs(olderThanDays: number = 30): number {
  const db = initializeDatabase();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - olderThanDays);
  
  const initialLength = db.batchJobs.length;
  
  db.batchJobs = db.batchJobs.filter(j => 
    j.status === 'running' || new Date(j.started_at) > cutoff
  );
  
  const removed = initialLength - db.batchJobs.length;
  if (removed > 0) {
    saveDatabase(db);
  }
  
  return removed;
}

// =============================================================================
// IMPORT/EXPORT
// =============================================================================

/**
 * Export all translation data
 */
export function exportTranslationData(): TranslationDatabase {
  return initializeDatabase();
}

/**
 * Import translation data
 */
export function importTranslationData(data: TranslationDatabase): void {
  saveDatabase(data);
}
