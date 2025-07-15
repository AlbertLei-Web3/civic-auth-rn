/**
 * CivicAuthButton - Civic 认证按钮组件
 * 
 * 专门用于 Civic 认证的按钮组件
 * Specialized button component for Civic authentication
 */

import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  View 
} from 'react-native';

interface CivicAuthButtonProps {
  onPress: () => void;
  loading?: boolean;
  title: string;
  subtitle?: string;
  disabled?: boolean;
}

export default function CivicAuthButton({
  onPress,
  loading = false,
  title,
  subtitle,
  disabled = false
}: CivicAuthButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        loading && styles.buttonLoading
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#ffffff" />
          <Text style={styles.loadingText}>认证中... Authenticating...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.civicIcon}>🏛️</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D8CFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2D8CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    shadowOpacity: 0.1,
  },
  buttonLoading: {
    backgroundColor: '#5a9fff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  civicIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 12,
  },
}); 