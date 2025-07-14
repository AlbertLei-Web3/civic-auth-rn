/**
 * CivicAuth React Native Wrapper - Civic Card Component
 * CivicAuth React Native 包装器 - Civic 卡片组件
 * 
 * This file contains the card-style container component
 * 此文件包含卡片式容器组件
 * 
 * Follows Civic's design guidelines with rounded corners and shadows
 * 遵循 Civic 设计指南，具有圆角和阴影效果
 * 
 * Related files: src/components/index.ts, demo/screens/DemoLoginScreen.tsx
 * 相关文件：src/components/index.ts, demo/screens/DemoLoginScreen.tsx
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';

/**
 * Civic Card Props Interface
 * Civic 卡片属性接口
 * 
 * Defines the props for the Civic-style card component
 * 定义 Civic 风格卡片组件的属性
 */
export interface CivicCardProps {
  children: React.ReactNode;        // Card content 卡片内容
  style?: ViewStyle;                 // Custom container style 自定义容器样式
  padding?: number;                  // Card padding 卡片内边距
  margin?: number;                   // Card margin 卡片外边距
  elevation?: number;                // Shadow elevation 阴影高度
  borderRadius?: number;             // Border radius 边框圆角
  backgroundColor?: string;          // Background color 背景颜色
}

/**
 * Civic Card Component
 * Civic 卡片组件
 * 
 * A professional card container with rounded corners and shadows
 * 具有圆角和阴影效果的专业卡片容器
 */
const CivicCard: React.FC<CivicCardProps> = ({
  children,
  style,
  padding = 16,
  margin = 0,
  elevation = 2,
  borderRadius = 12,
  backgroundColor = '#FFFFFF',
}) => {
  /**
   * Get card container style
   * 获取卡片容器样式
   */
  const getCardStyle = (): ViewStyle => {
    return [
      styles.card,
      {
        padding,
        margin,
        borderRadius,
        backgroundColor,
        shadowOpacity: elevation * 0.1,
        shadowRadius: elevation * 2,
        elevation: elevation,
      },
      style,
    ].filter(Boolean) as ViewStyle;
  };

  return (
    <View style={getCardStyle()}>
      {children}
    </View>
  );
};

/**
 * Civic Card Styles
 * Civic 卡片样式
 * 
 * Professional styling with shadows and rounded corners
 * 具有阴影和圆角效果的专业样式
 */
const styles = StyleSheet.create({
  // Base card styles
  // 基础卡片样式
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: '#FFFFFF',
  },
});

export default CivicCard; 