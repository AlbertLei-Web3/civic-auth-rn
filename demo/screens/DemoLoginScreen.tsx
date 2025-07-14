/**
 * CivicAuth React Native Wrapper - Demo Login Screen
 * CivicAuth React Native 包装器 - 演示登录屏幕
 * 
 * This file contains the demo login screen that showcases the CivicAuth functionality
 * 此文件包含展示 CivicAuth 功能的演示登录屏幕
 * 
 * It demonstrates the loginWithCivic function with a clean, minimal UI following Civic's design
 * 它通过遵循 Civic 设计的简洁、极简 UI 演示 loginWithCivic 函数
 * 
 * Based on Civic Auth official documentation: https://docs.civic.com/
 * 基于 Civic Auth 官方文档：https://docs.civic.com/
 * 
 * Related files: demo/App.tsx, src/CivicAuthModule.ts
 * 相关文件：demo/App.tsx, src/CivicAuthModule.ts
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { loginWithCivic } from '../../src/CivicAuthModule';
import { AuthResult, LoginOptions } from '../../src/types';

/**
 * Demo Login Screen Component
 * 演示登录屏幕组件
 * 
 * This component demonstrates the CivicAuth login functionality
 * 此组件演示 CivicAuth 登录功能
 */
const DemoLoginScreen: React.FC = () => {
  // State management for authentication
  // 认证的状态管理
  const [isLoading, setIsLoading] = useState(false);
  const [authResult, setAuthResult] = useState<AuthResult | null>(null);

  /**
   * Handle login with Civic
   * 处理 Civic 登录
   * 
   * Based on Civic Auth official documentation
   * 基于 Civic Auth 官方文档
   */
  const handleLoginWithCivic = async () => {
    try {
      setIsLoading(true);
      setAuthResult(null);

      // Configure Civic Auth options based on official documentation
      // 根据官方文档配置 Civic Auth 选项
      const options: LoginOptions = {
        clientId: 'demo-client-id', // Replace with your actual client ID
        redirectUrl: 'civic-auth-demo://callback', // Your app's redirect URL
        nonce: 'demo-nonce-' + Date.now(), // Anti-replay protection
        displayMode: 'popup', // Login window presentation
        scope: 'openid profile email'
      };

      // Call the loginWithCivic function
      // 调用 loginWithCivic 函数
      const result = await loginWithCivic(options);

      setAuthResult(result);

      if (result.success) {
        Alert.alert(
          'Success! 成功！',
          'Authentication completed successfully. 认证成功完成。',
          [{ text: 'OK 确定' }]
        );
      } else {
        Alert.alert(
          'Error 错误',
          result.error || 'Authentication failed. 认证失败。',
          [{ text: 'OK 确定' }]
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Error 错误',
        'An unexpected error occurred. 发生意外错误。',
        [{ text: 'OK 确定' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render authentication result
   * 渲染认证结果
   */
  const renderAuthResult = () => {
    if (!authResult) return null;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>
          {authResult.success ? 'Authenticated ✅' : 'Not authenticated ❌'}
        </Text>
        
        {authResult.success && (
          <ScrollView style={styles.tokenContainer}>
            {authResult.idToken && (
              <Text style={styles.tokenText}>
                ID Token: {authResult.idToken.substring(0, 30)}...
              </Text>
            )}
            {authResult.accessToken && (
              <Text style={styles.tokenText}>
                Access Token: {authResult.accessToken.substring(0, 30)}...
              </Text>
            )}
            {authResult.refreshToken && (
              <Text style={styles.tokenText}>
                Refresh Token: {authResult.refreshToken.substring(0, 30)}...
              </Text>
            )}
            {authResult.userId && (
              <Text style={styles.userInfoText}>
                User ID: {authResult.userId}
              </Text>
            )}
            {authResult.email && (
              <Text style={styles.userInfoText}>
                Email: {authResult.email}
              </Text>
            )}
            {authResult.name && (
              <Text style={styles.userInfoText}>
                Name: {authResult.name}
              </Text>
            )}
          </ScrollView>
        )}
        
        {authResult.error && (
          <Text style={styles.errorText}>
            Error: {authResult.error}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* 标题 */}
      <View style={styles.header}>
        <Text style={styles.title}>CivicAuth Demo</Text>
        <Text style={styles.subtitle}>React Native Wrapper</Text>
        <Text style={styles.description}>
          Based on Civic Auth official documentation
        </Text>
      </View>

      {/* Main content */}
      {/* 主要内容 */}
      <View style={styles.content}>
        {/* Login button */}
        {/* 登录按钮 */}
        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLoginWithCivic}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>Login with Civic</Text>
          )}
        </TouchableOpacity>

        {/* Authentication result */}
        {/* 认证结果 */}
        {renderAuthResult()}
      </View>

      {/* Footer */}
      {/* 页脚 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by Civic Identity
        </Text>
        <Text style={styles.docsText}>
          docs.civic.com
        </Text>
      </View>
    </View>
  );
};

/**
 * Styles for the demo login screen
 * 演示登录屏幕的样式
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#6B7280',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  content: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#2D8CFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#2D8CFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    maxHeight: 200,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
  },
  tokenContainer: {
    width: '100%',
    maxHeight: 120,
  },
  tokenText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  userInfoText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '300',
    marginBottom: 4,
  },
  docsText: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '300',
  },
});

export default DemoLoginScreen; 