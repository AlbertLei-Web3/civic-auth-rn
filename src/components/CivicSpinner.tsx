/**
 * CivicAuth React Native Wrapper - Civic Spinner Component
 * CivicAuth React Native 包装器 - Civic 旋转器组件
 * 
 * This file contains the professional loading spinner component
 * 此文件包含专业的加载旋转器组件
 * 
 * Follows Civic's design guidelines with smooth animations
 * 遵循 Civic 设计指南，具有流畅的动画效果
 * 
 * Related files: src/components/index.ts, demo/screens/DemoLoginScreen.tsx
 * 相关文件：src/components/index.ts, demo/screens/DemoLoginScreen.tsx
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
} from 'react-native';

/**
 * Civic Spinner Props Interface
 * Civic 旋转器属性接口
 * 
 * Defines the props for the Civic-style spinner component
 * 定义 Civic 风格旋转器组件的属性
 */
export interface CivicSpinnerProps {
  size?: 'small' | 'medium' | 'large';  // Spinner size 旋转器尺寸
  color?: string;                        // Spinner color 旋转器颜色
  text?: string;                         // Loading text 加载文本
  textStyle?: TextStyle;                 // Custom text style 自定义文本样式
  style?: ViewStyle;                     // Custom container style 自定义容器样式
  showText?: boolean;                    // Whether to show loading text 是否显示加载文本
}

/**
 * Civic Spinner Component
 * Civic 旋转器组件
 * 
 * A professional loading spinner with smooth animations
 * 具有流畅动画效果的专业加载旋转器
 */
const CivicSpinner: React.FC<CivicSpinnerProps> = ({
  size = 'medium',
  color = '#2D8CFF',
  text = 'Loading...',
  textStyle,
  style,
  showText = true,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  /**
   * Start the spinning animation
   * 开始旋转动画
   */
  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    return () => {
      spinAnimation.stop();
    };
  }, [spinValue]);

  /**
   * Create the spinning animation interpolation
   * 创建旋转动画插值
   */
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  /**
   * Get spinner size based on size prop
   * 根据尺寸属性获取旋转器尺寸
   */
  const getSpinnerSize = (): number => {
    switch (size) {
      case 'small':
        return 20;
      case 'large':
        return 40;
      default:
        return 30;
    }
  };

  /**
   * Get text size based on spinner size
   * 根据旋转器尺寸获取文本尺寸
   */
  const getTextSize = (): number => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 16;
      default:
        return 14;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Spinner circle */}
      {/* 旋转器圆圈 */}
      <View style={[styles.spinnerContainer, { width: getSpinnerSize(), height: getSpinnerSize() }]}>
        <Animated.View
          style={[
            styles.spinner,
            {
              width: getSpinnerSize(),
              height: getSpinnerSize(),
              borderColor: color,
              transform: [{ rotate: spin }],
            },
          ]}
        />
      </View>

      {/* Loading text */}
      {/* 加载文本 */}
      {showText && (
        <Text style={[
          styles.text,
          { fontSize: getTextSize(), color },
          textStyle,
        ]}>
          {text}
        </Text>
      )}
    </View>
  );
};

/**
 * Civic Spinner Styles
 * Civic 旋转器样式
 * 
 * Professional styling with smooth animations
 * 具有流畅动画效果的专业样式
 */
const styles = StyleSheet.create({
  // Container styles
  // 容器样式
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  // Spinner container
  // 旋转器容器
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  // Spinner circle
  // 旋转器圆圈
  spinner: {
    borderRadius: 50,
    borderWidth: 2,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  // Text styles
  // 文本样式
  text: {
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default CivicSpinner; 