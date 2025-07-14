/**
 * CivicAuth React Native Wrapper - Type Definitions
 * CivicAuth React Native 包装器 - 类型定义
 * 
 * This file contains all TypeScript interfaces and types for the civic-auth-rn package
 * 此文件包含 civic-auth-rn 包的所有 TypeScript 接口和类型
 * 
 * Based on Civic Auth official documentation: https://docs.civic.com/
 * 基于 Civic Auth 官方文档：https://docs.civic.com/
 * 
 * Related files: src/CivicAuthModule.ts, src/index.ts
 * 相关文件：src/CivicAuthModule.ts, src/index.ts
 */

/**
 * Authentication result interface
 * 认证结果接口
 * 
 * Based on Civic Auth token structure from official documentation
 * 基于官方文档中的 Civic Auth token 结构
 */
export interface AuthResult {
  success: boolean;
  idToken?: string;        // OIDC id_token
  accessToken?: string;    // OAuth 2.0 access_token
  refreshToken?: string;   // Refresh token for re-authentication
  error?: string;
  userId?: string;
  email?: string;
  name?: string;
  forwardedTokens?: any;   // Original provider tokens if SSO login
}

/**
 * Login options interface
 * 登录选项接口
 * 
 * Based on Civic Auth client configuration requirements
 * 基于 Civic Auth 客户端配置要求
 */
export interface LoginOptions {
  clientId: string;        // Required: Civic Dashboard project ID
  redirectUrl: string;     // Required: OAuth callback URL
  nonce?: string;          // Optional: Bind request/response (anti-replay)
  iframeMode?: string;     // Optional: Control login window presentation
  displayMode?: string;    // Optional: Display mode for login
  scope?: string;          // Optional: Authentication scope
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