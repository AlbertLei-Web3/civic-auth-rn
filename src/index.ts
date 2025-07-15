/**
 * CivicAuth React Native Wrapper - Main Entry
 * CivicAuth React Native 包装器 - 主入口
 *
 * 导出基于 @civic/auth 的 React Native 包装器组件和钩子
 * Exports React Native wrapper components and hooks based on @civic/auth
 *
 * 相关文件：src/CivicAuthModule.ts, src/components/
 * Related files: src/CivicAuthModule.ts, src/components/
 */

export { 
  CivicAuthProvider, 
  useUser, 
  loginWithCivic 
} from './CivicAuthModule';

export type { 
  CivicAuthConfig, 
  CivicUser, 
  CivicAuthContextType,
  CivicAuthProviderProps 
} from './CivicAuthModule';

// Export UI components
export * from './components'; 