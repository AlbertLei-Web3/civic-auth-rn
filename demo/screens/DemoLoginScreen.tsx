/**
 * CivicAuth React Native Wrapper - Enhanced Demo Login Screen
 * CivicAuth React Native 包装器 - 增强演示登录屏幕
 * 
 * This file contains the comprehensive demo login screen that showcases all CivicAuth functionality
 * 此文件包含展示所有 CivicAuth 功能的综合演示登录屏幕
 * 
 * Features: Professional state management, real-time status updates, comprehensive error handling
 * 特性：专业状态管理、实时状态更新、综合错误处理
 * 
 * Based on Civic Auth official documentation: https://docs.civic.com/
 * 基于 Civic Auth 官方文档：https://docs.civic.com/
 * 
 * Related files: demo/App.tsx, src/CivicAuthModule.ts, src/components/
 * 相关文件：demo/App.tsx, src/CivicAuthModule.ts, src/components/
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Clipboard,
  Dimensions,
} from 'react-native';
import { loginWithCivic } from '../../src/CivicAuthModule';
import { AuthResult, LoginOptions, AuthErrorType } from '../../src/types';
import { CivicButton, CivicCard, CivicText, CivicSpinner } from '../../src/components';
import { logError, getUserFriendlyMessage, formatErrorForUI } from '../utils/errorHandlers';
import { createDemoConfig, configToLoginOptions, formatAuthResult } from '../utils/authHelpers';

/**
 * Authentication State Type
 * 认证状态类型
 * 
 * Defines the possible authentication states
 * 定义可能的认证状态
 */
type AuthState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Enhanced Demo Login Screen Component
 * 增强演示登录屏幕组件
 * 
 * This component demonstrates the complete CivicAuth functionality
 * 此组件演示完整的 CivicAuth 功能
 */
const DemoLoginScreen: React.FC = () => {
  // State management for authentication
  // 认证的状态管理
  const [authState, setAuthState] = useState<AuthState>('idle');
  const [authResult, setAuthResult] = useState<AuthResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [retryCount, setRetryCount] = useState<number>(0);

  /**
   * Handle login with Civic authentication
   * 处理 Civic 认证登录
   * 
   * Based on Civic Auth official documentation
   * 基于 Civic Auth 官方文档
   */
  const handleLoginWithCivic = useCallback(async () => {
    try {
      // Reset state and start loading
      // 重置状态并开始加载
      setAuthState('loading');
      setAuthResult(null);
      setErrorMessage('');

      // Configure Civic Auth options using helper utilities
      // 使用辅助工具配置 Civic Auth 选项
      const demoConfig = createDemoConfig();
      const options = configToLoginOptions(demoConfig);

      // Call the loginWithCivic function
      // 调用 loginWithCivic 函数
      const result = await loginWithCivic(options);

      // Update state based on result
      // 根据结果更新状态
      setAuthResult(result);
      
      if (result.success) {
        setAuthState('success');
        setRetryCount(0); // Reset retry count on success
        showSuccessAlert();
      } else {
        setAuthState('error');
        setErrorMessage(result.error || 'Authentication failed');
        showErrorAlert(result.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthState('error');
      
      // Use error handling utilities
      // 使用错误处理工具
      logError(error, { context: 'DemoLoginScreen.handleLoginWithCivic' });
      const errorMsg = getUserFriendlyMessage(error);
      setErrorMessage(errorMsg);
      showErrorAlert(errorMsg);
    }
  }, []);

  /**
   * Handle retry login
   * 处理重试登录
   */
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    handleLoginWithCivic();
  }, [handleLoginWithCivic]);

  /**
   * Show success alert
   * 显示成功提示
   */
  const showSuccessAlert = () => {
    Alert.alert(
      'Success! 成功！',
      'Authentication completed successfully. 认证成功完成。',
      [{ text: 'OK 确定' }]
    );
  };

  /**
   * Show error alert
   * 显示错误提示
   */
  const showErrorAlert = (message: string) => {
    Alert.alert(
      'Error 错误',
      message,
      [
        { text: 'Retry 重试', onPress: handleRetry },
        { text: 'OK 确定' }
      ]
    );
  };

  /**
   * Copy token to clipboard
   * 复制 token 到剪贴板
   */
  const copyToClipboard = (text: string, label: string) => {
    Clipboard.setString(text);
    Alert.alert(
      'Copied! 已复制！',
      `${label} has been copied to clipboard. ${label} 已复制到剪贴板。`,
      [{ text: 'OK 确定' }]
    );
  };

  /**
   * Get status color based on auth state
   * 根据认证状态获取状态颜色
   */
  const getStatusColor = (): string => {
    switch (authState) {
      case 'success':
        return '#10B981'; // Green
      case 'error':
        return '#EF4444'; // Red
      case 'loading':
        return '#2D8CFF'; // Civic Blue
      default:
        return '#6B7280'; // Gray
    }
  };

  /**
   * Get status text based on auth state
   * 根据认证状态获取状态文本
   */
  const getStatusText = (): string => {
    switch (authState) {
      case 'success':
        return 'Authentication Successful 认证成功';
      case 'error':
        return 'Authentication Failed 认证失败';
      case 'loading':
        return 'Authenticating... 认证中...';
      default:
        return 'Ready to Login 准备登录';
    }
  };

  /**
   * Render authentication status
   * 渲染认证状态
   */
  const renderAuthStatus = () => {
    return (
      <CivicCard style={styles.statusCard}>
        <CivicText variant="h3" weight="semibold" color={getStatusColor()} align="center">
          {getStatusText()}
        </CivicText>
        {authState === 'loading' && (
          <CivicSpinner 
            size="medium" 
            color="#2D8CFF" 
            text="Processing authentication..." 
            style={styles.spinner}
          />
        )}
        {retryCount > 0 && (
          <CivicText variant="caption" color="#6B7280" align="center" style={styles.retryText}>
            Retry attempt: {retryCount} 重试次数：{retryCount}
          </CivicText>
        )}
      </CivicCard>
    );
  };

  /**
   * Render authentication result
   * 渲染认证结果
   */
  const renderAuthResult = () => {
    if (!authResult || authState !== 'success') return null;

    return (
      <CivicCard style={styles.resultCard}>
        <CivicText variant="h3" weight="semibold" color="#1F2937" align="center" style={styles.resultTitle}>
          Authentication Result 认证结果
        </CivicText>
        
        <ScrollView style={styles.tokenContainer} showsVerticalScrollIndicator={false}>
          {/* User Information */}
          {/* 用户信息 */}
          {authResult.userId && (
            <CivicCard style={styles.tokenItem}>
              <CivicText variant="label" weight="medium" color="#374151">
                User ID 用户ID
              </CivicText>
              <CivicText variant="body" color="#1F2937" style={styles.tokenValue}>
                {authResult.userId}
              </CivicText>
              <CivicButton
                title="Copy 复制"
                onPress={() => copyToClipboard(authResult.userId!, 'User ID')}
                variant="secondary"
                size="small"
                style={styles.copyButton}
              />
            </CivicCard>
          )}

          {authResult.email && (
            <CivicCard style={styles.tokenItem}>
              <CivicText variant="label" weight="medium" color="#374151">
                Email 邮箱
              </CivicText>
              <CivicText variant="body" color="#1F2937" style={styles.tokenValue}>
                {authResult.email}
              </CivicText>
              <CivicButton
                title="Copy 复制"
                onPress={() => copyToClipboard(authResult.email!, 'Email')}
                variant="secondary"
                size="small"
                style={styles.copyButton}
              />
            </CivicCard>
          )}

          {authResult.name && (
            <CivicCard style={styles.tokenItem}>
              <CivicText variant="label" weight="medium" color="#374151">
                Name 姓名
              </CivicText>
              <CivicText variant="body" color="#1F2937" style={styles.tokenValue}>
                {authResult.name}
              </CivicText>
              <CivicButton
                title="Copy 复制"
                onPress={() => copyToClipboard(authResult.name!, 'Name')}
                variant="secondary"
                size="small"
                style={styles.copyButton}
              />
            </CivicCard>
          )}

          {/* Token Information */}
          {/* Token 信息 */}
          {authResult.idToken && (
            <CivicCard style={styles.tokenItem}>
              <CivicText variant="label" weight="medium" color="#374151">
                ID Token
              </CivicText>
              <CivicText variant="caption" color="#6B7280" style={styles.tokenValue}>
                {authResult.idToken.substring(0, 50)}...
              </CivicText>
              <CivicButton
                title="Copy 复制"
                onPress={() => copyToClipboard(authResult.idToken!, 'ID Token')}
                variant="secondary"
                size="small"
                style={styles.copyButton}
              />
            </CivicCard>
          )}

          {authResult.accessToken && (
            <CivicCard style={styles.tokenItem}>
              <CivicText variant="label" weight="medium" color="#374151">
                Access Token
              </CivicText>
              <CivicText variant="caption" color="#6B7280" style={styles.tokenValue}>
                {authResult.accessToken.substring(0, 50)}...
              </CivicText>
              <CivicButton
                title="Copy 复制"
                onPress={() => copyToClipboard(authResult.accessToken!, 'Access Token')}
                variant="secondary"
                size="small"
                style={styles.copyButton}
              />
            </CivicCard>
          )}

          {authResult.refreshToken && (
            <CivicCard style={styles.tokenItem}>
              <CivicText variant="label" weight="medium" color="#374151">
                Refresh Token
              </CivicText>
              <CivicText variant="caption" color="#6B7280" style={styles.tokenValue}>
                {authResult.refreshToken.substring(0, 50)}...
              </CivicText>
              <CivicButton
                title="Copy 复制"
                onPress={() => copyToClipboard(authResult.refreshToken!, 'Refresh Token')}
                variant="secondary"
                size="small"
                style={styles.copyButton}
              />
            </CivicCard>
          )}
        </ScrollView>
      </CivicCard>
    );
  };

  /**
   * Render error display
   * 渲染错误显示
   */
  const renderErrorDisplay = () => {
    if (authState !== 'error' || !errorMessage) return null;

    return (
      <CivicCard style={styles.errorCard}>
        <CivicText variant="h3" weight="semibold" color="#EF4444" align="center">
          Error Details 错误详情
        </CivicText>
        <CivicText variant="body" color="#6B7280" style={styles.errorMessage}>
          {errorMessage}
        </CivicText>
        <CivicButton
          title="Retry Authentication 重试验证"
          onPress={handleRetry}
          variant="primary"
          size="medium"
          style={styles.retryButton}
        />
      </CivicCard>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      {/* 标题 */}
      <View style={styles.header}>
        <CivicText variant="h1" weight="bold" color="#1F2937" align="center">
          CivicAuth Demo
        </CivicText>
        <CivicText variant="h3" weight="medium" color="#6B7280" align="center" style={styles.subtitle}>
          React Native Wrapper
        </CivicText>
        <CivicText variant="body" weight="normal" color="#9CA3AF" align="center" style={styles.description}>
          Based on Civic Auth official documentation
        </CivicText>
      </View>

      {/* Authentication Status */}
      {/* 认证状态 */}
      {renderAuthStatus()}

      {/* Main content */}
      {/* 主要内容 */}
      <View style={styles.content}>
        {/* Login button */}
        {/* 登录按钮 */}
        <CivicButton
          title="Login with Civic"
          onPress={handleLoginWithCivic}
          loading={authState === 'loading'}
          disabled={authState === 'loading'}
          variant="primary"
          size="large"
          style={styles.loginButton}
        />

        {/* Authentication result */}
        {/* 认证结果 */}
        {renderAuthResult()}

        {/* Error display */}
        {/* 错误显示 */}
        {renderErrorDisplay()}
      </View>

      {/* Footer */}
      {/* 页脚 */}
      <View style={styles.footer}>
        <CivicText variant="caption" weight="medium" color="#6B7280" align="center">
          Powered by Civic Identity
        </CivicText>
        <CivicText variant="caption" weight="normal" color="#9CA3AF" align="center" style={styles.docsText}>
          docs.civic.com
        </CivicText>
      </View>
    </ScrollView>
  );
};

/**
 * Enhanced Demo Login Screen Styles
 * 增强演示登录屏幕样式
 * 
 * Professional styling with responsive design
 * 具有响应式设计的专业样式
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  subtitle: {
    marginTop: 8,
  },

  description: {
    marginTop: 8,
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  statusCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
  },

  spinner: {
    marginTop: 16,
  },

  retryText: {
    marginTop: 8,
  },

  loginButton: {
    marginBottom: 24,
  },

  resultCard: {
    marginBottom: 24,
    padding: 20,
  },

  resultTitle: {
    marginBottom: 16,
  },

  tokenContainer: {
    maxHeight: 400,
  },

  tokenItem: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#F3F4F6',
  },

  tokenValue: {
    marginTop: 4,
    marginBottom: 8,
    fontFamily: 'monospace',
  },

  copyButton: {
    alignSelf: 'flex-end',
  },

  errorCard: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#FEF2F2',
  },

  errorMessage: {
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'center',
  },

  retryButton: {
    alignSelf: 'center',
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },

  docsText: {
    marginTop: 4,
  },
});

export default DemoLoginScreen; 