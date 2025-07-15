/**
 * CivicAuth React Native Wrapper - Android Package Registration
 * CivicAuth React Native 包装器 - Android 包注册
 * 
 * This file registers the CivicAuth module with React Native
 * 此文件将 CivicAuth 模块注册到 React Native
 * 
 * Related files: android/src/main/java/com/civicauth/CivicAuthModule.kt
 * 相关文件：android/src/main/java/com/civicauth/CivicAuthModule.kt
 */

package com.civicauth

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

/**
 * CivicAuth Package Class
 * CivicAuth 包类
 * 
 * This class registers the CivicAuth module with React Native
 * 此类将 CivicAuth 模块注册到 React Native
 */
class CivicAuthPackage : ReactPackage {

    /**
     * Create native modules
     * 创建原生模块
     * 
     * @param reactContext - React application context React 应用上下文
     * @return List<NativeModule> - List of native modules 原生模块列表
     */
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(CivicAuthModule(reactContext))
    }

    /**
     * Create view managers (not used for this module)
     * 创建视图管理器（此模块不使用）
     * 
     * @param reactContext - React application context React 应用上下文
     * @return List<ViewManager<*, *>> - List of view managers 视图管理器列表
     */
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
} 