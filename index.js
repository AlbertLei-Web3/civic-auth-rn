/**
 * index.js
 * CivicAuth Demo App - React Native Entry Point
 * CivicAuth 演示应用 - React Native 入口点
 * 
 * English: This is the main entry point for the React Native CivicAuth demo app. It registers the main component with the React Native bridge.
 * 中文：这是 React Native CivicAuth 演示应用的主入口点。它将主组件注册到 React Native 桥接器。
 * 
 * Related files: demo/App.tsx, android/app/src/main/java/com/civicauth/MainActivity.kt
 * 相关文件：demo/App.tsx, android/app/src/main/java/com/civicauth/MainActivity.kt
 */

import {AppRegistry} from 'react-native';
import App from './demo/App';
import {name as appName} from './package.json';

/**
 * English: Register the main component of the app with React Native.
 * 中文：将应用的主组件注册到 React Native。
 */
AppRegistry.registerComponent(appName, () => App); 