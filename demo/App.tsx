/**
 * CivicAuth React Native Wrapper - Demo Application
 * CivicAuth React Native 包装器 - 演示应用
 * 
 * This file contains the main demo app that showcases the CivicAuth functionality
 * 此文件包含展示 CivicAuth 功能的主要演示应用
 * 
 * It demonstrates the loginWithCivic function with a clean, minimal UI
 * 它通过简洁、极简的 UI 演示 loginWithCivic 函数
 * 
 * Related files: demo/screens/DemoLoginScreen.tsx, src/CivicAuthModule.ts
 * 相关文件：demo/screens/DemoLoginScreen.tsx, src/CivicAuthModule.ts
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import DemoLoginScreen from './screens/DemoLoginScreen';

/**
 * Main App Component
 * 主应用组件
 * 
 * This component serves as the entry point for the demo application
 * 此组件作为演示应用的入口点
 */
const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Status bar configuration */}
      {/* 状态栏配置 */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      
      {/* Main demo screen */}
      {/* 主要演示屏幕 */}
      <DemoLoginScreen />
    </SafeAreaView>
  );
};

/**
 * Styles for the main app container
 * 主应用容器的样式
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App; 