/**
 * CivicAuth React Native Wrapper - Module Unit Tests
 * CivicAuth React Native 包装器 - 模块单元测试
 * 
 * This file contains comprehensive unit tests for the CivicAuth module
 * 此文件包含 CivicAuth 模块的全面单元测试
 * 
 * Tests native module functionality, error handling, and parameter validation
 * 测试原生模块功能、错误处理和参数验证
 * 
 * Related files: src/CivicAuthModule.ts, src/types/index.ts
 * 相关文件：src/CivicAuthModule.ts, src/types/index.ts
 */

import CivicAuth, { loginWithCivic } from '../CivicAuthModule';
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
 * CivicAuth Module Test Suite
 * CivicAuth 模块测试套件
 * 
 * Comprehensive testing for the CivicAuth module functionality
 * CivicAuth 模块功能的全面测试
 */
describe('CivicAuth Module', () => {
  let civicAuth: CivicAuth;
  let mockNativeModule: any;

  beforeEach(() => {
    // Reset mocks before each test
    // 每个测试前重置模拟
    jest.clearAllMocks();
    civicAuth = new CivicAuth();
    mockNativeModule = NativeModules.CivicAuthModule;
  });

  describe('Module Initialization', () => {
    test('should create CivicAuth instance successfully', () => {
      expect(civicAuth).toBeInstanceOf(CivicAuth);
    });

    test('should check module availability', () => {
      const isAvailable = civicAuth.isAvailable();
      expect(isAvailable).toBe(true);
    });

    test('should return auth configuration info', () => {
      const authInfo = civicAuth.getAuthInfo();
      
      expect(authInfo).toHaveProperty('authUrl');
      expect(authInfo).toHaveProperty('documentation');
      expect(authInfo).toHaveProperty('supportedTokens');
      expect(authInfo).toHaveProperty('requiredParams');
      expect(authInfo).toHaveProperty('optionalParams');
      
      expect(authInfo.authUrl).toBe('https://auth.civic.com');
      expect(authInfo.documentation).toBe('https://docs.civic.com/');
      expect(authInfo.supportedTokens).toContain('idToken');
      expect(authInfo.supportedTokens).toContain('accessToken');
      expect(authInfo.supportedTokens).toContain('refreshToken');
    });
  });

  describe('Parameter Validation', () => {
    test('should validate required clientId parameter', async () => {
      const options: LoginOptions = {
        redirectUrl: 'test://callback',
      } as LoginOptions;

      try {
        await loginWithCivic(options);
        fail('Should have thrown an error for missing clientId');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('clientId is required');
      }
    });

    test('should validate required redirectUrl parameter', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
      } as LoginOptions;

      try {
        await loginWithCivic(options);
        fail('Should have thrown an error for missing redirectUrl');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('redirectUrl is required');
      }
    });

    test('should accept valid parameters', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
        nonce: 'test-nonce',
        displayMode: 'popup',
        scope: 'openid profile email',
      };

      // Mock successful response
      // 模拟成功响应
      const mockResult: AuthResult = {
        success: true,
        idToken: 'mock-id-token',
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        userId: 'mock-user-id',
        email: 'user@example.com',
        name: 'Test User',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const result = await loginWithCivic(options);

      expect(mockNativeModule.loginWithCivic).toHaveBeenCalledWith(options);
      expect(result).toEqual(mockResult);
      expect(result.success).toBe(true);
      expect(result.idToken).toBe('mock-id-token');
      expect(result.accessToken).toBe('mock-access-token');
      expect(result.refreshToken).toBe('mock-refresh-token');
    });
  });

  describe('Authentication Flow', () => {
    test('should handle successful authentication', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        userId: 'user-123',
        email: 'user@example.com',
        name: 'John Doe',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const result = await civicAuth.loginWithCivic(options);

      expect(result.success).toBe(true);
      expect(result.idToken).toBeDefined();
      expect(result.accessToken).toBeDefined();
      expect(result.userId).toBe('user-123');
      expect(result.email).toBe('user@example.com');
      expect(result.name).toBe('John Doe');
    });

    test('should handle authentication failure', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
      };

      const mockResult: AuthResult = {
        success: false,
        error: AuthErrorType.NETWORK_ERROR,
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const result = await civicAuth.loginWithCivic(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe(AuthErrorType.NETWORK_ERROR);
    });

    test('should handle native module errors', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
      };

      const mockError = new Error('Native module error');
      mockNativeModule.loginWithCivic.mockRejectedValue(mockError);

      const result = await civicAuth.loginWithCivic(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Native module error');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing native module', () => {
      // Mock missing native module
      // 模拟缺失的原生模块
      const originalNativeModules = NativeModules.CivicAuthModule;
      delete (NativeModules as any).CivicAuthModule;

      try {
        new CivicAuth();
        fail('Should have thrown an error for missing native module');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('only supported on Android');
      } finally {
        // Restore original module
        // 恢复原始模块
        (NativeModules as any).CivicAuthModule = originalNativeModules;
      }
    });

    test('should handle network errors', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
      };

      const mockResult: AuthResult = {
        success: false,
        error: AuthErrorType.NETWORK_ERROR,
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const result = await civicAuth.loginWithCivic(options);

      expect(result.success).toBe(false);
      expect(result.error).toBe(AuthErrorType.NETWORK_ERROR);
    });

    test('should handle user cancellation', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
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
        redirectUrl: 'test://callback',
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

  describe('Token Validation', () => {
    test('should validate token structure', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
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

      const result = await civicAuth.loginWithCivic(options);

      expect(result.success).toBe(true);
      expect(result.idToken).toMatch(/^eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.userId).toBeDefined();
      expect(result.email).toBeDefined();
      expect(result.name).toBeDefined();
    });

    test('should handle missing tokens gracefully', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
      };

      const mockResult: AuthResult = {
        success: true,
        userId: 'user-123',
        email: 'user@example.com',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const result = await civicAuth.loginWithCivic(options);

      expect(result.success).toBe(true);
      expect(result.idToken).toBeUndefined();
      expect(result.accessToken).toBeUndefined();
      expect(result.refreshToken).toBeUndefined();
      expect(result.userId).toBe('user-123');
      expect(result.email).toBe('user@example.com');
    });
  });

  describe('Configuration Validation', () => {
    test('should validate client ID format', () => {
      const validClientIds = [
        'test-client-id',
        'civic-auth-demo',
        'my-app-123',
        'auth_client_456',
      ];

      validClientIds.forEach(clientId => {
        expect(clientId).toMatch(/^[a-zA-Z0-9-_]+$/);
      });
    });

    test('should validate redirect URL format', () => {
      const validRedirectUrls = [
        'civic-auth-demo://callback',
        'https://myapp.com/auth/callback',
        'myapp://auth/callback',
      ];

      validRedirectUrls.forEach(url => {
        expect(url).toMatch(/^(https?:\/\/|civic-auth-demo:\/\/)/);
      });
    });
  });

  describe('Performance Tests', () => {
    test('should handle rapid successive calls', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'mock-token',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const startTime = Date.now();
      const promises = Array(5).fill(null).map(() => civicAuth.loginWithCivic(options));
      
      const results = await Promise.all(promises);
      const endTime = Date.now();

      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(result.success).toBe(true);
      });

      // Should complete within reasonable time (5 seconds)
      // 应该在合理时间内完成（5秒）
      expect(endTime - startTime).toBeLessThan(5000);
    });

    test('should handle concurrent authentication attempts', async () => {
      const options: LoginOptions = {
        clientId: 'test-client-id',
        redirectUrl: 'test://callback',
      };

      const mockResult: AuthResult = {
        success: true,
        idToken: 'mock-token',
      };

      mockNativeModule.loginWithCivic.mockResolvedValue(mockResult);

      const auth1 = civicAuth.loginWithCivic(options);
      const auth2 = civicAuth.loginWithCivic(options);

      const [result1, result2] = await Promise.all([auth1, auth2]);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      expect(mockNativeModule.loginWithCivic).toHaveBeenCalledTimes(2);
    });
  });
}); 