/**
 * CivicAuth React Native Wrapper - CivicText Component
 * CivicAuth React Native 包装器 - CivicText 组件
 * 
 * This file contains the CivicText component following Civic's design guidelines
 * 此文件包含遵循 Civic 设计指南的 CivicText 组件
 * 
 * Features: Typography variants, Inter font family, consistent text styling
 * 特性：排版变体、Inter 字体族、一致的文本样式
 * 
 * Based on Civic Auth official design guidelines
 * 基于 Civic Auth 官方设计指南
 * 
 * Related files: demo/screens/DemoLoginScreen.tsx, src/components/CivicButton.tsx
 * 相关文件：demo/screens/DemoLoginScreen.tsx, src/components/CivicButton.tsx
 */

import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
} from 'react-native';

/**
 * CivicText Props Interface
 * CivicText 属性接口
 * 
 * Defines the props for the CivicText component
 * 定义 CivicText 组件的属性
 */
interface CivicTextProps {
  children: React.ReactNode;       // Text content 文本内容
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label'; // Typography variant 排版变体
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'; // Font weight 字体粗细
  color?: string;                  // Text color 文本颜色
  align?: 'left' | 'center' | 'right'; // Text alignment 文本对齐
  numberOfLines?: number;          // Number of lines 行数限制
  style?: TextStyle;               // Custom text style 自定义文本样式
}

/**
 * CivicText Component
 * CivicText 组件
 * 
 * A professional text component following Civic's design guidelines
 * 遵循 Civic 设计指南的专业文本组件
 * 
 * @param props - CivicText properties CivicText 属性
 * @returns JSX.Element - The rendered text component 渲染的文本组件
 */
const CivicText: React.FC<CivicTextProps> = ({
  children,
  variant = 'body',
  weight = 'normal',
  color = '#1F2937',
  align = 'left',
  numberOfLines,
  style,
}) => {
  // Combine styles based on props
  // 根据属性组合样式
  const textStyle = [
    styles.base,
    styles[variant],
    styles[`weight_${weight}`],
    {
      color,
      textAlign: align,
    },
    style,
  ];

  return (
    <Text 
      style={textStyle}
      numberOfLines={numberOfLines}
      allowFontScaling={false} // Consistent sizing across devices 设备间一致的大小
    >
      {children}
    </Text>
  );
};

/**
 * CivicText Styles
 * CivicText 样式
 * 
 * Typography styles following Civic's design guidelines
 * 遵循 Civic 设计指南的排版样式
 */
const styles = StyleSheet.create({
  // Base text styles 基础文本样式
  base: {
    fontFamily: 'Inter', // Civic's preferred font family
    includeFontPadding: false, // Android-specific font padding removal
  },
  
  // Typography variant styles 排版变体样式
  h1: {
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Font weight styles 字体粗细样式
  weight_normal: {
    fontWeight: '400',
  },
  weight_medium: {
    fontWeight: '500',
  },
  weight_semibold: {
    fontWeight: '600',
  },
  weight_bold: {
    fontWeight: '700',
  },
});

export default CivicText; 