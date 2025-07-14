/**
 * CivicAuth React Native Wrapper - Android Native Module
 * CivicAuth React Native 包装器 - Android 原生模块
 * 
 * This file contains the Android native module implementation for Civic authentication
 * 此文件包含 Civic 认证的 Android 原生模块实现
 * 
 * It provides the loginWithCivic function with WebView integration
 * 它提供带有 WebView 集成的 loginWithCivic 函数
 * 
 * Related files: android/build.gradle, android/src/main/AndroidManifest.xml
 * 相关文件：android/build.gradle, android/src/main/AndroidManifest.xml
 */

package com.civicauth

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.WebSettings
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import org.json.JSONObject
import java.util.concurrent.CompletableFuture

/**
 * CivicAuth Native Module Class
 * CivicAuth 原生模块类
 * 
 * This class provides the native implementation for Civic authentication
 * 此类提供 Civic 认证的原生实现
 */
class CivicAuthModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "CivicAuthModule"
    }

    /**
     * Login with Civic authentication
     * 使用 Civic 认证登录
     * 
     * @param options - Login configuration options 登录配置选项
     * @param promise - Promise to resolve with result 用于解析结果的 Promise
     */
    @ReactMethod
    fun loginWithCivic(options: ReadableMap?, promise: Promise) {
        try {
            // Create a WebView for Civic authentication
            // 为 Civic 认证创建 WebView
            val webView = WebView(currentActivity)
            webView.settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                setSupportZoom(false)
            }

            // Set up WebView client to handle navigation
            // 设置 WebView 客户端来处理导航
            webView.webViewClient = object : WebViewClient() {
                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    
                    // Check if the URL contains the access token
                    // 检查 URL 是否包含访问令牌
                    url?.let { currentUrl ->
                        if (currentUrl.contains("access_token=")) {
                            val token = extractTokenFromUrl(currentUrl)
                            if (token.isNotEmpty()) {
                                // Success - resolve with token
                                // 成功 - 使用令牌解析
                                val result = JSONObject().apply {
                                    put("success", true)
                                    put("token", token)
                                }
                                promise.resolve(Arguments.fromJson(result.toString()))
                                
                                // Close the WebView
                                // 关闭 WebView
                                currentActivity?.runOnUiThread {
                                    webView.visibility = android.view.View.GONE
                                }
                            }
                        }
                    }
                }

                override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                    // Handle redirect URLs
                    // 处理重定向 URL
                    url?.let { currentUrl ->
                        if (currentUrl.contains("access_token=")) {
                            val token = extractTokenFromUrl(currentUrl)
                            if (token.isNotEmpty()) {
                                val result = JSONObject().apply {
                                    put("success", true)
                                    put("token", token)
                                }
                                promise.resolve(Arguments.fromJson(result.toString()))
                                
                                currentActivity?.runOnUiThread {
                                    webView.visibility = android.view.View.GONE
                                }
                                return true
                            }
                        }
                    }
                    return false
                }
            }

            // Load the Civic authentication URL
            // 加载 Civic 认证 URL
            val civicAuthUrl = "https://auth.civic.com/login" // Placeholder URL
            webView.loadUrl(civicAuthUrl)

            // Add WebView to the current activity
            // 将 WebView 添加到当前活动
            currentActivity?.runOnUiThread {
                currentActivity?.addContentView(
                    webView,
                    android.widget.FrameLayout.LayoutParams(
                        android.widget.FrameLayout.LayoutParams.MATCH_PARENT,
                        android.widget.FrameLayout.LayoutParams.MATCH_PARENT
                    )
                )
            }

        } catch (e: Exception) {
            // Handle errors
            // 处理错误
            val errorResult = JSONObject().apply {
                put("success", false)
                put("error", e.message ?: "Unknown error")
            }
            promise.resolve(Arguments.fromJson(errorResult.toString()))
        }
    }

    /**
     * Extract token from URL
     * 从 URL 提取令牌
     * 
     * @param url - URL containing the token 包含令牌的 URL
     * @return String - Extracted token 提取的令牌
     */
    private fun extractTokenFromUrl(url: String): String {
        return try {
            val uri = Uri.parse(url)
            uri.getQueryParameter("access_token") ?: ""
        } catch (e: Exception) {
            ""
        }
    }
} 