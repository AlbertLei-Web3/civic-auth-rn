/**
 * CivicAuth React Native Wrapper - CivicCard Component
 * CivicAuth React Native 包装器 - CivicCard 组件
 * 
 * This file contains the CivicCard component following Civic's design guidelines
 * 此文件包含遵循 Civic 设计指南的 CivicCard 组件
 * 
 * Features: Rounded corners, shadows, flexible padding, elevation support
 * 特性：圆角、阴影、灵活内边距、高度支持
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
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';

/**
 * CivicCard Props Interface
 * CivicCard 属性接口
 * 
 * Defines the props for the CivicCard component
 * 定义 CivicCard 组件的属性
 */
interface CivicCardProps {
  children: React.ReactNode;       // Card content 卡片内容
  padding?: number;                // Internal padding 内部内边距
  margin?: number;                 // External margin 外部外边距
  elevation?: number;              // Shadow elevation 阴影高度
  backgroundColor?: string;        // Background color 背景颜色
  borderRadius?: number;           // Border radius 边框圆角
  style?: ViewStyle;               // Custom container style 自定义容器样式
}

/**
 * CivicCard Component
 * CivicCard 组件
 * 
 * A professional card container component following Civic's design guidelines
 * 遵循 Civic 设计指南的专业卡片容器组件
 * 
 * @param props - CivicCard properties CivicCard 属性
 * @returns JSX.Element - The rendered card component 渲染的卡片组件
 */
const CivicCard: React.FC<CivicCardProps> = ({
  children,
  padding = 16,
  margin = 0,
  elevation = 2,
  backgroundColor = '#FFFFFF',
  borderRadius = 12,
  style,
}) => {
  // Create dynamic styles based on props
  // 根据属性创建动态样式
  const cardStyle = [
    styles.base,
    {
      padding,
      margin,
      backgroundColor,
      borderRadius,
      // Platform-specific shadow styles 平台特定的阴影样式
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: elevation },
          shadowOpacity: 0.1,
          shadowRadius: elevation * 2,
        },
        android: {
          elevation: elevation,
        },
      }),
    },
    style,
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

/**
 * CivicCard Styles
 * CivicCard 样式
 * 
 * Base styles for the card component
 * 卡片组件的基础样式
 */
const styles = StyleSheet.create({
  base: {
    // Base card styling 基础卡片样式
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
});

export default CivicCard; 