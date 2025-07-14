/**
 * CivicAuth React Native Wrapper - Type Definitions
 * CivicAuth React Native 包装器 - 类型定义
 * 
 * This file contains all TypeScript interfaces and types for the civic-auth-rn package
 * 此文件包含 civic-auth-rn 包的所有 TypeScript 接口和类型
 * 
 * Related files: src/CivicAuthModule.ts, src/index.ts
 * 相关文件：src/CivicAuthModule.ts, src/index.ts
 */

/**
 * Authentication result interface
 * 认证结果接口
 */
export interface AuthResult {
  success: boolean;
  token?: string;
  error?: string;
  userId?: string;
  email?: string;
}

/**
 * Login options interface
 * 登录选项接口
 */
export interface LoginOptions {
  redirectUrl?: string;
  clientId?: string;
  scope?: string;
}

/**
 * CivicAuth module interface
 * CivicAuth 模块接口
 */
export interface CivicAuthModule {
  loginWithCivic(options?: LoginOptions): Promise<AuthResult>;
}

/**
 * WebView configuration interface
 * WebView 配置接口
 */
export interface WebViewConfig {
  uri: string;
  onNavigationStateChange: (navState: any) => void;
  onError: (error: any) => void;
  onLoadEnd: () => void;
}

/**
 * Error types for authentication
 * 认证错误类型
 */
export enum AuthErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  USER_CANCELLED = 'USER_CANCELLED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * Authentication state enum
 * 认证状态枚举
 */
export enum AuthState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
} 