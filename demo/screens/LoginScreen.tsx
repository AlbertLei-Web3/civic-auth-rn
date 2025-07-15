/**
 * LoginScreen - 登录界面
 * 
 * 展示 CivicAuth 登录功能的界面
 * Screen that demonstrates CivicAuth login functionality
 */

import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  ScrollView 
} from 'react-native';
import { useUser } from 'civic-auth-rn';
import CivicAuthButton from '../components/CivicAuthButton';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const { user, isLoading, login, isAuthenticated } = useUser();

  const handleLogin = async () => {
    try {
      await login();
      if (isAuthenticated) {
        onLoginSuccess();
      }
    } catch (error) {
      Alert.alert('登录失败', 'Login failed: ' + (error as Error).message);
    }
  };

  const handleDemoLogin = () => {
    // 模拟成功登录用于演示
    // Simulate successful login for demo purposes
    Alert.alert(
      '演示模式 Demo Mode',
      '这是演示模式，将模拟成功登录\nThis is demo mode, will simulate successful login',
      [
        { text: '取消 Cancel', style: 'cancel' },
        { text: '继续 Continue', onPress: onLoginSuccess }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>欢迎使用 CivicAuth</Text>
        <Text style={styles.welcomeSubtitle}>Welcome to CivicAuth</Text>
        <Text style={styles.description}>
          使用 Civic 身份验证系统安全登录
        </Text>
        <Text style={styles.description}>
          Login securely with Civic identity verification
        </Text>
      </View>

      <View style={styles.loginSection}>
        <Text style={styles.sectionTitle}>🔐 身份验证 Authentication</Text>
        
        <CivicAuthButton
          onPress={handleLogin}
          loading={isLoading}
          title="使用 Civic 登录"
          subtitle="Login with Civic"
        />

        <View style={styles.divider}>
          <Text style={styles.dividerText}>或者 OR</Text>
        </View>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={handleDemoLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.demoButtonText}>🎭 演示模式登录</Text>
          <Text style={styles.demoButtonSubtext}>Demo Mode Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>📱 功能特点 Features</Text>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>✅ 基于 @civic/auth 的 React Native 包装器</Text>
          <Text style={styles.featureItem}>✅ React Native wrapper based on @civic/auth</Text>
          <Text style={styles.featureItem}>✅ 支持 OAuth 2.0 / OpenID Connect</Text>
          <Text style={styles.featureItem}>✅ Supports OAuth 2.0 / OpenID Connect</Text>
          <Text style={styles.featureItem}>✅ 深度链接回调处理</Text>
          <Text style={styles.featureItem}>✅ Deep link callback handling</Text>
          <Text style={styles.featureItem}>✅ TypeScript 类型支持</Text>
          <Text style={styles.featureItem}>✅ TypeScript type support</Text>
        </View>
      </View>

      <View style={styles.configSection}>
        <Text style={styles.configTitle}>⚙️ 配置信息 Configuration</Text>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Client ID:</Text>
          <Text style={styles.configValue}>demo-client-id</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Redirect URL:</Text>
          <Text style={styles.configValue}>civicauthdemo://callback</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Display Mode:</Text>
          <Text style={styles.configValue}>redirect</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D8CFF',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D8CFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 4,
  },
  loginSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 16,
    textAlign: 'center',
  },
  divider: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    fontSize: 14,
    color: '#6c757d',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
  },
  demoButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  demoButtonSubtext: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  infoSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  configSection: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  configTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 16,
    textAlign: 'center',
  },
  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  configLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
  },
  configValue: {
    fontSize: 14,
    color: '#6c757d',
    fontFamily: 'monospace',
  },
}); 