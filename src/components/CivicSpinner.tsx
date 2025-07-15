/**
 * CivicAuth React Native Wrapper - CivicSpinner Component
 * CivicAuth React Native 包装器 - CivicSpinner 组件
 * 
 * This file contains the CivicSpinner component following Civic's design guidelines
 * 此文件包含遵循 Civic 设计指南的 CivicSpinner 组件
 * 
 * Features: Civic Blue (#2D8CFF) spinner, customizable size, optional text
 * 特性：Civic Blue (#2D8CFF) 旋转器、可自定义大小、可选文本
 * 
 * Based on Civic Auth official design guidelines
 * 基于 Civic Auth 官方设计指南
 * 
 * Related files: demo/screens/DemoLoginScreen.tsx, src/components/CivicButton.tsx
 * 相关文件：demo/screens/DemoLoginScreen.tsx, src/components/CivicButton.tsx
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import CivicText from './CivicText';

/**
 * CivicSpinner Props Interface
 * CivicSpinner 属性接口
 * 
 * Defines the props for the CivicSpinner component
 * 定义 CivicSpinner 组件的属性
 */
interface CivicSpinnerProps {
  size?: 'small' | 'medium' | 'large'; // Spinner size 旋转器大小
  color?: string;                       // Spinner color 旋转器颜色
  text?: string;                        // Optional loading text 可选的加载文本
  textColor?: string;                   // Text color 文本颜色
  style?: ViewStyle;                    // Custom container style 自定义容器样式
}

/**
 * CivicSpinner Component
 * CivicSpinner 组件
 * 
 * A professional loading spinner component following Civic's design guidelines
 * 遵循 Civic 设计指南的专业加载旋转器组件
 * 
 * @param props - CivicSpinner properties CivicSpinner 属性
 * @returns JSX.Element - The rendered spinner component 渲染的旋转器组件
 */
const CivicSpinner: React.FC<CivicSpinnerProps> = ({
  size = 'medium',
  color = '#2D8CFF', // Civic Blue
  text,
  textColor = '#6B7280',
  style,
}) => {
  // Map size to ActivityIndicator size
  // 将大小映射到 ActivityIndicator 大小
  const getActivityIndicatorSize = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
        return 'large';
      default:
        return 'small'; // ActivityIndicator only supports 'small' and 'large'
    }
  };

  // Get custom size for medium variant
  // 获取中等变体的自定义大小
  const getCustomSize = () => {
    switch (size) {
      case 'small':
        return 20;
      case 'medium':
        return 32;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        size={getActivityIndicatorSize()}
        color={color}
        style={[
          styles.spinner,
          size === 'medium' && {
            transform: [{ scale: getCustomSize() / 20 }], // Scale for medium size
          },
        ]}
      />
      {text && (
        <CivicText
          variant="caption"
          weight="medium"
          color={textColor}
          align="center"
          style={styles.text}
        >
          {text}
        </CivicText>
      )}
    </View>
  );
};

/**
 * CivicSpinner Styles
 * CivicSpinner 样式
 * 
 * Styles for the spinner component
 * 旋转器组件的样式
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    // Base spinner styles 基础旋转器样式
  },
  text: {
    marginTop: 8,
  },
});

export default CivicSpinner; 