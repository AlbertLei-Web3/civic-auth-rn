/**
 * CivicAuth React Native Wrapper - Main Entry Point
 * CivicAuth React Native 包装器 - 主入口文件
 * 
 * This file serves as the main entry point for the civic-auth-rn package
 * 此文件作为 civic-auth-rn 包的主入口点
 * 
 * It exports the CivicAuth module and related types for developers to use
 * 它导出 CivicAuth 模块和相关类型供开发者使用
 * 
 * Related files: src/CivicAuthModule.ts, src/types/index.ts
 * 相关文件：src/CivicAuthModule.ts, src/types/index.ts
 */

// Export the main CivicAuth module
// 导出主要的 CivicAuth 模块
export { default as CivicAuth } from './CivicAuthModule';

// Export types and interfaces
// 导出类型和接口
export * from './types';

// Export the login function for direct usage
// 导出登录函数供直接使用
export { loginWithCivic } from './CivicAuthModule'; 