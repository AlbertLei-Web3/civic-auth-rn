/**
 * Jest Configuration for CivicAuth React Native Wrapper
 * CivicAuth React Native 包装器的 Jest 配置
 * 
 * This file configures Jest for testing the civic-auth-rn package
 * 此文件为 civic-auth-rn 包配置 Jest 测试
 * 
 * Includes test setup, coverage configuration, and module mapping
 * 包含测试设置、覆盖率配置和模块映射
 */

module.exports = {
  // Test environment setup
  // 测试环境设置
  preset: 'react-native',
  testEnvironment: 'node',

  // Test file patterns
  // 测试文件模式
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/src/test/**/*.{js,jsx,ts,tsx}',
  ],

  // Module file extensions
  // 模块文件扩展名
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Module name mapping
  // 模块名称映射
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-native$': 'react-native',
  },

  // Transform configuration
  // 转换配置
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Setup files
  // 设置文件
  setupFilesAfterEnv: [
    '<rootDir>/src/test/setup.ts',
  ],

  // Coverage configuration
  // 覆盖率配置
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
    '!src/**/__tests__/**/*',
    '!src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Test timeout
  // 测试超时
  testTimeout: 10000,

  // Verbose output
  // 详细输出
  verbose: true,

  // Clear mocks between tests
  // 测试间清除模拟
  clearMocks: true,

  // Restore mocks between tests
  // 测试间恢复模拟
  restoreMocks: true,

  // Module path mapping for testing
  // 测试的模块路径映射
  moduleDirectories: [
    'node_modules',
    'src',
  ],

  // Ignore patterns
  // 忽略模式
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
    '/demo/',
  ],

  // Transform ignore patterns
  // 转换忽略模式
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*)/)',
  ],

  // Global test setup
  // 全局测试设置
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}; 