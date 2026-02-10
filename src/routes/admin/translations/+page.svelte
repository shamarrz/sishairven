<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { _ } from 'svelte-i18n';

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

  interface Stats {
    totalPosts: number;
    translatedPosts: number;
    pendingTranslations: number;
    failedTranslations: number;
    averageQualityScore: number;
    completionPercentage: number;
    lastBatchRun: string | null;
  }

  interface BatchJob {
    id: string;
    status: 'running' | 'completed' | 'failed';
    progress: number;
    totalPosts: number;
    completedPosts: number;
  }

  // =============================================================================
  // STATE
  // =============================================================================
  
  let posts: PostStatus[] = [];
  let stats: Stats | null = null;
  let activeBatchJob: BatchJob | null = null;
  let loading = true;
  let error: string | null = null;
  let selectedLanguage: 'es' | 'fr' | 'both' = 'both';
  let searchQuery = '';
  let statusFilter: 'all' | 'complete' | 'incomplete' | 'needs-update' | 'failed' = 'all';
  let showPreviewModal = false;
  let previewPost: PostStatus | null = null;
  let isTranslating = false;
  let translationMessage = '';
  let adminKey = '';
  let showAdminKeyInput = false;

  // =============================================================================
  // API FUNCTIONS
  // =============================================================================
  
  const API_KEY = 'dev-key-change-in-production'; // In production, this should be securely managed

  async function fetchTranslationStatus() {
    try {
      const response = await fetch('/api/admin/translation-status', {
        headers: {
          'Authorization': `Bearer ${adminKey || API_KEY}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          showAdminKeyInput = true;
          throw new Error('Authentication required');
        }
        throw new Error('Failed to fetch translation status');
      }
      
      const data = await response.json();
      posts = data.posts;
      stats = data.stats;
      activeBatchJob = data.activeBatchJob;
      error = null;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  }

  async function translatePost(slug: string, languages: string[]) {
    isTranslating = true;
    translationMessage = `Translating ${slug}...`;
    
    try {
      const response = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey || API_KEY}`
        },
        body: JSON.stringify({ slug, languages })
      });
      
      if (!response.ok) {
        throw new Error('Translation request failed');
      }
      
      const data = await response.json();
      translationMessage = data.message;
      
      // Refresh status after a short delay
      setTimeout(fetchTranslationStatus, 2000);
    } catch (err) {
      translationMessage = err instanceof Error ? err.message : 'Translation failed';
    } finally {
      setTimeout(() => {
        isTranslating = false;
        translationMessage = '';
      }, 3000);
    }
  }

  async function translateBatch() {
    isTranslating = true;
    translationMessage = 'Starting batch translation...';
    
    const languages = selectedLanguage === 'both' ? ['es', 'fr'] : [selectedLanguage];
    
    try {
      const response = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey || API_KEY}`
        },
        body: JSON.stringify({ batch: true, languages })
      });
      
      if (!response.ok) {
        throw new Error('Batch translation request failed');
      }
      
      const data = await response.json();
      translationMessage = data.message;
      
      // Start polling for progress
      if (data.batchJobId) {
        pollBatchProgress(data.batchJobId);
      }
    } catch (err) {
      translationMessage = err instanceof Error ? err.message : 'Batch translation failed';
      isTranslating = false;
    }
  }

  async function pollBatchProgress(jobId: string) {
    const checkProgress = async () => {
      try {
        const response = await fetch(`/api/admin/translation-status?batchJobId=${jobId}`, {
          headers: {
            'Authorization': `Bearer ${adminKey || API_KEY}`
          }
        });
        
        if (response.ok) {
          const job = await response.json();
          activeBatchJob = job;
          translationMessage = `Batch progress: ${job.progress}% (${job.completedPosts}/${job.totalPosts})`;
          
          if (job.status === 'running') {
            setTimeout(checkProgress, 3000);
          } else {
            isTranslating = false;
            translationMessage = job.status === 'completed' ? 'Batch translation completed!' : 'Batch translation finished with errors';
            fetchTranslationStatus();
            setTimeout(() => { translationMessage = ''; }, 3000);
          }
        }
      } catch (err) {
        console.error('Error polling batch progress:', err);
      }
    };
    
    checkProgress();
  }

  // =============================================================================
  // COMPUTED VALUES
  // =============================================================================
  
  $: filteredPosts = posts.filter(post => {
    // Search filter
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !post.slug.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter === 'complete' && !post.isComplete) return false;
    if (statusFilter === 'incomplete' && post.isComplete) return false;
    if (statusFilter === 'needs-update' && !post.needsUpdate) return false;
    if (statusFilter === 'failed' && 
        post.es.status !== 'failed' && post.fr.status !== 'failed') return false;
    
    return true;
  });

  $: completedCount = posts.filter(p => p.isComplete).length;
  $: needsUpdateCount = posts.filter(p => p.needsUpdate).length;
  $: failedCount = posts.filter(p => p.es.status === 'failed' || p.fr.status === 'failed').length;

  // =============================================================================
  // HELPERS
  // =============================================================================
  
  function getStatusIcon(status: string | null): string {
    switch (status) {
      case 'completed': return '✓';
      case 'in_progress': return '⟳';
      case 'pending': return '○';
      case 'failed': return '✗';
      case 'outdated': return '!';
      default: return '-';
    }
  }

  function getStatusColor(status: string | null): string {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in_progress': return 'text-yellow-400';
      case 'pending': return 'text-gray-400';
      case 'failed': return 'text-red-400';
      case 'outdated': return 'text-orange-400';
      default: return 'text-gray-600';
    }
  }

  function getQualityBadgeClass(score: number): string {
    if (score >= 90) return 'bg-green-500/20 text-green-400';
    if (score >= 70) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // =============================================================================
  // LIFECYCLE
  // =============================================================================
  
  onMount(() => {
    fetchTranslationStatus();
    
    // Refresh every 30 seconds if there's an active batch job
    const interval = setInterval(() => {
      if (activeBatchJob?.status === 'running') {
        fetchTranslationStatus();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  });
</script>

<!-- Admin Key Input Modal -->
{#if showAdminKeyInput}
  <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" transition:fade>
    <div class="bg-black-soft p-6 rounded-lg max-w-md w-full mx-4 border border-gray-dark">
      <h2 class="text-xl font-bold text-white mb-4">Authentication Required</h2>
      <p class="text-gray-300 mb-4">Please enter your admin API key to access the translation management system.</p>
      <input
        type="password"
        bind:value={adminKey}
        placeholder="Enter admin API key"
        class="w-full px-4 py-2 bg-black border border-gray-dark rounded-lg text-white placeholder-gray-500 focus:border-pink-bright focus:outline-none mb-4"
      />
      <button
        on:click={() => { showAdminKeyInput = false; fetchTranslationStatus(); }}
        class="w-full px-4 py-2 bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors"
      >
        Access Dashboard
      </button>
    </div>
  </div>
{/if}

<div class="min-h-screen bg-black">
  <!-- Header -->
  <header class="bg-black-soft border-b border-gray-dark">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-display text-white">Translation Management</h1>
          <p class="text-gray-400 mt-1">Manage blog post translations to Spanish and French</p>
        </div>
        <a href="/" class="text-gray-400 hover:text-pink-bright transition-colors">
          ← Back to Site
        </a>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 py-8">
    {#if loading}
      <div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="animate-spin text-4xl mb-4">⟳</div>
          <p class="text-gray-400">Loading translation status...</p>
        </div>
      </div>
    {:else if error}
      <div class="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
        <p class="text-red-400">{error}</p>
        <button
          on:click={fetchTranslationStatus}
          class="mt-4 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          Retry
        </button>
      </div>
    {:else}
      <!-- Stats Cards -->
      {#if stats}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-black-soft rounded-lg p-4 border border-gray-dark">
            <p class="text-gray-400 text-sm">Completion</p>
            <p class="text-2xl font-bold text-white">{stats.completionPercentage}%</p>
            <div class="mt-2 h-2 bg-gray-dark rounded-full overflow-hidden">
              <div
                class="h-full bg-pink-bright transition-all duration-500"
                style="width: {stats.completionPercentage}%"
              ></div>
            </div>
          </div>
          
          <div class="bg-black-soft rounded-lg p-4 border border-gray-dark">
            <p class="text-gray-400 text-sm">Translated</p>
            <p class="text-2xl font-bold text-green-400">{stats.translatedPosts}</p>
            <p class="text-xs text-gray-500">of {stats.totalPosts * 2} variants</p>
          </div>
          
          <div class="bg-black-soft rounded-lg p-4 border border-gray-dark">
            <p class="text-gray-400 text-sm">Avg Quality</p>
            <p class="text-2xl font-bold {getQualityBadgeClass(stats.averageQualityScore).split(' ')[1]}">
              {stats.averageQualityScore}%
            </p>
            <p class="text-xs text-gray-500">quality score</p>
          </div>
          
          <div class="bg-black-soft rounded-lg p-4 border border-gray-dark">
            <p class="text-gray-400 text-sm">Pending</p>
            <p class="text-2xl font-bold text-yellow-400">{stats.pendingTranslations}</p>
            <p class="text-xs text-gray-500">
              {#if stats.lastBatchRun}
                Last run: {formatDate(stats.lastBatchRun)}
              {:else}
                Never run
              {/if}
            </p>
          </div>
        </div>
      {/if}

      <!-- Active Batch Job -->
      {#if activeBatchJob}
        <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8" transition:slide>
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold text-yellow-400">Batch Translation in Progress</h3>
            <span class="text-yellow-400 animate-pulse">⟳ Running</span>
          </div>
          <div class="h-2 bg-gray-dark rounded-full overflow-hidden">
            <div
              class="h-full bg-yellow-400 transition-all duration-500"
              style="width: {activeBatchJob.progress}%"
            ></div>
          </div>
          <p class="text-sm text-gray-400 mt-2">
            {activeBatchJob.completedPosts} of {activeBatchJob.totalPosts} posts completed
            ({activeBatchJob.progress}%)
          </p>
        </div>
      {/if}

      <!-- Translation Message -->
      {#if translationMessage}
        <div class="bg-pink-bright/10 border border-pink-bright/30 rounded-lg p-4 mb-8" transition:slide>
          <p class="text-pink-bright">{translationMessage}</p>
        </div>
      {/if}

      <!-- Controls -->
      <div class="bg-black-soft rounded-lg p-4 border border-gray-dark mb-8">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Search -->
          <div class="flex-1 min-w-[200px]">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search posts..."
              class="w-full px-4 py-2 bg-black border border-gray-dark rounded-lg text-white placeholder-gray-500 focus:border-pink-bright focus:outline-none"
            />
          </div>
          
          <!-- Status Filter -->
          <select
            bind:value={statusFilter}
            class="px-4 py-2 bg-black border border-gray-dark rounded-lg text-white focus:border-pink-bright focus:outline-none"
          >
            <option value="all">All Posts</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
            <option value="needs-update">Needs Update</option>
            <option value="failed">Failed</option>
          </select>
          
          <!-- Language Selector -->
          <select
            bind:value={selectedLanguage}
            class="px-4 py-2 bg-black border border-gray-dark rounded-lg text-white focus:border-pink-bright focus:outline-none"
          >
            <option value="both">Spanish & French</option>
            <option value="es">Spanish Only</option>
            <option value="fr">French Only</option>
          </select>
          
          <!-- Batch Translate Button -->
          <button
            on:click={translateBatch}
            disabled={isTranslating}
            class="px-6 py-2 bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTranslating ? 'Translating...' : 'Translate All'}
          </button>
        </div>
        
        <!-- Quick Stats -->
        <div class="flex gap-6 mt-4 text-sm">
          <span class="text-gray-400">
            <span class="text-green-400 font-semibold">{completedCount}</span> Complete
          </span>
          <span class="text-gray-400">
            <span class="text-orange-400 font-semibold">{needsUpdateCount}</span> Outdated
          </span>
          <span class="text-gray-400">
            <span class="text-red-400 font-semibold">{failedCount}</span> Failed
          </span>
          <span class="text-gray-400">
            Showing <span class="text-white font-semibold">{filteredPosts.length}</span> posts
          </span>
        </div>
      </div>

      <!-- Posts Table -->
      <div class="bg-black-soft rounded-lg border border-gray-dark overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-dark bg-black/50">
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Post</th>
                <th class="text-center py-3 px-4 text-gray-400 font-medium w-32">Spanish (ES)</th>
                <th class="text-center py-3 px-4 text-gray-400 font-medium w-32">French (FR)</th>
                <th class="text-center py-3 px-4 text-gray-400 font-medium w-24">Status</th>
                <th class="text-right py-3 px-4 text-gray-400 font-medium w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredPosts as post}
                <tr class="border-b border-gray-dark/50 hover:bg-white/5 transition-colors">
                  <td class="py-3 px-4">
                    <div>
                      <p class="text-white font-medium">{post.title}</p>
                      <p class="text-xs text-gray-500">{post.slug}</p>
                      <span class="inline-block mt-1 px-2 py-0.5 bg-gray-dark rounded text-xs text-gray-400">
                        {post.category}
                      </span>
                      {#if post.needsUpdate}
                        <span class="inline-block mt-1 ml-2 px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs">
                          Update Needed
                        </span>
                      {/if}
                    </div>
                  </td>
                  
                  <td class="py-3 px-4 text-center">
                    <div class="flex flex-col items-center">
                      <span class="text-xl {getStatusColor(post.es.status)}">
                        {getStatusIcon(post.es.status)}
                      </span>
                      {#if post.es.qualityScore > 0}
                        <span class="text-xs mt-1 {getQualityBadgeClass(post.es.qualityScore)}">
                          {post.es.qualityScore}%
                        </span>
                      {/if}
                      {#if post.es.translatedAt}
                        <span class="text-xs text-gray-500 mt-1">
                          {formatDate(post.es.translatedAt)}
                        </span>
                      {/if}
                    </div>
                  </td>
                  
                  <td class="py-3 px-4 text-center">
                    <div class="flex flex-col items-center">
                      <span class="text-xl {getStatusColor(post.fr.status)}">
                        {getStatusIcon(post.fr.status)}
                      </span>
                      {#if post.fr.qualityScore > 0}
                        <span class="text-xs mt-1 {getQualityBadgeClass(post.fr.qualityScore)}">
                          {post.fr.qualityScore}%
                        </span>
                      {/if}
                      {#if post.fr.translatedAt}
                        <span class="text-xs text-gray-500 mt-1">
                          {formatDate(post.fr.translatedAt)}
                        </span>
                      {/if}
                    </div>
                  </td>
                  
                  <td class="py-3 px-4 text-center">
                    {#if post.isComplete}
                      <span class="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        ✓ Complete
                      </span>
                    {:else if post.es.status === 'failed' || post.fr.status === 'failed'}
                      <span class="inline-flex items-center px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                        ✗ Failed
                      </span>
                    {:else}
                      <span class="inline-flex items-center px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                        ○ Pending
                      </span>
                    {/if}
                  </td>
                  
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        on:click={() => {
                          previewPost = post;
                          showPreviewModal = true;
                        }}
                        class="p-2 text-gray-400 hover:text-white transition-colors"
                        title="Preview"
                      >
                        👁
                      </button>
                      <button
                        on:click={() => translatePost(post.slug, selectedLanguage === 'both' ? ['es', 'fr'] : [selectedLanguage])}
                        disabled={isTranslating}
                        class="px-3 py-1 bg-pink-bright/20 text-pink-bright rounded text-xs hover:bg-pink-bright/30 transition-colors disabled:opacity-50"
                      >
                        Translate
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        
        {#if filteredPosts.length === 0}
          <div class="text-center py-12">
            <p class="text-gray-400">No posts match your filters</p>
          </div>
        {/if}
      </div>

      <!-- Legend -->
      <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div class="flex items-center gap-2">
          <span class="text-green-400">✓</span>
          <span class="text-gray-400">Completed</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-yellow-400">⟳</span>
          <span class="text-gray-400">In Progress</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-400">○</span>
          <span class="text-gray-400">Pending</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-red-400">✗</span>
          <span class="text-gray-400">Failed</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-orange-400">!</span>
          <span class="text-gray-400">Outdated</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-600">-</span>
          <span class="text-gray-400">Not Started</span>
        </div>
      </div>
    {/if}
  </main>
</div>

<!-- Preview Modal -->
{#if showPreviewModal && previewPost}
  <div
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    transition:fade
    on:click={() => showPreviewModal = false}
  >
    <div
      class="bg-black-soft rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-dark"
      on:click|stopPropagation
    >
      <div class="p-4 border-b border-gray-dark flex items-center justify-between">
        <h3 class="text-lg font-semibold text-white">Translation Preview</h3>
        <button
          on:click={() => showPreviewModal = false}
          class="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      <div class="p-4 overflow-y-auto max-h-[60vh]">
        <h4 class="text-white font-medium mb-2">{previewPost.title}</h4>
        <p class="text-gray-400 text-sm mb-4">Slug: {previewPost.slug}</p>
        
        <div class="space-y-4">
          <div class="bg-black p-4 rounded border border-gray-dark">
            <h5 class="text-pink-bright font-medium mb-2">Spanish (ES)</h5>
            <p class="text-sm text-gray-400">Status: <span class="{getStatusColor(previewPost.es.status)}">{previewPost.es.status || 'Not started'}</span></p>
            {#if previewPost.es.qualityScore > 0}
              <p class="text-sm text-gray-400">Quality: {previewPost.es.qualityScore}%</p>
            {/if}
            {#if previewPost.es.translatedAt}
              <p class="text-sm text-gray-400">Last translated: {formatDate(previewPost.es.translatedAt)}</p>
            {/if}
          </div>
          
          <div class="bg-black p-4 rounded border border-gray-dark">
            <h5 class="text-pink-bright font-medium mb-2">French (FR)</h5>
            <p class="text-sm text-gray-400">Status: <span class="{getStatusColor(previewPost.fr.status)}">{previewPost.fr.status || 'Not started'}</span></p>
            {#if previewPost.fr.qualityScore > 0}
              <p class="text-sm text-gray-400">Quality: {previewPost.fr.qualityScore}%</p>
            {/if}
            {#if previewPost.fr.translatedAt}
              <p class="text-sm text-gray-400">Last translated: {formatDate(previewPost.fr.translatedAt)}</p>
            {/if}
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-gray-dark flex justify-end gap-2">
        <button
          on:click={() => showPreviewModal = false}
          class="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Close
        </button>
        <button
          on:click={() => {
            showPreviewModal = false;
            translatePost(previewPost.slug, ['es', 'fr']);
          }}
          disabled={isTranslating}
          class="px-4 py-2 bg-pink-bright text-black font-semibold rounded-lg hover:bg-pink-medium transition-colors disabled:opacity-50"
        >
          Translate Now
        </button>
      </div>
    </div>
  </div>
{/if}
