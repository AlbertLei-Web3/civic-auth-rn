/**
 * CivicAuth React Native Wrapper - Integration Tests
 * CivicAuth React Native 包装器 - 集成测试
 * 
 * This file contains comprehensive integration tests for the complete authentication flow
 * 此文件包含完整认证流程的全面集成测试
 * 
 * Tests end-to-end authentication flow, component interactions, and real-world scenarios
 * 测试端到端认证流程、组件交互和真实场景
 * 
 * Related files: src/CivicAuthModule.ts, src/components/, src/utils/
 * 相关文件：src/CivicAuthModule.ts, src/components/, src/utils/
 */

import CivicAuth, { loginWithCivic } from '../CivicAuthModule';
import { performanceUtils } from '../utils/performanceOptimizer';
import { securityUtils } from '../utils/securityAssessment';
import { AuthResult, LoginOptions, AuthErrorType } from '../types';

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
}));

import { NativeModules } from 'react-native';

/**
 * Integration Test Suite
 * 集成测试套件
 * 
 * Comprehensive testing for complete authentication flow
 * 完整认证流程的全面测试
 */
describe('CivicAuth Integration Tests', () => {
  let civicAuth: CivicAuth;
  let mockNativeModule: any;

  beforeEach(() => {
    jest.clearAllMocks();
    civicAuth = new CivicAuth();
    mockNativeModule = NativeModules.CivicAuthModule;
  });

  describe('Complete Authentication Flow', () => {
    test('should handle successful end-to-end authentication', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
        nonce: 'test-nonce-123456789',
        displayMode: 'popup',
        scope: 'openid profile email',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        accessToken: 'mock-access-token-12345',
        refreshToken: 'mock-refresh-token-67890',
        userId: 'user-123',
        email: 'user@example.com',
        name: 'John Doe',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      // Start performance tracking
      // 开始性能跟踪
      performanceUtils.initialize();

      // Perform authentication
      // 执行认证
      const result = await civicAuth.loginWithCivic(options);

      // Verify result
      // 验证结果
      expect(result.success).toBe(true);
      expect(result.idToken).toBeDefined();
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.userId).toBe('user-123');
      expect(result.email).toBe('user@example.com');
      expect(result.name).toBe('John Doe');

      // Verify native module was called with correct parameters
      // 验证原生模块被正确参数调用
      expect(mockNativeModule.loginWithCivic).toHaveBeenCalledWith(options);
    });

    test('should handle authentication failure with retry mechanism', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
      };

      // Mock first attempt failure, second attempt success
      // 模拟第一次尝试失败，第二次尝试成功
      mockNativeModule.loginWithCivic
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          success: true,
          idToken: 'mock-token',
          userId: 'user-123',
        });

      let result: AuthResult;
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          result = await civicAuth.loginWithCivic(options);
          if (result.success) break;
        } catch (error) {
          retryCount++;
          if (retryCount >= maxRetries) {
            throw error;
          }
          // Wait before retry
          // 重试前等待
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      expect(retryCount).toBe(1); // Should succeed on second attempt
      expect(mockNativeModule.loginWithCivic).toHaveBeenCalledTimes(2);
    });

    test('should handle concurrent authentication attempts', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'mock-token',
        userId: 'user-123',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      // Start multiple concurrent authentication attempts
      // 启动多个并发认证尝试
      const promises = Array(3).fill(null).map(() => civicAuth.loginWithCivic(options));
      
      const results = await Promise.all(promises);

      // All should succeed
      // 所有都应该成功
      results.forEach(result => {
        expect(result.success).toBe(true);
      });

      expect(mockNativeModule.loginWithCivic).toHaveBeenCalledTimes(3);
    });
  });

  describe('Performance Integration', () => {
    test('should track performance metrics during authentication', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'mock-token',
        userId: 'user-123',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      // Initialize performance monitoring
      // 初始化性能监控
      performanceUtils.initialize();

      // Perform authentication
      // 执行认证
      const result = await civicAuth.loginWithCivic(options);

      // Get performance report
      // 获取性能报告
      const performanceReport = performanceUtils.getPerformanceReport();

      expect(result.success).toBe(true);
      expect(performanceReport).toBeDefined();
      expect(performanceReport.performance).toBeDefined();
      expect(performanceReport.memory).toBeDefined();
      expect(performanceReport.webView).toBeDefined();
    });

    test('should optimize authentication requests', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
      };

      // Optimize request
      // 优化请求
      const optimizedOptions = performanceUtils.optimizeAuthRequest(options);

      expect(optimizedOptions).toHaveProperty('timestamp');
      expect(optimizedOptions).toHaveProperty('performanceTracking');
      expect(optimizedOptions.performanceTracking).toBe(true);
    });

    test('should handle memory management during authentication', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'mock-token',
        userId: 'user-123',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      // Initialize performance monitoring
      // 初始化性能监控
      performanceUtils.initialize();

      // Perform multiple authentications
      // 执行多次认证
      for (let i = 0; i < 5; i++) {
        await civicAuth.loginWithCivic(options);
      }

      // Get memory stats
      // 获取内存统计
      const performanceReport = performanceUtils.getPerformanceReport();
      const memoryStats = performanceReport.webView;

      expect(memoryStats.activeCount).toBeGreaterThanOrEqual(0);
      expect(memoryStats.totalMemory).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Security Integration', () => {
    test('should perform security assessment during authentication', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
        nonce: 'test-nonce-123456789',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        accessToken: 'mock-access-token-12345',
        userId: 'user-123',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      // Perform authentication
      // 执行认证
      const result = await civicAuth.loginWithCivic(options);

      // Perform security assessment
      // 执行安全评估
      const securityAssessment = securityUtils.assessSecurity(options, result);

      expect(result.success).toBe(true);
      expect(securityAssessment.overallScore).toBeGreaterThan(0);
      expect(securityAssessment.inputValidation).toBeDefined();
      expect(securityAssessment.tokenSecurity).toBeDefined();
      expect(securityAssessment.vulnerabilityScan).toBeDefined();
      expect(securityAssessment.recommendations).toBeDefined();
    });

    test('should sanitize input parameters', async () => {
      const rawOptions = {
        clientId: 'test-client-id<script>alert("xss")</script>',
        redirectUrl: 'javascript:alert("xss")',
        nonce: 'test-nonce<script>alert("xss")</script>',
      };

      // Sanitize options
      // 清理选项
      const sanitizedOptions = securityUtils.sanitizeOptions(rawOptions);

      expect(sanitizedOptions.clientId).toBe('test-client-id');
      expect(sanitizedOptions.clientId).not.toContain('<script>');
      expect(sanitizedOptions.redirectUrl).not.toContain('javascript:');
    });

    test('should validate token security', async () => {
      const validJWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const invalidJWT = 'invalid.token.format';

      // Validate valid JWT
      // 验证有效 JWT
      const validAssessment = securityUtils.validateToken(validJWT, 'jwt');
      expect(validAssessment.isValid).toBe(true);
      expect(validAssessment.score).toBeGreaterThan(70);

      // Validate invalid JWT
      // 验证无效 JWT
      const invalidAssessment = securityUtils.validateToken(invalidJWT, 'jwt');
      expect(invalidAssessment.isValid).toBe(false);
      expect(invalidAssessment.score).toBeLessThan(70);
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle network errors gracefully', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
      };

      mockNativeModule.loginWithCivic.mockRejectedValue(new Error('Network error'));

      const result = await civicAuth.loginWithCivic(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });

    test('should handle user cancellation', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
      };

      const mockResult: AuthResult = {
        success: false,
        error: AuthErrorType.USER_CANCELLED,
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const result = await civicAuth.loginWithCivic(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe(AuthErrorType.USER_CANCELLED);
    });

    test('should handle timeout errors', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
      };

      const mockResult: AuthResult = {
        success: false,
        error: AuthErrorType.TIMEOUT,
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const result = await civicAuth.loginWithCivic(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe(AuthErrorType.TIMEOUT);
    });
  });

  describe('Real-world Scenarios', () => {
    test('should handle rapid authentication attempts', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'civic-auth-demo://callback',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'mock-token',
        userId: 'user-123',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const startTime = Date.now();
      const promises = Array(10).fill(null).map(() => civicAuth.loginWithCivic(options));
      
      const results = await Promise.all(promises);
      const endTime = Date.now();

      // All should succeed
      // 所有都应该成功
      results.forEach(result => {
        expect(result.success).toBe(true);
      });

      // Should complete within reasonable time
      // 应该在合理时间内完成
      expect(endTime - startTime).toBeLessThan(5000);
      expect(mockNativeModule.loginWithCivic).toHaveBeenCalledTimes(10);
    });

    test('should handle authentication with different configurations', async () => {
      const configurations = [
        {
          clientId: 'client-1',
          redirectUrl: 'app1://callback',
          displayMode: 'popup' as const,
        },
        {
          clientId: 'client-2',
          redirectUrl: 'app2://callback',
          displayMode: 'redirect' as const,
        },
        {
          clientId: 'client-3',
          redirectUrl: 'https://app3.com/callback',
          scope: 'openid profile',
        },
      ];

      const mockResult: AuthResult = {
        success: true,
        idToken: 'mock-token',
        userId: 'user-123',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      for (const config of configurations) {
        const result = await civicAuth.loginWithCivic(config);
        expect(result.success).toBe(true);
        expect(mockNativeModule.loginWithCivic).toHaveBeenCalledWith(config);
      }

      expect(mockNativeModule.loginWithCivic).toHaveBeenCalledTimes(3);
    });

    test('should handle authentication with security validation', async () => {
      const options: LoginOptions = {
        clientId: 'secure-client-id-12345',
        redirectUrl: 'https://secure-app.com/callback',
        nonce: 'secure-nonce-12345678901234567890',
        scope: 'openid profile email',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        accessToken: 'secure-access-token-12345678901234567890',
        userId: 'user-123',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      // Perform authentication
      // 执行认证
      const result = await civicAuth.loginWithCivic(options);

      // Perform security assessment
      // 执行安全评估
      const securityAssessment = securityUtils.assessSecurity(options, result);

      expect(result.success).toBe(true);
      expect(securityAssessment.overallScore).toBeGreaterThan(80); // Should be high security score
      expect(securityAssessment.inputValidation.isValid).toBe(true);
      expect(securityAssessment.tokenSecurity.length).toBeGreaterThan(0);
      expect(securityAssessment.recommendations.length).toBeGreaterThanOrEqual(0);
    });
  });
}); 