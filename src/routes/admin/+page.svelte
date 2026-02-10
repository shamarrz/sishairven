<script lang="ts">
  /**
   * Admin Dashboard Overview Page
   * 
   * Displays key performance indicators, live activity feed,
   * and quick insights for the admin.
   * 
   * @component AdminDashboardPage
   * @author Hairven Dev Team
   * @since 2026-02-10
   */
  
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { 
    dashboardStats, 
    liveActivityStore,
    fetchDashboardStats,
    timeRangeStore,
    loadingStore
  } from '$lib/admin/stores';
  import type { TimeRange, LiveActivity } from '$lib/admin/types';
  
  Chart.register(...registerables);
  
  // Time range options
  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];
  
  // Chart instances
  let trafficChart: Chart | null = null;
  let revenueChart: Chart | null = null;
  let trafficCanvas: HTMLCanvasElement;
  let revenueCanvas: HTMLCanvasElement;
  
  // Format currency
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  }
  
  // Format number
  function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
  
  // Get activity icon
  function getActivityIcon(type: LiveActivity['type']): string {
    switch (type) {
      case 'click': return '🖱️';
      case 'conversion': return '💰';
      case 'proxy_request': return '🔒';
      default: return '👁️';
    }
  }
  
  // Get activity color
  function getActivityColor(type: LiveActivity['type']): string {
    switch (type) {
      case 'click': return 'text-blue-400';
      case 'conversion': return 'text-green-400';
      case 'proxy_request': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  }
  
  // Initialize charts
  function initCharts() {
    if (!trafficCanvas || !revenueCanvas) return;
    
    // Traffic Chart
    const trafficCtx = trafficCanvas.getContext('2d');
    if (trafficCtx) {
      trafficChart = new Chart(trafficCtx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toLocaleDateString('en-US', { weekday: 'short' });
          }),
          datasets: [{
            label: 'Visitors',
            data: [320, 450, 380, 520, 480, 590, $dashboardStats.todayVisitors],
            borderColor: '#ff1493',
            backgroundColor: 'rgba(255, 20, 147, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#ff1493',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: '#6b6b6b' }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: '#6b6b6b' }
            }
          }
        }
      });
    }
    
    // Revenue Chart
    const revenueCtx = revenueCanvas.getContext('2d');
    if (revenueCtx) {
      revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
          labels: ['US', 'GB', 'CA', 'AU', 'DE', 'FR'],
          datasets: [{
            label: 'Revenue',
            data: [450, 180, 120, 95, 85, 70],
            backgroundColor: [
              '#ff1493',
              '#ff69b4',
              '#ffb6d9',
              '#c71585',
              '#db2777',
              '#ec4899'
            ],
            borderRadius: 4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#6b6b6b' }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { 
                color: '#6b6b6b',
                callback: (value) => '$' + value
              }
            }
          }
        }
      });
    }
  }
  
  onMount(() => {
    fetchDashboardStats();
    initCharts();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000);
    
    return () => {
      clearInterval(interval);
    };
  });
  
  onDestroy(() => {
    trafficChart?.destroy();
    revenueChart?.destroy();
  });
</script>

<div class="space-y-6">
  <!-- Time Range Selector -->
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-semibold text-white">Overview</h2>
    <div class="flex bg-black-soft rounded-lg p-1">
      {#each timeRanges as range}
        <button
          class="px-4 py-2 rounded-md text-sm font-medium transition-all"
          class:bg-pink-bright={$timeRangeStore === range.value}
          class:text-white={$timeRangeStore === range.value}
          class:text-gray-medium={$timeRangeStore !== range.value}
          class:hover:text-white={$timeRangeStore !== range.value}
          on:click={() => timeRangeStore.set(range.value)}
        >
          {range.label}
        </button>
      {/each}
    </div>
  </div>
  
  <!-- KPI Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Visitors Card -->
    <div class="bg-black-soft rounded-xl p-6 border border-gray-dark/50 hover:border-pink-bright/50 transition-all">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-pink-bright/10 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-pink-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <span 
          class="text-sm font-medium flex items-center gap-1"
          class:text-green-400={$dashboardStats.visitorChange >= 0}
          class:text-red-400={$dashboardStats.visitorChange < 0}
        >
          {$dashboardStats.visitorChange >= 0 ? '↑' : '↓'} {Math.abs($dashboardStats.visitorChange)}%
        </span>
      </div>
      <p class="text-3xl font-bold text-white">{formatNumber($dashboardStats.todayVisitors)}</p>
      <p class="text-sm text-gray-medium mt-1">Today's Visitors</p>
    </div>
    
    <!-- Clicks Card -->
    <div class="bg-black-soft rounded-xl p-6 border border-gray-dark/50 hover:border-pink-bright/50 transition-all">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
          </svg>
        </div>
        <span 
          class="text-sm font-medium flex items-center gap-1"
          class:text-green-400={$dashboardStats.clickChange >= 0}
          class:text-red-400={$dashboardStats.clickChange < 0}
        >
          {$dashboardStats.clickChange >= 0 ? '↑' : '↓'} {Math.abs($dashboardStats.clickChange)}%
        </span>
      </div>
      <p class="text-3xl font-bold text-white">{$dashboardStats.todayClicks}</p>
      <p class="text-sm text-gray-medium mt-1">Affiliate Clicks</p>
    </div>
    
    <!-- Revenue Card -->
    <div class="bg-black-soft rounded-xl p-6 border border-gray-dark/50 hover:border-pink-bright/50 transition-all">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <span 
          class="text-sm font-medium flex items-center gap-1"
          class:text-green-400={$dashboardStats.revenueChange >= 0}
          class:text-red-400={$dashboardStats.revenueChange < 0}
        >
          {$dashboardStats.revenueChange >= 0 ? '↑' : '↓'} {Math.abs($dashboardStats.revenueChange)}%
        </span>
      </div>
      <p class="text-3xl font-bold text-white">{formatCurrency($dashboardStats.todayRevenue)}</p>
      <p class="text-sm text-gray-medium mt-1">Est. Revenue</p>
    </div>
    
    <!-- Active Proxies Card -->
    <div class="bg-black-soft rounded-xl p-6 border border-gray-dark/50 hover:border-pink-bright/50 transition-all">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <span 
          class="text-sm font-medium flex items-center gap-1"
          class:text-green-400={$dashboardStats.proxyChange >= 0}
          class:text-red-400={$dashboardStats.proxyChange < 0}
        >
          {$dashboardStats.proxyChange >= 0 ? '↑' : '↓'} {Math.abs($dashboardStats.proxyChange)}%
        </span>
      </div>
      <p class="text-3xl font-bold text-white">{$dashboardStats.activeProxies}</p>
      <p class="text-sm text-gray-medium mt-1">Active Proxies</p>
    </div>
  </div>
  
  <!-- Charts Row -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Traffic Chart -->
    <div class="bg-black-soft rounded-xl p-6 border border-gray-dark/50">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-white">Traffic Overview</h3>
        <a href="/admin/analytics" class="text-sm text-pink-bright hover:text-pink-light transition-colors">View Details →</a>
      </div>
      <div class="h-64">
        <canvas bind:this={trafficCanvas}></canvas>
      </div>
    </div>
    
    <!-- Revenue Chart -->
    <div class="bg-black-soft rounded-xl p-6 border border-gray-dark/50">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-white">Revenue by Region</h3>
        <a href="/admin/revenue" class="text-sm text-pink-bright hover:text-pink-light transition-colors">View Details →</a>
      </div>
      <div class="h-64">
        <canvas bind:this={revenueCanvas}></canvas>
      </div>
    </div>
  </div>
  
  <!-- Quick Links & Live Activity -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Quick Links -->
    <div class="bg-black-soft rounded-xl p-6 border border-gray-dark/50">
      <h3 class="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div class="space-y-3">
        <a href="/admin/translations" class="flex items-center gap-3 p-3 rounded-lg bg-black hover:bg-gray-dark/50 transition-colors group">
          <div class="w-10 h-10 bg-pink-bright/10 rounded-lg flex items-center justify-center group-hover:bg-pink-bright/20 transition-colors">
            <svg class="w-5 h-5 text-pink-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
          </div>
          <div>
            <p class="font-medium text-white">Manage Translations</p>
            <p class="text-sm text-gray-medium">8 posts need attention</p>
          </div>
        </a>
        
        <a href="/admin/clika" class="flex items-center gap-3 p-3 rounded-lg bg-black hover:bg-gray-dark/50 transition-colors group">
          <div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div>
            <p class="font-medium text-white">Clika Analytics</p>
            <p class="text-sm text-gray-medium">Health score: 87%</p>
          </div>
        </a>
        
        <a href="/" target="_blank" class="flex items-center gap-3 p-3 rounded-lg bg-black hover:bg-gray-dark/50 transition-colors group">
          <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </div>
          <div>
            <p class="font-medium text-white">View Website</p>
            <p class="text-sm text-gray-medium">Open in new tab</p>
          </div>
        </a>
      </div>
    </div>
    
    <!-- Live Activity Feed -->
    <div class="lg:col-span-2 bg-black-soft rounded-xl p-6 border border-gray-dark/50">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-white">Live Activity</h3>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm text-gray-medium">Real-time</span>
        </div>
      </div>
      
      <div class="space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-dark scrollbar-track-transparent">
        {#if $liveActivityStore.length === 0}
          <div class="text-center py-8 text-gray-medium">
            <p>Waiting for activity...</p>
          </div>
        {:else}
          {#each $liveActivityStore.slice(0, 20) as activity (activity.id)}
            <div class="flex items-center gap-4 p-3 rounded-lg bg-black/50 hover:bg-black transition-colors">
              <span class="text-xl">{getActivityIcon(activity.type)}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-white truncate">{activity.details}</p>
                <p class="text-xs text-gray-medium">{activity.country} • {new Date(activity.timestamp).toLocaleTimeString()}</p>
              </div>
              {#if activity.value}
                <span class="text-sm font-medium text-green-400">+${activity.value.toFixed(2)}</span>
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: #4a4a4a;
    border-radius: 3px;
  }
</style>
