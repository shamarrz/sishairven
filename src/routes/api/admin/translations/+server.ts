import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { generateTranslationData } from '$lib/admin/mockData';
import { posts } from '$lib/content/posts';
import type { TranslationJob } from '$lib/admin/types';

const jobQueue: TranslationJob[] = [];
let jobIdCounter = 1;

export const GET: RequestHandler = async () => {
  try {
    const data = generateTranslationData();
    
    const realPosts = posts.filter(p => p.published).map(post => {
      const existing = data.posts.find(dp => dp.slug === post.slug);
      if (existing) return existing;
      
      return {
        slug: post.slug,
        title: post.title,
        sourceLanguage: 'en',
        translations: ['es', 'fr', 'de', 'pt', 'it'].map(lang => ({
          language: lang,
          status: 'pending' as const,
          progress: 0,
          wordCount: post.readingTime * 200
        }))
      };
    });
    
    return json({
      success: true,
      data: {
        posts: realPosts,
        jobs: [...data.jobs, ...jobQueue]
      },
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Translations API error:', error);
    return json({
      success: false,
      error: 'Internal server error',
      timestamp: Date.now()
    }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    
    if (body.slug && body.language) {
      const job: TranslationJob = {
        id: `job_${String(jobIdCounter++).padStart(3, '0')}`,
        slug: body.slug,
        targetLanguage: body.language,
        status: 'queued',
        progress: 0,
        createdAt: new Date().toISOString()
      };
      
      jobQueue.push(job);
      
      setTimeout(() => {
        job.status = 'processing';
        job.startedAt = new Date().toISOString();
        
        const progressInterval = setInterval(() => {
          job.progress += Math.floor(Math.random() * 20) + 10;
          if (job.progress >= 100) {
            job.progress = 100;
            job.status = 'completed';
            job.completedAt = new Date().toISOString();
            clearInterval(progressInterval);
          }
        }, 1000);
      }, 500);
      
      return json({
        success: true,
        data: { job },
        message: `Translation job created for ${body.slug} -> ${body.language}`
      });
    }
    
    return json({
      success: false,
      error: 'Missing required fields: slug, language'
    }, { status: 400 });
  } catch (error) {
    console.error('Translation POST error:', error);
    return json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ url }) => {
  try {
    const jobId = url.searchParams.get('jobId');
    
    if (jobId) {
      const index = jobQueue.findIndex(j => j.id === jobId);
      if (index > -1) {
        jobQueue.splice(index, 1);
        return json({ success: true, message: `Job ${jobId} cancelled` });
      }
      return json({ success: false, error: 'Job not found' }, { status: 404 });
    }
    
    return json({ success: false, error: 'Missing jobId parameter' }, { status: 400 });
  } catch (error) {
    console.error('Translation DELETE error:', error);
    return json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
};
