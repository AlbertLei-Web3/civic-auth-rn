/**
 * CivicAuth React Native Wrapper - Type Definitions
 * CivicAuth React Native 包装器 - 类型定义
 *
 * This file defines types and interfaces for the civic-auth-rn package.
 * 此文件为 civic-auth-rn 包定义类型和接口。
 *
 * Related files: src/CivicAuthModule.ts, src/components/index.ts
 * 相关文件：src/CivicAuthModule.ts, src/components/index.ts
 */

/**
 * 登录参数类型
 * Login options type
 */
export interface LoginOptions {
  clientId: string;
  redirectUrl: string;
  nonce?: string;
  displayMode?: 'popup' | 'redirect';
  scope?: string;
}

/**
 * 认证结果类型
 * Authentication result type
 */
export interface AuthResult {
  success: boolean;
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
  email?: string;
  name?: string;
  error?: string;
}

/**
 * CivicAuth module interface
 * CivicAuth 模块接口
 */
export interface CivicAuthModule {
  loginWithCivic(options: LoginOptions): Promise<AuthResult>;
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
 * Civic Auth configuration info
 * Civic Auth 配置信息
 */
export interface CivicAuthInfo {
  authUrl: string;
  documentation: string;
  supportedTokens: string[];
  requiredParams: string[];
  optionalParams: string[];
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
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  MISSING_CLIENT_ID = 'MISSING_CLIENT_ID',
  MISSING_REDIRECT_URL = 'MISSING_REDIRECT_URL'
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

/**
 * Civic Auth token types
 * Civic Auth token 类型
 */
export enum TokenType {
  ID_TOKEN = 'idToken',
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken'
} 