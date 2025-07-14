/**
 * CivicAuth React Native Wrapper - Main Module
 * CivicAuth React Native 包装器 - 主模块
 * 
 * This file contains the main CivicAuth module implementation
 * 此文件包含主要的 CivicAuth 模块实现
 * 
 * It provides the loginWithCivic function and handles WebView integration
 * 它提供 loginWithCivic 函数并处理 WebView 集成
 * 
 * Based on Civic Auth official documentation: https://docs.civic.com/
 * 基于 Civic Auth 官方文档：https://docs.civic.com/
 * 
 * Related files: src/types/index.ts, src/index.ts, android/
 * 相关文件：src/types/index.ts, src/index.ts, android/
 */

import { NativeModules, Platform } from 'react-native';
import { AuthResult, LoginOptions, AuthErrorType } from './types';

/**
 * CivicAuth Native Module Interface
 * CivicAuth 原生模块接口
 * 
 * This interface defines the methods available in the native Android module
 * 此接口定义了 Android 原生模块中可用的方法
 */
interface CivicAuthNativeModule {
  loginWithCivic(options?: LoginOptions): Promise<AuthResult>;
}

/**
 * Get the native module for the current platform
 * 获取当前平台的原生模块
 */
const getNativeModule = (): CivicAuthNativeModule => {
  if (Platform.OS === 'android') {
    return NativeModules.CivicAuthModule;
  } else {
    throw new Error('CivicAuth is currently only supported on Android');
  }
};

/**
 * CivicAuth Module Class
 * CivicAuth 模块类
 * 
 * This class provides the main interface for Civic authentication
 * 此类提供 Civic 认证的主要接口
 */
class CivicAuth {
  private nativeModule: CivicAuthNativeModule;

  constructor() {
    this.nativeModule = getNativeModule();
  }

  /**
   * Login with Civic authentication
   * 使用 Civic 认证登录
   * 
   * Based on Civic Auth OAuth 2.0 / OpenID Connect flow
   * 基于 Civic Auth OAuth 2.0 / OpenID Connect 流程
   * 
   * @param options - Login configuration options 登录配置选项
   * @returns Promise<AuthResult> - Authentication result 认证结果
   */
  async loginWithCivic(options?: LoginOptions): Promise<AuthResult> {
    try {
      // Validate that the native module is available
      // 验证原生模块是否可用
      if (!this.nativeModule) {
        throw new Error('CivicAuth native module not found');
      }

      // Validate required parameters based on Civic Auth documentation
      // 根据 Civic Auth 文档验证必需参数
      if (!options?.clientId) {
        throw new Error('clientId is required for Civic Auth');
      }

      if (!options?.redirectUrl) {
        throw new Error('redirectUrl is required for Civic Auth');
      }

      // Call the native module's loginWithCivic method
      // 调用原生模块的 loginWithCivic 方法
      const result = await this.nativeModule.loginWithCivic(options);
      
      return result;
    } catch (error) {
      // Handle errors and return a standardized error result
      // 处理错误并返回标准化的错误结果
      console.error('CivicAuth login error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : AuthErrorType.UNKNOWN_ERROR
      };
    }
  }

  /**
   * Check if CivicAuth is available on the current platform
   * 检查当前平台是否支持 CivicAuth
   * 
   * @returns boolean - True if available 如果可用则返回 true
   */
  isAvailable(): boolean {
    try {
      return !!getNativeModule();
    } catch {
      return false;
    }
  }

  /**
   * Get Civic Auth configuration info
   * 获取 Civic Auth 配置信息
   * 
   * Based on official Civic Auth documentation
   * 基于官方 Civic Auth 文档
   */
  getAuthInfo() {
    return {
      authUrl: 'https://auth.civic.com',
      documentation: 'https://docs.civic.com/',
      supportedTokens: ['idToken', 'accessToken', 'refreshToken'],
      requiredParams: ['clientId', 'redirectUrl'],
      optionalParams: ['nonce', 'iframeMode', 'displayMode']
    };
  }
}

/**
 * Standalone loginWithCivic function for direct usage
 * 独立的 loginWithCivic 函数供直接使用
 * 
 * @param options - Login configuration options 登录配置选项
 * @returns Promise<AuthResult> - Authentication result 认证结果
 */
export const loginWithCivic = async (options?: LoginOptions): Promise<AuthResult> => {
  const civicAuth = new CivicAuth();
  return civicAuth.loginWithCivic(options);
};

// Export the CivicAuth class as default
// 将 CivicAuth 类作为默认导出
export default CivicAuth; 