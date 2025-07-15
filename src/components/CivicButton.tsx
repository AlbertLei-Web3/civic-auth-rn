/**
 * CivicAuth React Native Wrapper - CivicButton Component
 * CivicAuth React Native 包装器 - CivicButton 组件
 * 
 * This file contains the CivicButton component following Civic's design guidelines
 * 此文件包含遵循 Civic 设计指南的 CivicButton 组件
 * 
 * Features: Civic Blue (#2D8CFF) styling, loading states, accessibility support
 * 特性：Civic Blue (#2D8CFF) 样式、加载状态、无障碍支持
 * 
 * Based on Civic Auth official design guidelines
 * 基于 Civic Auth 官方设计指南
 * 
 * Related files: demo/screens/DemoLoginScreen.tsx, src/components/CivicSpinner.tsx
 * 相关文件：demo/screens/DemoLoginScreen.tsx, src/components/CivicSpinner.tsx
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

/**
 * CivicButton Props Interface
 * CivicButton 属性接口
 * 
 * Defines the props for the CivicButton component
 * 定义 CivicButton 组件的属性
 */
interface CivicButtonProps {
  title: string;                    // Button text 按钮文本
  onPress: () => void;             // Press handler 按压处理器
  loading?: boolean;               // Loading state 加载状态
  disabled?: boolean;              // Disabled state 禁用状态
  variant?: 'primary' | 'secondary' | 'outline'; // Button variant 按钮变体
  size?: 'small' | 'medium' | 'large';           // Button size 按钮大小
  style?: ViewStyle;               // Custom container style 自定义容器样式
  textStyle?: TextStyle;           // Custom text style 自定义文本样式
}

/**
 * CivicButton Component
 * CivicButton 组件
 * 
 * A professional button component following Civic's design guidelines
 * 遵循 Civic 设计指南的专业按钮组件
 * 
 * @param props - CivicButton properties CivicButton 属性
 * @returns JSX.Element - The rendered button component 渲染的按钮组件
 */
const CivicButton: React.FC<CivicButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}) => {
  // Determine button styles based on variant and size
  // 根据变体和大小确定按钮样式
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    disabled && styles.disabled,
    loading && styles.loading,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={loading ? 'Loading' : 'Tap to authenticate with Civic'}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#FFFFFF' : '#2D8CFF'} 
          size="small" 
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

/**
 * CivicButton Styles
 * CivicButton 样式
 * 
 * Styles following Civic's design guidelines with Civic Blue (#2D8CFF)
 * 遵循 Civic 设计指南的样式，使用 Civic Blue (#2D8CFF)
 */
const styles = StyleSheet.create({
  // Base button styles 基础按钮样式
  base: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  
  // Variant styles 变体样式
  primary: {
    backgroundColor: '#2D8CFF', // Civic Blue
    borderColor: '#2D8CFF',
  },
  secondary: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#2D8CFF',
  },
  
  // Size styles 大小样式
  size_small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  size_medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  size_large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },
  
  // State styles 状态样式
  disabled: {
    opacity: 0.5,
  },
  loading: {
    opacity: 0.8,
  },
  
  // Text styles 文本样式
  text: {
    fontFamily: 'Inter', // Civic's preferred font family
    fontWeight: '600',
    textAlign: 'center',
  },
  text_primary: {
    color: '#FFFFFF',
  },
  text_secondary: {
    color: '#374151',
  },
  text_outline: {
    color: '#2D8CFF',
  },
  text_small: {
    fontSize: 14,
    lineHeight: 20,
  },
  text_medium: {
    fontSize: 16,
    lineHeight: 24,
  },
  text_large: {
    fontSize: 18,
    lineHeight: 28,
  },
  textDisabled: {
    opacity: 0.7,
  },
});

export default CivicButton; 