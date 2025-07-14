/**
 * Babel Configuration for CivicAuth React Native Wrapper
 * CivicAuth React Native 包装器的 Babel 配置
 * 
 * This file configures Babel for Jest testing and TypeScript compilation
 * 此文件为 Jest 测试和 TypeScript 编译配置 Babel
 * 
 * Related files: jest.config.js, package.json
 * 相关文件：jest.config.js, package.json
 */

module.exports = {
  presets: [
    // Environment preset for modern JavaScript features
    // 现代 JavaScript 功能的环境预设
    ['@babel/preset-env', {
      targets: {
        node: 'current',
      },
    }],
    
    // React preset for JSX transformation
    // React 预设用于 JSX 转换
    ['@babel/preset-react', {
      runtime: 'automatic',
    }],
    
    // TypeScript preset for .ts and .tsx files
    // TypeScript 预设用于 .ts 和 .tsx 文件
    '@babel/preset-typescript',
  ],
  
  // Plugins for additional transformations
  // 额外转换的插件
  plugins: [
    // Support for React Native specific syntax
    // 支持 React Native 特定语法
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-object-rest-spread',
  ],
  
  // Environment specific configurations
  // 环境特定配置
  env: {
    test: {
      // Additional plugins for testing environment
      // 测试环境的额外插件
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
  },
}; 