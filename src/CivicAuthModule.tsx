/**
 * CivicAuth React Native Wrapper - Main Module
 * CivicAuth React Native 包装器 - 主模块
 *
 * This file implements the React Native wrapper for Civic Auth Web SDK.
 * 此文件实现 Civic Auth Web SDK 的 React Native 包装器。
 *
 * Based on @civic/auth package for web authentication.
 * 基于 @civic/auth 包进行网页认证。
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';
import 'react-native-url-polyfill/auto';

// Types for Civic Auth
export interface CivicAuthConfig {
  clientId: string;
  redirectUrl?: string;
  displayMode?: 'iframe' | 'redirect' | 'new_tab';
  iframeMode?: 'embedded';
}

export interface CivicUser {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  forwardedTokens?: Record<string, string>;
  profile?: {
    sub: string;
    email?: string;
    name?: string;
    [key: string]: any;
  };
}

export interface CivicAuthContextType {
  user: CivicUser | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Context for Civic Auth
const CivicAuthContext = createContext<CivicAuthContextType | null>(null);

// Provider Component
export interface CivicAuthProviderProps {
  children: ReactNode;
  clientId: string;
  redirectUrl?: string;
  displayMode?: 'iframe' | 'redirect' | 'new_tab';
  iframeMode?: 'embedded';
}

export const CivicAuthProvider: React.FC<CivicAuthProviderProps> = ({
  children,
  clientId,
  redirectUrl = 'https://civic.com/auth/callback',
  displayMode = 'redirect',
  iframeMode
}) => {
  const [user, setUser] = useState<CivicUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Construct Civic Auth URL
      const authUrl = `https://auth.civic.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=openid profile email`;
      
      // Open auth URL in external browser or WebView
      if (displayMode === 'redirect') {
        await Linking.openURL(authUrl);
      }
      
      // Handle the callback when user returns to app
      const handleUrl = (event: { url: string }) => {
        if (event.url.includes('code=')) {
          // Extract authorization code
          const urlParams = new URLSearchParams(event.url.split('?')[1]);
          const code = urlParams.get('code');
          
          if (code) {
            // Exchange code for tokens (this would typically be done on your backend)
            exchangeCodeForTokens(code);
          }
        }
      };

             // Listen for deep link callback
       const subscription = Linking.addEventListener('url', handleUrl);
       
       // Store subscription for cleanup
       // 存储订阅以便清理
       setTimeout(() => {
         subscription?.remove();
       }, 30000); // Auto cleanup after 30 seconds
      
    } catch (error) {
      console.error('Civic Auth login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exchangeCodeForTokens = async (code: string) => {
    try {
      // This should be implemented on your backend for security
      // 这应该在您的后端实现以确保安全
      console.log('Exchange code for tokens:', code);
      
      // Mock user data for demo purposes
      // 为演示目的模拟用户数据
      const mockUser: CivicUser = {
        accessToken: 'mock_access_token',
        idToken: 'mock_id_token',
        refreshToken: 'mock_refresh_token',
        profile: {
          sub: 'user123',
          email: 'user@example.com',
          name: 'John Doe'
        }
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Token exchange error:', error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: CivicAuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <CivicAuthContext.Provider value={contextValue}>
      {children}
    </CivicAuthContext.Provider>
  );
};

// Hook to use Civic Auth
export const useUser = (): CivicAuthContextType => {
  const context = useContext(CivicAuthContext);
  if (!context) {
    throw new Error('useUser must be used within a CivicAuthProvider');
  }
  return context;
};

// Legacy function for backward compatibility
export const loginWithCivic = async (config: CivicAuthConfig): Promise<CivicUser | null> => {
  console.warn('loginWithCivic is deprecated. Use CivicAuthProvider and useUser hook instead.');
  return null;
};

// Default export
export default {
  CivicAuthProvider,
  useUser,
  loginWithCivic
};