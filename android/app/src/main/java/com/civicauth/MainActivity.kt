/**
 * MainActivity.kt
 * CivicAuth Demo App - Main Activity
 * CivicAuth 演示应用 - 主活动
 * 
 * English: This is the main entry point for the CivicAuth demo app. It extends ReactActivity to integrate with React Native and displays the demo interface.
 * 中文：这是 CivicAuth 演示应用的主入口点。它继承 ReactActivity 以与 React Native 集成并显示演示界面。
 * 
 * Related files: android/app/src/main/AndroidManifest.xml, android/app/src/main/java/com/civicauth/CivicAuthModule.kt
 * 相关文件：android/app/src/main/AndroidManifest.xml, android/app/src/main/java/com/civicauth/CivicAuthModule.kt
 */

package com.civicauth

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * English: MainActivity class that serves as the entry point for the CivicAuth demo app.
 * 中文：MainActivity 类，作为 CivicAuth 演示应用的入口点。
 */
class MainActivity : ReactActivity() {

    /**
     * English: Returns the name of the main component registered from JavaScript. This is used to schedule rendering of the component.
     * 中文：返回从 JavaScript 注册的主组件名称。这用于调度组件的渲染。
     * 
     * @return The name of the main component
     * @return 主组件的名称
     */
    override fun getMainComponentName(): String? {
        return "civic-auth-rn"
    }

    /**
     * English: Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React (aka React 18) with two boolean flags.
     * 中文：返回 {@link ReactActivityDelegate} 的实例。这里我们使用工具类 {@link DefaultReactActivityDelegate}，它允许你通过两个布尔标志轻松启用 Fabric 和并发 React（又名 React 18）。
     * 
     * @return A ReactActivityDelegate instance
     * @return ReactActivityDelegate 实例
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
} 