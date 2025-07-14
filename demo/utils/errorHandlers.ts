/**
 * CivicAuth React Native Wrapper - Error Handling Utilities
 * CivicAuth React Native 包装器 - 错误处理工具
 * 
 * This file contains comprehensive error handling utilities for the demo app
 * 此文件包含演示应用的综合错误处理工具
 * 
 * Provides detailed error categorization and user-friendly messages
 * 提供详细的错误分类和用户友好的消息
 * 
 * Related files: demo/screens/DemoLoginScreen.tsx, src/types/index.ts
 * 相关文件：demo/screens/DemoLoginScreen.tsx, src/types/index.ts
 */

import { AuthErrorType } from '../../src/types';

/**
 * Error Categories
 * 错误类别
 * 
 * Defines different types of errors that can occur during authentication
 * 定义认证过程中可能发生的不同类型的错误
 */
export enum ErrorCategory {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  CONFIGURATION = 'CONFIGURATION',
  USER_ACTION = 'USER_ACTION',
  SYSTEM = 'SYSTEM',
}

/**
 * Error Information Interface
 * 错误信息接口
 * 
 * Contains detailed information about an error
 * 包含错误的详细信息
 */
export interface ErrorInfo {
  category: ErrorCategory;
  code: string;
  message: string;
  userMessage: string;
  technicalDetails?: string;
  suggestedAction?: string;
}

/**
 * Error Logger Interface
 * 错误日志接口
 * 
 * Defines the structure for error logging
 * 定义错误日志记录的结构
 */
export interface ErrorLog {
  timestamp: string;
  error: ErrorInfo;
  context?: any;
  stackTrace?: string;
}

/**
 * Get error information based on error type
 * 根据错误类型获取错误信息
 * 
 * @param error - The error object or message 错误对象或消息
 * @returns ErrorInfo - Detailed error information 详细的错误信息
 */
export const getErrorInfo = (error: any): ErrorInfo => {
  const errorMessage = error?.message || error?.toString() || 'Unknown error';
  
  // Check for specific Civic Auth error types
  // 检查特定的 Civic Auth 错误类型
  if (errorMessage.includes('MISSING_CLIENT_ID')) {
    return {
      category: ErrorCategory.CONFIGURATION,
      code: 'MISSING_CLIENT_ID',
      message: 'Client ID is required for Civic Auth',
      userMessage: 'Configuration error: Client ID is missing. Please check your setup.',
      technicalDetails: 'The clientId parameter is required for Civic Auth authentication.',
      suggestedAction: 'Verify that clientId is properly configured in your authentication options.',
    };
  }

  if (errorMessage.includes('MISSING_REDIRECT_URL')) {
    return {
      category: ErrorCategory.CONFIGURATION,
      code: 'MISSING_REDIRECT_URL',
      message: 'Redirect URL is required for Civic Auth',
      userMessage: 'Configuration error: Redirect URL is missing. Please check your setup.',
      technicalDetails: 'The redirectUrl parameter is required for Civic Auth authentication.',
      suggestedAction: 'Verify that redirectUrl is properly configured in your authentication options.',
    };
  }

  if (errorMessage.includes('NETWORK_ERROR')) {
    return {
      category: ErrorCategory.NETWORK,
      code: 'NETWORK_ERROR',
      message: 'Network connection error',
      userMessage: 'Network error: Unable to connect to Civic Auth servers.',
      technicalDetails: 'The app cannot establish a connection to the Civic Auth service.',
      suggestedAction: 'Check your internet connection and try again.',
    };
  }

  if (errorMessage.includes('USER_CANCELLED')) {
    return {
      category: ErrorCategory.USER_ACTION,
      code: 'USER_CANCELLED',
      message: 'User cancelled the authentication process',
      userMessage: 'Authentication was cancelled by the user.',
      technicalDetails: 'The user closed the authentication window or cancelled the process.',
      suggestedAction: 'Try logging in again when you are ready.',
    };
  }

  if (errorMessage.includes('TIMEOUT')) {
    return {
      category: ErrorCategory.NETWORK,
      code: 'TIMEOUT',
      message: 'Authentication request timed out',
      userMessage: 'Request timed out: The authentication process took too long.',
      technicalDetails: 'The authentication request exceeded the timeout limit.',
      suggestedAction: 'Check your internet connection and try again.',
    };
  }

  if (errorMessage.includes('INVALID_TOKEN')) {
    return {
      category: ErrorCategory.AUTHENTICATION,
      code: 'INVALID_TOKEN',
      message: 'Invalid or expired authentication token',
      userMessage: 'Authentication error: The provided token is invalid or has expired.',
      technicalDetails: 'The authentication token received from Civic Auth is invalid or expired.',
      suggestedAction: 'Try logging in again to get a fresh token.',
    };
  }

  // Default error handling
  // 默认错误处理
  return {
    category: ErrorCategory.SYSTEM,
    code: 'UNKNOWN_ERROR',
    message: errorMessage,
    userMessage: 'An unexpected error occurred during authentication.',
    technicalDetails: errorMessage,
    suggestedAction: 'Please try again. If the problem persists, contact support.',
  };
};

/**
 * Log error for debugging purposes
 * 记录错误用于调试
 * 
 * @param error - The error object 错误对象
 * @param context - Additional context information 额外的上下文信息
 */
export const logError = (error: any, context?: any): void => {
  const errorInfo = getErrorInfo(error);
  const errorLog: ErrorLog = {
    timestamp: new Date().toISOString(),
    error: errorInfo,
    context,
    stackTrace: error?.stack,
  };

  // Log to console for development
  // 记录到控制台用于开发
  console.error('CivicAuth Error Log:', errorLog);
  
  // In a production app, you would send this to your error tracking service
  // 在生产应用中，您会将此发送到错误跟踪服务
  // Example: Sentry.captureException(error, { extra: errorLog });
};

/**
 * Get user-friendly error message
 * 获取用户友好的错误消息
 * 
 * @param error - The error object 错误对象
 * @returns string - User-friendly error message 用户友好的错误消息
 */
export const getUserFriendlyMessage = (error: any): string => {
  const errorInfo = getErrorInfo(error);
  return errorInfo.userMessage;
};

/**
 * Get suggested action for error recovery
 * 获取错误恢复的建议操作
 * 
 * @param error - The error object 错误对象
 * @returns string - Suggested action 建议的操作
 */
export const getSuggestedAction = (error: any): string => {
  const errorInfo = getErrorInfo(error);
  return errorInfo.suggestedAction || 'Please try again.';
};

/**
 * Check if error is retryable
 * 检查错误是否可重试
 * 
 * @param error - The error object 错误对象
 * @returns boolean - True if error can be retried 如果错误可以重试则返回 true
 */
export const isRetryableError = (error: any): boolean => {
  const errorInfo = getErrorInfo(error);
  
  // Network errors and timeouts are usually retryable
  // 网络错误和超时通常可以重试
  return errorInfo.category === ErrorCategory.NETWORK || 
         errorInfo.code === 'TIMEOUT' ||
         errorInfo.code === 'UNKNOWN_ERROR';
};

/**
 * Get error category color for UI display
 * 获取错误类别颜色用于 UI 显示
 * 
 * @param error - The error object 错误对象
 * @returns string - Color code 颜色代码
 */
export const getErrorCategoryColor = (error: any): string => {
  const errorInfo = getErrorInfo(error);
  
  switch (errorInfo.category) {
    case ErrorCategory.NETWORK:
      return '#F59E0B'; // Amber
    case ErrorCategory.AUTHENTICATION:
      return '#EF4444'; // Red
    case ErrorCategory.CONFIGURATION:
      return '#8B5CF6'; // Purple
    case ErrorCategory.USER_ACTION:
      return '#6B7280'; // Gray
    case ErrorCategory.SYSTEM:
      return '#DC2626'; // Dark Red
    default:
      return '#6B7280'; // Gray
  }
};

/**
 * Format error for display in UI
 * 格式化错误以在 UI 中显示
 * 
 * @param error - The error object 错误对象
 * @returns object - Formatted error for UI display 格式化的错误用于 UI 显示
 */
export const formatErrorForUI = (error: any) => {
  const errorInfo = getErrorInfo(error);
  
  return {
    title: `${errorInfo.category} Error`,
    message: errorInfo.userMessage,
    suggestion: errorInfo.suggestedAction,
    color: getErrorCategoryColor(error),
    isRetryable: isRetryableError(error),
    technicalDetails: errorInfo.technicalDetails,
  };
}; 