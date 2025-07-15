/**
 * CivicAuth React Native Demo App
 * CivicAuth React Native 演示应用
 *
 * 这是一个简洁的演示应用，展示如何使用 CivicAuth React Native 包装器
 * This is a clean demo app showing how to use the CivicAuth React Native wrapper
 */

import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  Alert 
} from 'react-native';
import { CivicAuthProvider } from 'civic-auth-rn';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'profile'>('login');

  const handleLoginSuccess = () => {
    setCurrentScreen('profile');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <CivicAuthProvider
        clientId="demo-client-id"
        redirectUrl="civicauthdemo://callback"
        displayMode="redirect"
      >
        <View style={styles.header}>
          <Text style={styles.title}>🔐 CivicAuth Demo</Text>
          <Text style={styles.subtitle}>React Native Wrapper</Text>
        </View>

        <View style={styles.content}>
          {currentScreen === 'login' ? (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          ) : (
            <ProfileScreen onLogout={handleLogout} />
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            基于 @civic/auth 的 React Native 包装器
          </Text>
          <Text style={styles.footerText}>
            Powered by Civic Auth React Native Wrapper
          </Text>
        </View>
      </CivicAuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D8CFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
}); 