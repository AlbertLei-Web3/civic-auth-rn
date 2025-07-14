/**
 * CivicAuth React Native Wrapper - Authentication Helper Utilities
 * CivicAuth React Native 包装器 - 认证辅助工具
 * 
 * This file contains authentication helper utilities for the demo app
 * 此文件包含演示应用的认证辅助工具
 * 
 * Provides configuration validation, token management, and authentication flow helpers
 * 提供配置验证、token 管理和认证流程辅助函数
 * 
 * Related files: demo/screens/DemoLoginScreen.tsx, src/types/index.ts
 * 相关文件：demo/screens/DemoLoginScreen.tsx, src/types/index.ts
 */

import { LoginOptions, AuthResult } from '../../src/types';

/**
 * Demo Configuration Interface
 * 演示配置接口
 * 
 * Defines the configuration for the demo app
 * 定义演示应用的配置
 */
export interface DemoConfig {
  clientId: string;
  redirectUrl: string;
  nonce?: string;
  displayMode?: string;
  scope?: string;
}

/**
 * Default demo configuration
 * 默认演示配置
 * 
 * Based on Civic Auth official documentation
 * 基于 Civic Auth 官方文档
 */
export const DEFAULT_DEMO_CONFIG: DemoConfig = {
  clientId: 'demo-client-id',
  redirectUrl: 'civic-auth-demo://callback',
  nonce: 'demo-nonce-' + Date.now(),
  displayMode: 'popup',
  scope: 'openid profile email',
};

/**
 * Validate authentication configuration
 * 验证认证配置
 * 
 * @param config - The configuration to validate 要验证的配置
 * @returns object - Validation result with errors if any 验证结果，如果有错误则包含错误信息
 */
export const validateAuthConfig = (config: Partial<DemoConfig>): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  // Check required fields
  // 检查必需字段
  if (!config.clientId) {
    errors.push('Client ID is required');
  }

  if (!config.redirectUrl) {
    errors.push('Redirect URL is required');
  }

  // Validate redirect URL format
  // 验证重定向 URL 格式
  if (config.redirectUrl && !isValidRedirectUrl(config.redirectUrl)) {
    errors.push('Invalid redirect URL format');
  }

  // Validate client ID format
  // 验证客户端 ID 格式
  if (config.clientId && !isValidClientId(config.clientId)) {
    errors.push('Invalid client ID format');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Check if redirect URL is valid
 * 检查重定向 URL 是否有效
 * 
 * @param url - The URL to validate 要验证的 URL
 * @returns boolean - True if URL is valid 如果 URL 有效则返回 true
 */
export const isValidRedirectUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'civic-auth-demo:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Check if client ID is valid
 * 检查客户端 ID 是否有效
 * 
 * @param clientId - The client ID to validate 要验证的客户端 ID
 * @returns boolean - True if client ID is valid 如果客户端 ID 有效则返回 true
 */
export const isValidClientId = (clientId: string): boolean => {
  // Basic validation - client ID should not be empty and should contain valid characters
  // 基本验证 - 客户端 ID 不应为空且应包含有效字符
  return clientId.length > 0 && /^[a-zA-Z0-9-_]+$/.test(clientId);
};

/**
 * Convert demo config to login options
 * 将演示配置转换为登录选项
 * 
 * @param config - The demo configuration 演示配置
 * @returns LoginOptions - Login options for Civic Auth Civic Auth 的登录选项
 */
export const configToLoginOptions = (config: DemoConfig): LoginOptions => {
  return {
    clientId: config.clientId,
    redirectUrl: config.redirectUrl,
    nonce: config.nonce,
    displayMode: config.displayMode as any,
    scope: config.scope,
  };
};

/**
 * Generate a secure nonce for authentication
 * 为认证生成安全 nonce
 * 
 * @returns string - A secure nonce string 安全 nonce 字符串
 */
export const generateNonce = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `nonce-${timestamp}-${random}`;
};

/**
 * Format authentication result for display
 * 格式化认证结果用于显示
 * 
 * @param result - The authentication result 认证结果
 * @returns object - Formatted result for UI display 格式化的结果用于 UI 显示
 */
export const formatAuthResult = (result: AuthResult) => {
  return {
    success: result.success,
    userInfo: {
      userId: result.userId,
      email: result.email,
      name: result.name,
    },
    tokens: {
      idToken: result.idToken,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
    hasTokens: !!(result.idToken || result.accessToken || result.refreshToken),
    hasUserInfo: !!(result.userId || result.email || result.name),
  };
};

/**
 * Check if authentication result contains valid tokens
 * 检查认证结果是否包含有效 token
 * 
 * @param result - The authentication result 认证结果
 * @returns boolean - True if result contains valid tokens 如果结果包含有效 token 则返回 true
 */
export const hasValidTokens = (result: AuthResult): boolean => {
  return !!(result.idToken || result.accessToken || result.refreshToken);
};

/**
 * Check if authentication result contains user information
 * 检查认证结果是否包含用户信息
 * 
 * @param result - The authentication result 认证结果
 * @returns boolean - True if result contains user info 如果结果包含用户信息则返回 true
 */
export const hasUserInfo = (result: AuthResult): boolean => {
  return !!(result.userId || result.email || result.name);
};

/**
 * Get token display information
 * 获取 token 显示信息
 * 
 * @param token - The token to format 要格式化的 token
 * @param maxLength - Maximum length for display 显示的最大长度
 * @returns object - Token display information token 显示信息
 */
export const getTokenDisplayInfo = (token: string, maxLength: number = 50) => {
  if (!token) {
    return {
      display: '',
      full: '',
      truncated: false,
    };
  }

  const truncated = token.length > maxLength;
  const display = truncated ? `${token.substring(0, maxLength)}...` : token;

  return {
    display,
    full: token,
    truncated,
  };
};

/**
 * Get authentication status summary
 * 获取认证状态摘要
 * 
 * @param result - The authentication result 认证结果
 * @returns object - Status summary 状态摘要
 */
export const getAuthStatusSummary = (result: AuthResult) => {
  const hasTokens = hasValidTokens(result);
  const hasUserInfoData = hasUserInfo(result);

  return {
    isAuthenticated: result.success,
    hasTokens,
    hasUserInfo: hasUserInfoData,
    tokenCount: [result.idToken, result.accessToken, result.refreshToken].filter(Boolean).length,
    userInfoCount: [result.userId, result.email, result.name].filter(Boolean).length,
  };
};

/**
 * Create demo configuration with current timestamp
 * 使用当前时间戳创建演示配置
 * 
 * @returns DemoConfig - Fresh demo configuration 新的演示配置
 */
export const createDemoConfig = (): DemoConfig => {
  return {
    ...DEFAULT_DEMO_CONFIG,
    nonce: generateNonce(),
  };
}; 