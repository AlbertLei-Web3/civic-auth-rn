/**
 * ESLint Configuration for CivicAuth React Native Wrapper
 * CivicAuth React Native 包装器的 ESLint 配置
 * 
 * This file configures ESLint for TypeScript and React Native development
 * 此文件为 TypeScript 和 React Native 开发配置 ESLint
 * 
 * Includes rules for code quality, TypeScript, and React Native best practices
 * 包含代码质量、TypeScript 和 React Native 最佳实践的规则
 */

module.exports = {
  // Environment configuration
  // 环境配置
  env: {
    browser: true,
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },

  // Parser configuration
  // 解析器配置
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },

  // Plugin configuration
  // 插件配置
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'react-hooks',
  ],

  // Extends configuration
  // 扩展配置
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
  ],

  // Rules configuration
  // 规则配置
  rules: {
    // TypeScript rules
    // TypeScript 规则
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // React rules
    // React 规则
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',

    // React Native rules
    // React Native 规则
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'off',

    // General rules
    // 通用规则
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',

    // Import rules
    // 导入规则
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },

  // Settings configuration
  // 设置配置
  settings: {
    react: {
      version: 'detect',
    },
  },

  // Override for test files
  // 测试文件的覆盖配置
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['**/setup.ts', '**/jest.config.js'],
      env: {
        node: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],

  // Ignore patterns
  // 忽略模式
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    'demo/',
    'coverage/',
    'dist/',
    'build/',
  ],
}; 