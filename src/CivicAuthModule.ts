/**
 * CivicAuth React Native Wrapper - Main Module
 * CivicAuth React Native 包装器 - 主模块
 *
 * This file implements the main CivicAuth module for the civic-auth-rn package.
 * 此文件实现 civic-auth-rn 包的主要 CivicAuth 模块。
 *
 * Exports the CivicAuth class and loginWithCivic function for authentication.
 * 导出 CivicAuth 类和 loginWithCivic 函数用于认证。
 *
 * Related files: src/types/index.ts, src/components/index.ts
 * 相关文件：src/types/index.ts, src/components/index.ts
 */

import { NativeModules, Platform } from 'react-native';

/**
 * CivicAuth 主类
 * CivicAuth main class
 */
export default class CivicAuth {
  private nativeModule: any;

  constructor() {
    // Check if native module is available
    // 检查原生模块是否可用
    if (Platform.OS !== 'android') {
      throw new Error('CivicAuth is only supported on Android');
    }

    if (!NativeModules.CivicAuthModule) {
      throw new Error('CivicAuth native module is not available');
    }

    this.nativeModule = NativeModules.CivicAuthModule;
  }

  /**
   * 检查模块是否可用
   * Check if the module is available
   */
  isAvailable(): boolean {
    return !!this.nativeModule;
  }

  /**
   * 获取认证配置信息
   * Get authentication configuration info
   */
  getAuthInfo(): any {
    return {
      authUrl: 'https://auth.civic.com',
      documentation: 'https://docs.civic.com/',
      supportedTokens: ['idToken', 'accessToken', 'refreshToken'],
      requiredParams: ['clientId', 'redirectUrl'],
      optionalParams: ['nonce', 'displayMode', 'scope']
    };
  }

  /**
   * 使用 Civic 进行登录
   * Login with Civic
   * @param options 登录参数 login options
   */
  async loginWithCivic(options: any): Promise<any> {
    try {
      // Validate required parameters
      // 验证必需参数
      if (!options.clientId) {
        throw new Error('clientId is required');
      }
      if (!options.redirectUrl) {
        throw new Error('redirectUrl is required');
      }

      // Call native module
      // 调用原生模块
      const result = await this.nativeModule.loginWithCivic(options);
      return result;
    } catch (error) {
      // Handle errors gracefully
      // 优雅地处理错误
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

/**
 * 直接导出的登录函数
 * Directly exported login function
 */
export async function loginWithCivic(options: any): Promise<any> {
  const civicAuth = new CivicAuth();
  return await civicAuth.loginWithCivic(options);
} 