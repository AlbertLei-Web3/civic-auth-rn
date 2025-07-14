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
 * Based on Civic Auth official documentation: https://docs.civic.com/
 * 基于 Civic Auth 官方文档：https://docs.civic.com/
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
     * Based on Civic Auth OAuth 2.0 / OpenID Connect flow
     * 基于 Civic Auth OAuth 2.0 / OpenID Connect 流程
     * 
     * @param options - Login configuration options 登录配置选项
     * @param promise - Promise to resolve with result 用于解析结果的 Promise
     */
    @ReactMethod
    fun loginWithCivic(options: ReadableMap?, promise: Promise) {
        try {
            // Validate required parameters based on Civic Auth documentation
            // 根据 Civic Auth 文档验证必需参数
            if (options == null) {
                promise.reject("INVALID_OPTIONS", "Options cannot be null")
                return
            }

            val clientId = options.getString("clientId")
            val redirectUrl = options.getString("redirectUrl")

            if (clientId.isNullOrEmpty()) {
                promise.reject("MISSING_CLIENT_ID", "clientId is required for Civic Auth")
                return
            }

            if (redirectUrl.isNullOrEmpty()) {
                promise.reject("MISSING_REDIRECT_URL", "redirectUrl is required for Civic Auth")
                return
            }

            // Create a WebView for Civic authentication
            // 为 Civic 认证创建 WebView
            val webView = WebView(currentActivity)
            webView.settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                setSupportZoom(false)
                loadWithOverviewMode = true
                useWideViewPort = true
            }

            // Set up WebView client to handle navigation
            // 设置 WebView 客户端来处理导航
            webView.webViewClient = object : WebViewClient() {
                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    
                    // Check if the URL contains the access token or authorization code
                    // 检查 URL 是否包含访问令牌或授权代码
                    url?.let { currentUrl ->
                        if (currentUrl.contains("access_token=") || currentUrl.contains("code=")) {
                            val tokens = extractTokensFromUrl(currentUrl, redirectUrl)
                            if (tokens.isNotEmpty()) {
                                // Success - resolve with tokens
                                // 成功 - 使用令牌解析
                                val result = JSONObject().apply {
                                    put("success", true)
                                    put("idToken", tokens["id_token"] ?: "")
                                    put("accessToken", tokens["access_token"] ?: "")
                                    put("refreshToken", tokens["refresh_token"] ?: "")
                                    put("userId", tokens["user_id"] ?: "")
                                    put("email", tokens["email"] ?: "")
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
                    // Handle redirect URLs based on Civic Auth flow
                    // 根据 Civic Auth 流程处理重定向 URL
                    url?.let { currentUrl ->
                        if (currentUrl.startsWith(redirectUrl)) {
                            val tokens = extractTokensFromUrl(currentUrl, redirectUrl)
                            if (tokens.isNotEmpty()) {
                                val result = JSONObject().apply {
                                    put("success", true)
                                    put("idToken", tokens["id_token"] ?: "")
                                    put("accessToken", tokens["access_token"] ?: "")
                                    put("refreshToken", tokens["refresh_token"] ?: "")
                                    put("userId", tokens["user_id"] ?: "")
                                    put("email", tokens["email"] ?: "")
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

                override fun onReceivedError(view: WebView?, errorCode: Int, description: String?, failingUrl: String?) {
                    // Handle WebView errors
                    // 处理 WebView 错误
                    val errorResult = JSONObject().apply {
                        put("success", false)
                        put("error", "WebView error: $description")
                    }
                    promise.resolve(Arguments.fromJson(errorResult.toString()))
                }
            }

            // Build Civic Auth URL based on official documentation
            // 根据官方文档构建 Civic Auth URL
            val civicAuthUrl = buildCivicAuthUrl(clientId, redirectUrl, options)
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
     * Build Civic Auth URL based on official documentation
     * 根据官方文档构建 Civic Auth URL
     * 
     * @param clientId - Civic Dashboard project ID
     * @param redirectUrl - OAuth callback URL
     * @param options - Additional options
     * @return String - Complete Civic Auth URL
     */
    private fun buildCivicAuthUrl(clientId: String, redirectUrl: String, options: ReadableMap): String {
        val baseUrl = "https://auth.civic.com/oauth/authorize"
        val params = mutableListOf<String>()
        
        params.add("client_id=$clientId")
        params.add("redirect_uri=$redirectUrl")
        params.add("response_type=code")
        params.add("scope=openid profile email")
        
        // Add optional parameters
        // 添加可选参数
        options.getString("nonce")?.let { nonce ->
            params.add("nonce=$nonce")
        }
        
        options.getString("displayMode")?.let { displayMode ->
            params.add("display=$displayMode")
        }
        
        return "$baseUrl?${params.joinToString("&")}"
    }

    /**
     * Extract tokens from URL based on Civic Auth token structure
     * 根据 Civic Auth token 结构从 URL 提取令牌
     * 
     * @param url - URL containing tokens
     * @param redirectUrl - Expected redirect URL
     * @return Map<String, String> - Extracted tokens
     */
    private fun extractTokensFromUrl(url: String, redirectUrl: String): Map<String, String> {
        val tokens = mutableMapOf<String, String>()
        
        try {
            val uri = Uri.parse(url)
            
            // Extract tokens from query parameters
            // 从查询参数提取令牌
            uri.getQueryParameter("access_token")?.let { tokens["access_token"] = it }
            uri.getQueryParameter("id_token")?.let { tokens["id_token"] = it }
            uri.getQueryParameter("refresh_token")?.let { tokens["refresh_token"] = it }
            uri.getQueryParameter("user_id")?.let { tokens["user_id"] = it }
            uri.getQueryParameter("email")?.let { tokens["email"] = it }
            
            // If we have an authorization code, we need to exchange it for tokens
            // 如果我们有授权代码，需要将其交换为令牌
            uri.getQueryParameter("code")?.let { code ->
                // In a real implementation, you would exchange the code for tokens
                // 在真实实现中，您会将代码交换为令牌
                tokens["authorization_code"] = code
            }
            
        } catch (e: Exception) {
            // Handle parsing errors
            // 处理解析错误
        }
        
        return tokens
    }
} 