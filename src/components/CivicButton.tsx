/**
 * CivicAuth React Native Wrapper - Civic Button Component
 * CivicAuth React Native 包装器 - Civic 按钮组件
 * 
 * This file contains the Civic-style login button component
 * 此文件包含 Civic 风格的登录按钮组件
 * 
 * Follows Civic's official design guidelines with Civic Blue (#2D8CFF)
 * 遵循 Civic 官方设计指南，使用 Civic Blue (#2D8CFF)
 * 
 * Related files: src/components/index.ts, demo/screens/DemoLoginScreen.tsx
 * 相关文件：src/components/index.ts, demo/screens/DemoLoginScreen.tsx
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

/**
 * Civic Button Props Interface
 * Civic 按钮属性接口
 * 
 * Defines the props for the Civic-style button component
 * 定义 Civic 风格按钮组件的属性
 */
export interface CivicButtonProps {
  title: string;                    // Button text 按钮文本
  onPress: () => void;             // Press handler 按下处理函数
  loading?: boolean;                // Loading state 加载状态
  disabled?: boolean;               // Disabled state 禁用状态
  variant?: 'primary' | 'secondary'; // Button variant 按钮变体
  size?: 'small' | 'medium' | 'large'; // Button size 按钮尺寸
  style?: ViewStyle;                // Custom container style 自定义容器样式
  textStyle?: TextStyle;            // Custom text style 自定义文本样式
}

/**
 * Civic Button Component
 * Civic 按钮组件
 * 
 * A professional button component following Civic's design guidelines
 * 遵循 Civic 设计指南的专业按钮组件
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
  /**
   * Get button container style based on variant and state
   * 根据变体和状态获取按钮容器样式
   */
  const getButtonStyle = (): ViewStyle => {
    const baseStyle = styles.button;
    const variantStyle = variant === 'primary' ? styles.primary : styles.secondary;
    const sizeStyle = styles[size];
    const stateStyle = disabled || loading ? styles.disabled : {};
    
    return [baseStyle, variantStyle, sizeStyle, stateStyle, style].filter(Boolean) as ViewStyle;
  };

  /**
   * Get text style based on variant and state
   * 根据变体和状态获取文本样式
   */
  const getTextStyle = (): TextStyle => {
    const baseStyle = styles.text;
    const variantTextStyle = variant === 'primary' ? styles.primaryText : styles.secondaryText;
    const sizeTextStyle = styles[`${size}Text`];
    const stateTextStyle = disabled || loading ? styles.disabledText : {};
    
    return [baseStyle, variantTextStyle, sizeTextStyle, stateTextStyle, textStyle].filter(Boolean) as TextStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#FFFFFF' : '#2D8CFF'} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

/**
 * Civic Button Styles
 * Civic 按钮样式
 * 
 * Professional styling following Civic's design system
 * 遵循 Civic 设计系统的专业样式
 */
const styles = StyleSheet.create({
  // Base button styles
  // 基础按钮样式
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Primary variant (Civic Blue)
  // 主要变体（Civic Blue）
  primary: {
    backgroundColor: '#2D8CFF',
    borderWidth: 0,
  },

  // Secondary variant
  // 次要变体
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2D8CFF',
  },

  // Size variants
  // 尺寸变体
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },

  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 48,
  },

  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    minHeight: 56,
  },

  // Text styles
  // 文本样式
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
  },

  secondaryText: {
    color: '#2D8CFF',
  },

  // Size-specific text styles
  // 特定尺寸的文本样式
  smallText: {
    fontSize: 14,
  },

  mediumText: {
    fontSize: 16,
  },

  largeText: {
    fontSize: 18,
  },

  // Disabled state styles
  // 禁用状态样式
  disabled: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
    opacity: 0.6,
  },

  disabledText: {
    color: '#9CA3AF',
  },
});

export default CivicButton; 