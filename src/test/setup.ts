/**
 * Test Setup for CivicAuth React Native Wrapper
 * CivicAuth React Native 包装器的测试设置
 * 
 * This file configures global test setup and mocks
 * 此文件配置全局测试设置和模拟
 * 
 * Includes React Native mocks, performance monitoring, and security utilities
 * 包含 React Native 模拟、性能监控和安全工具
 */

import '@testing-library/jest-native/extend-expect';

// Mock React Native modules
// 模拟 React Native 模块
jest.mock('react-native', () => ({
  NativeModules: {
    CivicAuthModule: {
      loginWithCivic: jest.fn(),
    },
  },
  Platform: {
    OS: 'android',
  },
  Alert: {
    alert: jest.fn(),
  },
  Linking: {
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
  },
  Clipboard: {
    setString: jest.fn(),
    getString: jest.fn(),
  },
}));

// Mock performance utilities
// 模拟性能工具
jest.mock('../utils/performanceOptimizer', () => ({
  performanceUtils: {
    initialize: jest.fn(),
    getPerformanceReport: jest.fn(() => ({
      memory: {
        currentUsage: 50 * 1024 * 1024,
        averageUsage: 45 * 1024 * 1024,
        trend: 'stable',
        recommendation: 'Memory usage is normal',
      },
      performance: {
        totalOperations: 10,
        averageDuration: 1500,
        successRate: 0.9,
        recentMetrics: [],
      },
      webView: {
        activeCount: 2,
        totalMemory: 20 * 1024 * 1024,
      },
    })),
    optimizeAuthRequest: jest.fn((options) => ({
      ...options,
      timestamp: Date.now(),
      performanceTracking: true,
    })),
    getOptimizedRetryDelay: jest.fn((retryCount) => 1000 * Math.pow(2, retryCount)),
  },
}));

// Mock security utilities
// 模拟安全工具
jest.mock('../utils/securityAssessment', () => ({
  securityUtils: {
    assessSecurity: jest.fn((options, tokens) => ({
      inputValidation: {
        isValid: true,
        score: 85,
        vulnerabilities: [],
        recommendations: [],
        riskLevel: 'low',
      },
      tokenSecurity: tokens ? [
        {
          isValid: true,
          score: 90,
          vulnerabilities: [],
          recommendations: [],
          riskLevel: 'low',
        },
      ] : [],
      vulnerabilityScan: {
        isValid: true,
        score: 80,
        vulnerabilities: [],
        recommendations: [],
        riskLevel: 'low',
      },
      overallScore: 85,
      recommendations: [],
    })),
    sanitizeOptions: jest.fn((options) => ({
      clientId: options.clientId?.replace(/[^a-zA-Z0-9-_]/g, ''),
      redirectUrl: options.redirectUrl,
      nonce: options.nonce?.replace(/[^a-zA-Z0-9-_]/g, ''),
    })),
    validateToken: jest.fn((token, type) => ({
      isValid: token.length > 20,
      score: token.length > 20 ? 85 : 30,
      vulnerabilities: token.length <= 20 ? ['Token too short'] : [],
      recommendations: token.length <= 20 ? ['Use longer tokens'] : [],
      riskLevel: token.length > 20 ? 'low' : 'high',
    })),
  },
}));

// Global test configuration
// 全局测试配置
beforeEach(() => {
  // Clear all mocks before each test
  // 每个测试前清除所有模拟
  jest.clearAllMocks();
  
  // Reset console methods to prevent noise
  // 重置控制台方法以防止噪音
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  // Restore console methods
  // 恢复控制台方法
  jest.restoreAllMocks();
});

// Global test utilities
// 全局测试工具
global.testUtils = {
  /**
   * Create mock authentication result
   * 创建模拟认证结果
   */
  createMockAuthResult: (success = true, overrides = {}) => ({
    success,
    idToken: success ? 'mock-id-token' : undefined,
    accessToken: success ? 'mock-access-token' : undefined,
    refreshToken: success ? 'mock-refresh-token' : undefined,
    userId: success ? 'user-123' : undefined,
    email: success ? 'user@example.com' : undefined,
    name: success ? 'John Doe' : undefined,
    error: !success ? 'mock-error' : undefined,
    ...overrides,
  }),

  /**
   * Create mock login options
   * 创建模拟登录选项
   */
  createMockLoginOptions: (overrides = {}) => ({
    clientId: 'test-client-id',
    redirectUrl: 'civic-auth-demo://callback',
    nonce: 'test-nonce-123456789',
    displayMode: 'popup',
    scope: 'openid profile email',
    ...overrides,
  }),

  /**
   * Wait for async operations
   * 等待异步操作
   */
  waitForAsync: (ms = 100) => new Promise(resolve => setTimeout(resolve, ms)),

  /**
   * Mock native module response
   * 模拟原生模块响应
   */
  mockNativeResponse: (result) => {
    const { NativeModules } = require('react-native');
    NativeModules.CivicAuthModule.loginWithCivic.mockResolvedValue(result);
  },

  /**
   * Mock native module error
   * 模拟原生模块错误
   */
  mockNativeError: (error) => {
    const { NativeModules } = require('react-native');
    NativeModules.CivicAuthModule.loginWithCivic.mockRejectedValue(error);
  },
};

// Extend Jest matchers
// 扩展 Jest 匹配器
expect.extend({
  /**
   * Custom matcher for authentication results
   * 认证结果的自定义匹配器
   */
  toBeValidAuthResult(received) {
    const pass = received && 
                 typeof received === 'object' && 
                 typeof received.success === 'boolean';
    
    if (pass) {
      return {
        message: () => `Expected ${received} not to be a valid auth result`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be a valid auth result`,
        pass: false,
      };
    }
  },

  /**
   * Custom matcher for security assessment
   * 安全评估的自定义匹配器
   */
  toBeValidSecurityAssessment(received) {
    const pass = received && 
                 typeof received === 'object' && 
                 typeof received.overallScore === 'number' &&
                 Array.isArray(received.recommendations);
    
    if (pass) {
      return {
        message: () => `Expected ${received} not to be a valid security assessment`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be a valid security assessment`,
        pass: false,
      };
    }
  },
});

// Declare global types
// 声明全局类型
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidAuthResult(): R;
      toBeValidSecurityAssessment(): R;
    }
  }

  var testUtils: {
    createMockAuthResult: (success?: boolean, overrides?: any) => any;
    createMockLoginOptions: (overrides?: any) => any;
    waitForAsync: (ms?: number) => Promise<void>;
    mockNativeResponse: (result: any) => void;
    mockNativeError: (error: any) => void;
  };
} 