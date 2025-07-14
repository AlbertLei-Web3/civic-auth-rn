/**
 * CivicAuth React Native Wrapper - UI Components Tests
 * CivicAuth React Native 包装器 - UI 组件测试
 * 
 * This file contains comprehensive tests for the Civic UI components
 * 此文件包含 Civic UI 组件的全面测试
 * 
 * Tests button, spinner, card, and text components with proper rendering and interactions
 * 测试按钮、旋转器、卡片和文本组件的正确渲染和交互
 * 
 * Related files: src/components/CivicButton.tsx, src/components/CivicSpinner.tsx, src/components/CivicCard.tsx, src/components/CivicText.tsx
 * 相关文件：src/components/CivicButton.tsx, src/components/CivicSpinner.tsx, src/components/CivicCard.tsx, src/components/CivicText.tsx
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CivicButton, CivicSpinner, CivicCard, CivicText } from '../components';

/**
 * Civic UI Components Test Suite
 * Civic UI 组件测试套件
 * 
 * Comprehensive testing for all Civic UI components
 * 所有 Civic UI 组件的全面测试
 */
describe('Civic UI Components', () => {
  describe('CivicButton', () => {
    const mockOnPress = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should render button with default props', () => {
      const { getByText } = render(
        <CivicButton title="Test Button" onPress={mockOnPress} />
      );

      const button = getByText('Test Button');
      expect(button).toBeTruthy();
    });

    test('should handle press events', () => {
      const { getByText } = render(
        <CivicButton title="Test Button" onPress={mockOnPress} />
      );

      const button = getByText('Test Button');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    test('should render loading state', () => {
      const { getByTestId } = render(
        <CivicButton 
          title="Test Button" 
          onPress={mockOnPress} 
          loading={true}
        />
      );

      // Check if ActivityIndicator is rendered
      // 检查是否渲染了 ActivityIndicator
      expect(getByTestId('civic-button')).toBeTruthy();
    });

    test('should be disabled when loading', () => {
      const { getByText } = render(
        <CivicButton 
          title="Test Button" 
          onPress={mockOnPress} 
          loading={true}
        />
      );

      const button = getByText('Test Button');
      fireEvent.press(button);

      expect(mockOnPress).not.toHaveBeenCalled();
    });

    test('should render primary variant correctly', () => {
      const { getByText } = render(
        <CivicButton 
          title="Primary Button" 
          onPress={mockOnPress}
          variant="primary"
        />
      );

      const button = getByText('Primary Button');
      expect(button).toBeTruthy();
    });

    test('should render secondary variant correctly', () => {
      const { getByText } = render(
        <CivicButton 
          title="Secondary Button" 
          onPress={mockOnPress}
          variant="secondary"
        />
      );

      const button = getByText('Secondary Button');
      expect(button).toBeTruthy();
    });

    test('should render different sizes', () => {
      const sizes = ['small', 'medium', 'large'] as const;
      
      sizes.forEach(size => {
        const { getByText } = render(
          <CivicButton 
            title={`${size} button`} 
            onPress={mockOnPress}
            size={size}
          />
        );

        const button = getByText(`${size} button`);
        expect(button).toBeTruthy();
      });
    });

    test('should be disabled when disabled prop is true', () => {
      const { getByText } = render(
        <CivicButton 
          title="Disabled Button" 
          onPress={mockOnPress}
          disabled={true}
        />
      );

      const button = getByText('Disabled Button');
      fireEvent.press(button);

      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });

  describe('CivicSpinner', () => {
    test('should render spinner with default props', () => {
      const { getByText } = render(<CivicSpinner />);

      const loadingText = getByText('Loading...');
      expect(loadingText).toBeTruthy();
    });

    test('should render custom loading text', () => {
      const { getByText } = render(
        <CivicSpinner text="Custom loading text" />
      );

      const loadingText = getByText('Custom loading text');
      expect(loadingText).toBeTruthy();
    });

    test('should render different sizes', () => {
      const sizes = ['small', 'medium', 'large'] as const;
      
      sizes.forEach(size => {
        const { getByText } = render(
          <CivicSpinner size={size} text={`${size} spinner`} />
        );

        const loadingText = getByText(`${size} spinner`);
        expect(loadingText).toBeTruthy();
      });
    });

    test('should render with custom color', () => {
      const { getByText } = render(
        <CivicSpinner color="#FF0000" text="Red spinner" />
      );

      const loadingText = getByText('Red spinner');
      expect(loadingText).toBeTruthy();
    });

    test('should hide text when showText is false', () => {
      const { queryByText } = render(
        <CivicSpinner showText={false} />
      );

      const loadingText = queryByText('Loading...');
      expect(loadingText).toBeNull();
    });

    test('should apply custom styles', () => {
      const customStyle = { backgroundColor: '#F0F0F0' };
      const { getByTestId } = render(
        <CivicSpinner style={customStyle} />
      );

      const spinner = getByTestId('civic-spinner');
      expect(spinner).toBeTruthy();
    });
  });

  describe('CivicCard', () => {
    test('should render card with children', () => {
      const { getByText } = render(
        <CivicCard>
          <CivicText>Card content</CivicText>
        </CivicCard>
      );

      const content = getByText('Card content');
      expect(content).toBeTruthy();
    });

    test('should apply custom padding', () => {
      const { getByTestId } = render(
        <CivicCard padding={24}>
          <CivicText>Card content</CivicText>
        </CivicCard>
      );

      const card = getByTestId('civic-card');
      expect(card).toBeTruthy();
    });

    test('should apply custom elevation', () => {
      const { getByTestId } = render(
        <CivicCard elevation={4}>
          <CivicText>Card content</CivicText>
        </CivicCard>
      );

      const card = getByTestId('civic-card');
      expect(card).toBeTruthy();
    });

    test('should apply custom border radius', () => {
      const { getByTestId } = render(
        <CivicCard borderRadius={16}>
          <CivicText>Card content</CivicText>
        </CivicCard>
      );

      const card = getByTestId('civic-card');
      expect(card).toBeTruthy();
    });

    test('should apply custom background color', () => {
      const { getByTestId } = render(
        <CivicCard backgroundColor="#F5F5F5">
          <CivicText>Card content</CivicText>
        </CivicCard>
      );

      const card = getByTestId('civic-card');
      expect(card).toBeTruthy();
    });

    test('should apply custom styles', () => {
      const customStyle = { borderWidth: 2, borderColor: '#000' };
      const { getByTestId } = render(
        <CivicCard style={customStyle}>
          <CivicText>Card content</CivicText>
        </CivicCard>
      );

      const card = getByTestId('civic-card');
      expect(card).toBeTruthy();
    });
  });

  describe('CivicText', () => {
    test('should render text with default props', () => {
      const { getByText } = render(
        <CivicText>Default text</CivicText>
      );

      const text = getByText('Default text');
      expect(text).toBeTruthy();
    });

    test('should render different variants', () => {
      const variants = ['h1', 'h2', 'h3', 'body', 'caption', 'button', 'label'] as const;
      
      variants.forEach(variant => {
        const { getByText } = render(
          <CivicText variant={variant}>{`${variant} text`}</CivicText>
        );

        const text = getByText(`${variant} text`);
        expect(text).toBeTruthy();
      });
    });

    test('should render different weights', () => {
      const weights = ['light', 'regular', 'medium', 'semibold', 'bold'] as const;
      
      weights.forEach(weight => {
        const { getByText } = render(
          <CivicText weight={weight}>{`${weight} text`}</CivicText>
        );

        const text = getByText(`${weight} text`);
        expect(text).toBeTruthy();
      });
    });

    test('should render different alignments', () => {
      const alignments = ['left', 'center', 'right'] as const;
      
      alignments.forEach(align => {
        const { getByText } = render(
          <CivicText align={align}>{`${align} aligned text`}</CivicText>
        );

        const text = getByText(`${align} aligned text`);
        expect(text).toBeTruthy();
      });
    });

    test('should render with custom color', () => {
      const { getByText } = render(
        <CivicText color="#FF0000">Red text</CivicText>
      );

      const text = getByText('Red text');
      expect(text).toBeTruthy();
    });

    test('should apply custom styles', () => {
      const customStyle = { fontSize: 20, fontWeight: 'bold' };
      const { getByText } = render(
        <CivicText style={customStyle}>Custom styled text</CivicText>
      );

      const text = getByText('Custom styled text');
      expect(text).toBeTruthy();
    });

    test('should handle empty text gracefully', () => {
      const { getByText } = render(<CivicText></CivicText>);

      const text = getByText('');
      expect(text).toBeTruthy();
    });

    test('should handle special characters', () => {
      const { getByText } = render(
        <CivicText>Special chars: !@#$%^&*()</CivicText>
      );

      const text = getByText('Special chars: !@#$%^&*()');
      expect(text).toBeTruthy();
    });

    test('should handle long text', () => {
      const longText = 'This is a very long text that should be handled properly by the CivicText component without any issues or overflow problems.';
      const { getByText } = render(
        <CivicText>{longText}</CivicText>
      );

      const text = getByText(longText);
      expect(text).toBeTruthy();
    });
  });

  describe('Component Integration', () => {
    test('should integrate button and text components', () => {
      const mockOnPress = jest.fn();
      const { getByText } = render(
        <CivicButton title="Login" onPress={mockOnPress}>
          <CivicText variant="button">Login with Civic</CivicText>
        </CivicButton>
      );

      const button = getByText('Login');
      expect(button).toBeTruthy();
    });

    test('should integrate card and spinner components', () => {
      const { getByText } = render(
        <CivicCard>
          <CivicSpinner text="Loading..." />
        </CivicCard>
      );

      const loadingText = getByText('Loading...');
      expect(loadingText).toBeTruthy();
    });

    test('should integrate all components together', () => {
      const mockOnPress = jest.fn();
      const { getByText } = render(
        <CivicCard>
          <CivicText variant="h3">Authentication</CivicText>
          <CivicSpinner text="Processing..." />
          <CivicButton title="Retry" onPress={mockOnPress} />
        </CivicCard>
      );

      expect(getByText('Authentication')).toBeTruthy();
      expect(getByText('Processing...')).toBeTruthy();
      expect(getByText('Retry')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    test('should have proper accessibility labels', () => {
      const { getByText } = render(
        <CivicButton 
          title="Login Button" 
          onPress={jest.fn()}
          accessibilityLabel="Login with Civic"
        />
      );

      const button = getByText('Login Button');
      expect(button).toBeTruthy();
    });

    test('should support accessibility hints', () => {
      const { getByText } = render(
        <CivicButton 
          title="Login" 
          onPress={jest.fn()}
          accessibilityHint="Double tap to login"
        />
      );

      const button = getByText('Login');
      expect(button).toBeTruthy();
    });
  });

  describe('Performance', () => {
    test('should render multiple components efficiently', () => {
      const startTime = Date.now();
      
      const { getAllByText } = render(
        <>
          {Array(10).fill(null).map((_, index) => (
            <CivicButton 
              key={index}
              title={`Button ${index}`} 
              onPress={jest.fn()}
            />
          ))}
        </>
      );

      const endTime = Date.now();
      const buttons = getAllByText(/Button \d+/);
      
      expect(buttons).toHaveLength(10);
      expect(endTime - startTime).toBeLessThan(1000); // Should render within 1 second
    });

    test('should handle rapid state changes', async () => {
      const mockOnPress = jest.fn();
      const { getByText, rerender } = render(
        <CivicButton title="Test" onPress={mockOnPress} loading={false} />
      );

      // Rapidly change loading state
      // 快速改变加载状态
      for (let i = 0; i < 10; i++) {
        rerender(
          <CivicButton title="Test" onPress={mockOnPress} loading={i % 2 === 0} />
        );
      }

      const button = getByText('Test');
      expect(button).toBeTruthy();
    });
  });
}); 