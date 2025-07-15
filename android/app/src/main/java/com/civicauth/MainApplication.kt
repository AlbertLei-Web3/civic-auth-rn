/**
 * MainApplication.kt
 * CivicAuth Demo App - Main Application
 * CivicAuth 演示应用 - 主应用
 * 
 * English: This is the main application class for the CivicAuth demo app. It initializes React Native and registers the CivicAuth package.
 * 中文：这是 CivicAuth 演示应用的主应用类。它初始化 React Native 并注册 CivicAuth 包。
 * 
 * Related files: android/app/src/main/AndroidManifest.xml, android/app/src/main/java/com/civicauth/MainActivity.kt
 * 相关文件：android/app/src/main/AndroidManifest.xml, android/app/src/main/java/com/civicauth/MainActivity.kt
 */

package com.civicauth

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

/**
 * English: MainApplication class that initializes React Native and registers packages.
 * 中文：MainApplication 类，初始化 React Native 并注册包。
 */
class MainApplication : Application(), ReactApplication {

    /**
     * English: React Native host configuration.
     * 中文：React Native 主机配置。
     */
    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    // English: Add CivicAuth package
                    // 中文：添加 CivicAuth 包
                    add(CivicAuthPackage())
                }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    /**
     * English: React host configuration.
     * 中文：React 主机配置。
     */
    override val reactHost: ReactHost
        get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

    /**
     * English: Application initialization.
     * 中文：应用初始化。
     */
    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // English: If you opted-in for the New Architecture, we load the native entry point for this app.
            // 中文：如果你选择新架构，我们加载此应用的原生入口点。
            load()
        }
    }
} 