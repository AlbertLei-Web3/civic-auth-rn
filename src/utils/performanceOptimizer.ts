/**
 * CivicAuth React Native Wrapper - Performance Optimization Utilities
 * CivicAuth React Native 包装器 - 性能优化工具
 * 
 * This file contains performance optimization utilities for the CivicAuth module
 * 此文件包含 CivicAuth 模块的性能优化工具
 * 
 * Provides WebView memory management, authentication flow optimization, and performance monitoring
 * 提供 WebView 内存管理、认证流程优化和性能监控
 * 
 * Related files: src/CivicAuthModule.ts, android/src/main/java/com/civicauth/CivicAuthModule.kt
 * 相关文件：src/CivicAuthModule.ts, android/src/main/java/com/civicauth/CivicAuthModule.kt
 */

/**
 * Performance Metrics Interface
 * 性能指标接口
 * 
 * Defines the structure for performance monitoring
 * 定义性能监控的结构
 */
export interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  memoryUsage?: number;
  success: boolean;
  error?: string;
}

/**
 * WebView Memory Management
 * WebView 内存管理
 * 
 * Utilities for managing WebView memory usage and preventing leaks
 * 用于管理 WebView 内存使用和防止泄漏的工具
 */
export class WebViewMemoryManager {
  private static instance: WebViewMemoryManager;
  private activeWebViews: Set<any> = new Set();
  private memoryThreshold: number = 50 * 1024 * 1024; // 50MB

  private constructor() {}

  /**
   * Get singleton instance
   * 获取单例实例
   */
  static getInstance(): WebViewMemoryManager {
    if (!WebViewMemoryManager.instance) {
      WebViewMemoryManager.instance = new WebViewMemoryManager();
    }
    return WebViewMemoryManager.instance;
  }

  /**
   * Register a WebView for memory management
   * 注册 WebView 进行内存管理
   * 
   * @param webView - The WebView instance WebView 实例
   */
  registerWebView(webView: any): void {
    this.activeWebViews.add(webView);
    this.checkMemoryUsage();
  }

  /**
   * Unregister a WebView and clean up resources
   * 注销 WebView 并清理资源
   * 
   * @param webView - The WebView instance WebView 实例
   */
  unregisterWebView(webView: any): void {
    if (this.activeWebViews.has(webView)) {
      this.activeWebViews.delete(webView);
      this.cleanupWebView(webView);
    }
  }

  /**
   * Clean up WebView resources
   * 清理 WebView 资源
   * 
   * @param webView - The WebView instance WebView 实例
   */
  private cleanupWebView(webView: any): void {
    try {
      if (webView && typeof webView.destroy === 'function') {
        webView.destroy();
      }
    } catch (error) {
      console.warn('Error cleaning up WebView:', error);
    }
  }

  /**
   * Check memory usage and cleanup if necessary
   * 检查内存使用情况，必要时清理
   */
  checkMemoryUsage(): void {
    if (this.activeWebViews.size > 3) {
      console.warn('Too many active WebViews, cleaning up...');
      this.forceCleanup();
    }
  }

  /**
   * Force cleanup of all WebViews
   * 强制清理所有 WebView
   */
  forceCleanup(): void {
    this.activeWebViews.forEach(webView => {
      this.cleanupWebView(webView);
    });
    this.activeWebViews.clear();
  }

  /**
   * Get current memory usage statistics
   * 获取当前内存使用统计
   */
  getMemoryStats(): { activeCount: number; totalMemory: number } {
    return {
      activeCount: this.activeWebViews.size,
      totalMemory: this.activeWebViews.size * 10 * 1024 * 1024, // Estimate 10MB per WebView
    };
  }
}

/**
 * Authentication Flow Optimizer
 * 认证流程优化器
 * 
 * Optimizes authentication flow performance and reduces latency
 * 优化认证流程性能并减少延迟
 */
export class AuthFlowOptimizer {
  private static instance: AuthFlowOptimizer;
  private requestCache: Map<string, any> = new Map();
  private cacheTimeout: number = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  /**
   * Get singleton instance
   * 获取单例实例
   */
  static getInstance(): AuthFlowOptimizer {
    if (!AuthFlowOptimizer.instance) {
      AuthFlowOptimizer.instance = new AuthFlowOptimizer();
    }
    return AuthFlowOptimizer.instance;
  }

  /**
   * Optimize authentication request
   * 优化认证请求
   * 
   * @param options - Authentication options 认证选项
   * @returns Optimized options 优化的选项
   */
  optimizeRequest(options: any): any {
    // Add performance tracking
    // 添加性能跟踪
    const optimizedOptions = {
      ...options,
      timestamp: Date.now(),
      performanceTracking: true,
    };

    // Cache request for potential retry optimization
    // 缓存请求以进行潜在的重试优化
    const cacheKey = this.generateCacheKey(options);
    this.requestCache.set(cacheKey, {
      options: optimizedOptions,
      timestamp: Date.now(),
    });

    return optimizedOptions;
  }

  /**
   * Generate cache key for request
   * 为请求生成缓存键
   * 
   * @param options - Request options 请求选项
   * @returns Cache key 缓存键
   */
  private generateCacheKey(options: any): string {
    return `${options.clientId}-${options.redirectUrl}-${options.nonce || 'default'}`;
  }

  /**
   * Get cached request if available
   * 如果可用则获取缓存的请求
   * 
   * @param options - Request options 请求选项
   * @returns Cached request or null 缓存的请求或 null
   */
  getCachedRequest(options: any): any | null {
    const cacheKey = this.generateCacheKey(options);
    const cached = this.requestCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.options;
    }

    return null;
  }

  /**
   * Clear expired cache entries
   * 清除过期的缓存条目
   */
  clearExpiredCache(): void {
    const now = Date.now();
    for (const [key, value] of this.requestCache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.requestCache.delete(key);
      }
    }
  }

  /**
   * Optimize retry logic
   * 优化重试逻辑
   * 
   * @param retryCount - Current retry count 当前重试次数
   * @returns Optimized retry delay 优化的重试延迟
   */
  optimizeRetryDelay(retryCount: number): number {
    // Exponential backoff with jitter
    // 带抖动的指数退避
    const baseDelay = 1000; // 1 second
    const maxDelay = 30000; // 30 seconds
    const jitter = Math.random() * 0.1; // 10% jitter

    const delay = Math.min(
      baseDelay * Math.pow(2, retryCount) * (1 + jitter),
      maxDelay
    );

    return delay;
  }
}

/**
 * Performance Monitor
 * 性能监控器
 * 
 * Monitors and tracks performance metrics
 * 监控和跟踪性能指标
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private maxMetrics: number = 100;

  private constructor() {}

  /**
   * Get singleton instance
   * 获取单例实例
   */
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start performance tracking
   * 开始性能跟踪
   * 
   * @param operation - Operation name 操作名称
   * @returns Tracking ID 跟踪 ID
   */
  startTracking(operation: string): string {
    const trackingId = `${operation}-${Date.now()}-${Math.random()}`;
    
    this.metrics.push({
      startTime: Date.now(),
      endTime: 0,
      duration: 0,
      success: false,
    });

    return trackingId;
  }

  /**
   * End performance tracking
   * 结束性能跟踪
   * 
   * @param trackingId - Tracking ID 跟踪 ID
   * @param success - Whether operation was successful 操作是否成功
   * @param error - Error message if any 错误消息（如果有）
   */
  endTracking(trackingId: string, success: boolean, error?: string): void {
    const metric = this.metrics[this.metrics.length - 1];
    if (metric) {
      metric.endTime = Date.now();
      metric.duration = metric.endTime - metric.startTime;
      metric.success = success;
      if (error) {
        metric.error = error;
      }
    }

    // Keep only recent metrics
    // 只保留最近的指标
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  /**
   * Get performance statistics
   * 获取性能统计
   * 
   * @returns Performance statistics 性能统计
   */
  getStatistics(): {
    totalOperations: number;
    averageDuration: number;
    successRate: number;
    recentMetrics: PerformanceMetrics[];
  } {
    const successful = this.metrics.filter(m => m.success);
    const totalDuration = this.metrics.reduce((sum, m) => sum + m.duration, 0);

    return {
      totalOperations: this.metrics.length,
      averageDuration: this.metrics.length > 0 ? totalDuration / this.metrics.length : 0,
      successRate: this.metrics.length > 0 ? successful.length / this.metrics.length : 0,
      recentMetrics: this.metrics.slice(-10),
    };
  }

  /**
   * Clear all metrics
   * 清除所有指标
   */
  clearMetrics(): void {
    this.metrics = [];
  }
}

/**
 * Memory Usage Monitor
 * 内存使用监控器
 * 
 * Monitors memory usage and provides optimization recommendations
 * 监控内存使用并提供优化建议
 */
export class MemoryUsageMonitor {
  private static instance: MemoryUsageMonitor;
  private memorySnapshots: Array<{ timestamp: number; usage: number }> = [];

  private constructor() {}

  /**
   * Get singleton instance
   * 获取单例实例
   */
  static getInstance(): MemoryUsageMonitor {
    if (!MemoryUsageMonitor.instance) {
      MemoryUsageMonitor.instance = new MemoryUsageMonitor();
    }
    return MemoryUsageMonitor.instance;
  }

  /**
   * Take memory snapshot
   * 获取内存快照
   * 
   * @returns Memory usage in bytes 内存使用量（字节）
   */
  takeSnapshot(): number {
    // In a real implementation, this would use platform-specific APIs
    // 在实际实现中，这将使用平台特定的 API
    const usage = Math.random() * 100 * 1024 * 1024; // Simulated usage
    this.memorySnapshots.push({
      timestamp: Date.now(),
      usage,
    });

    // Keep only recent snapshots
    // 只保留最近的快照
    if (this.memorySnapshots.length > 50) {
      this.memorySnapshots = this.memorySnapshots.slice(-50);
    }

    return usage;
  }

  /**
   * Get memory usage trend
   * 获取内存使用趋势
   * 
   * @returns Memory trend analysis 内存趋势分析
   */
  getMemoryTrend(): {
    currentUsage: number;
    averageUsage: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    recommendation: string;
  } {
    if (this.memorySnapshots.length < 2) {
      return {
        currentUsage: 0,
        averageUsage: 0,
        trend: 'stable',
        recommendation: 'Insufficient data for analysis',
      };
    }

    const current = this.memorySnapshots[this.memorySnapshots.length - 1];
    const previous = this.memorySnapshots[this.memorySnapshots.length - 2];
    const average = this.memorySnapshots.reduce((sum, s) => sum + s.usage, 0) / this.memorySnapshots.length;

    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (current.usage > previous.usage * 1.1) {
      trend = 'increasing';
    } else if (current.usage < previous.usage * 0.9) {
      trend = 'decreasing';
    }

    let recommendation = 'Memory usage is normal';
    if (trend === 'increasing') {
      recommendation = 'Consider cleaning up WebView resources';
    } else if (current.usage > 100 * 1024 * 1024) { // 100MB
      recommendation = 'High memory usage detected';
    }

    return {
      currentUsage: current.usage,
      averageUsage: average,
      trend,
      recommendation,
    };
  }
}

/**
 * Performance optimization utilities
 * 性能优化工具
 */
export const performanceUtils = {
  /**
   * Initialize performance monitoring
   * 初始化性能监控
   */
  initialize(): void {
    // Set up periodic cleanup
    // 设置定期清理
    setInterval(() => {
      WebViewMemoryManager.getInstance().checkMemoryUsage();
      AuthFlowOptimizer.getInstance().clearExpiredCache();
    }, 60000); // Every minute

    // Set up memory monitoring
    // 设置内存监控
    setInterval(() => {
      MemoryUsageMonitor.getInstance().takeSnapshot();
    }, 30000); // Every 30 seconds
  },

  /**
   * Get comprehensive performance report
   * 获取综合性能报告
   */
  getPerformanceReport(): {
    memory: ReturnType<typeof MemoryUsageMonitor.prototype.getMemoryTrend>;
    performance: ReturnType<typeof PerformanceMonitor.prototype.getStatistics>;
    webView: ReturnType<typeof WebViewMemoryManager.prototype.getMemoryStats>;
  } {
    return {
      memory: MemoryUsageMonitor.getInstance().getMemoryTrend(),
      performance: PerformanceMonitor.getInstance().getStatistics(),
      webView: WebViewMemoryManager.getInstance().getMemoryStats(),
    };
  },

  /**
   * Optimize authentication request
   * 优化认证请求
   */
  optimizeAuthRequest(options: any): any {
    return AuthFlowOptimizer.getInstance().optimizeRequest(options);
  },

  /**
   * Get optimized retry delay
   * 获取优化的重试延迟
   */
  getOptimizedRetryDelay(retryCount: number): number {
    return AuthFlowOptimizer.getInstance().optimizeRetryDelay(retryCount);
  },
}; 