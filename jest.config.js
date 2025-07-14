/**
 * Jest Configuration for CivicAuth React Native Wrapper
 * CivicAuth React Native 包装器的 Jest 配置
 * 
 * This file configures Jest for testing the civic-auth-rn package
 * 此文件为 civic-auth-rn 包配置 Jest 测试
 * 
 * Related files: package.json, src/test/
 * 相关文件：package.json, src/test/
 */

module.exports = {
  // Remove react-native preset and use custom configuration
  // 移除 react-native 预设并使用自定义配置
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testEnvironment: 'node',
  
  // Transform configuration for TypeScript and React Native
  // TypeScript 和 React Native 的转换配置
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Babel configuration for Jest
  // Jest 的 Babel 配置
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-webview)/)',
  ],
  
  // Coverage configuration
  // 覆盖率配置
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
    '!src/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Test file patterns
  // 测试文件模式
  testMatch: [
    '<rootDir>/src/test/**/*.test.{ts,tsx}',
    '<rootDir>/src/test/**/*.spec.{ts,tsx}',
  ],
  
  // Module resolution
  // 模块解析
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // Ignore patterns
  // 忽略模式
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/demo/',
  ],
  
  // Clear mocks between tests
  // 测试之间清除模拟
  clearMocks: true,
  resetMocks: true,
  
  // Verbose output for debugging
  // 详细输出用于调试
  verbose: true,
}; 