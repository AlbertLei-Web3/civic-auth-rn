/**
 * CivicAuth React Native Wrapper - Civic Text Component
 * CivicAuth React Native 包装器 - Civic 文本组件
 * 
 * This file contains the text component with Inter font family
 * 此文件包含使用 Inter 字体族的文本组件
 * 
 * Follows Civic's design guidelines with light weights and proper typography
 * 遵循 Civic 设计指南，使用轻量字重和正确的排版
 * 
 * Related files: src/components/index.ts, demo/screens/DemoLoginScreen.tsx
 * 相关文件：src/components/index.ts, demo/screens/DemoLoginScreen.tsx
 */

import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  TextProps,
} from 'react-native';

/**
 * Civic Text Variants
 * Civic 文本变体
 * 
 * Defines the available text variants following Civic's design system
 * 定义遵循 Civic 设计系统的可用文本变体
 */
export type CivicTextVariant = 
  | 'h1'      // Large heading 大标题
  | 'h2'      // Medium heading 中标题
  | 'h3'      // Small heading 小标题
  | 'body'    // Body text 正文
  | 'caption' // Caption text 说明文本
  | 'button'  // Button text 按钮文本
  | 'label';  // Label text 标签文本

/**
 * Civic Text Props Interface
 * Civic 文本属性接口
 * 
 * Extends React Native TextProps with Civic-specific styling
 * 使用 Civic 特定样式扩展 React Native TextProps
 */
export interface CivicTextProps extends TextProps {
  variant?: CivicTextVariant;       // Text variant 文本变体
  color?: string;                    // Text color 文本颜色
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'; // Font weight 字体粗细
  align?: 'left' | 'center' | 'right'; // Text alignment 文本对齐
  style?: TextStyle;                 // Custom text style 自定义文本样式
}

/**
 * Civic Text Component
 * Civic 文本组件
 * 
 * A professional text component with Inter font family
 * 使用 Inter 字体族的专业文本组件
 */
const CivicText: React.FC<CivicTextProps> = ({
  variant = 'body',
  color = '#1F2937',
  weight = 'regular',
  align = 'left',
  style,
  children,
  ...props
}) => {
  /**
   * Get text style based on variant and props
   * 根据变体和属性获取文本样式
   */
  const getTextStyle = (): TextStyle => {
    const baseStyle = styles[variant];
    const weightStyle = styles[weight];
    const colorStyle = { color };
    const alignStyle = { textAlign: align };
    
    return [
      baseStyle,
      weightStyle,
      colorStyle,
      alignStyle,
      style,
    ].filter(Boolean) as TextStyle;
  };

  return (
    <Text style={getTextStyle()} {...props}>
      {children}
    </Text>
  );
};

/**
 * Civic Text Styles
 * Civic 文本样式
 * 
 * Professional typography with Inter font family
 * 使用 Inter 字体族的专业排版
 */
const styles = StyleSheet.create({
  // Variant styles
  // 变体样式
  h1: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },

  h2: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.25,
  },

  h3: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },

  body: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },

  caption: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },

  button: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },

  label: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
  },

  // Weight styles (Inter font weights)
  // 粗细样式（Inter 字体粗细）
  light: {
    fontWeight: '300',
  },

  regular: {
    fontWeight: '400',
  },

  medium: {
    fontWeight: '500',
  },

  semibold: {
    fontWeight: '600',
  },

  bold: {
    fontWeight: '700',
  },
});

export default CivicText; 