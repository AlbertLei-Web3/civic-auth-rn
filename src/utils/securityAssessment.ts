/**
 * CivicAuth React Native Wrapper - Security Assessment Utilities
 * CivicAuth React Native 包装器 - 安全评估工具
 * 
 * This file contains security assessment utilities for the CivicAuth module
 * 此文件包含 CivicAuth 模块的安全评估工具
 * 
 * Provides token validation, input sanitization, and vulnerability detection
 * 提供 token 验证、输入清理和漏洞检测
 * 
 * Related files: src/CivicAuthModule.ts, src/types/index.ts
 * 相关文件：src/CivicAuthModule.ts, src/types/index.ts
 */

/**
 * Security Assessment Result Interface
 * 安全评估结果接口
 * 
 * Defines the structure for security assessment results
 * 定义安全评估结果的结构
 */
export interface SecurityAssessmentResult {
  isValid: boolean;
  score: number; // 0-100
  vulnerabilities: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Token Security Validator
 * Token 安全验证器
 * 
 * Validates tokens for security compliance and potential vulnerabilities
 * 验证 token 的安全合规性和潜在漏洞
 */
export class TokenSecurityValidator {
  /**
   * Validate JWT token structure and security
   * 验证 JWT token 结构和安全性
   * 
   * @param token - The JWT token to validate 要验证的 JWT token
   * @returns Security assessment result 安全评估结果
   */
  static validateJWT(token: string): SecurityAssessmentResult {
    const vulnerabilities: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    try {
      // Check token format
      // 检查 token 格式
      if (!token || typeof token !== 'string') {
        vulnerabilities.push('Invalid token format');
        score -= 30;
      }

      // Check JWT structure (header.payload.signature)
      // 检查 JWT 结构（header.payload.signature）
      const parts = token.split('.');
      if (parts.length !== 3) {
        vulnerabilities.push('Invalid JWT structure');
        score -= 25;
      }

      // Check header
      // 检查头部
      if (parts.length >= 1) {
        const header = JSON.parse(atob(parts[0]));
        if (!header.alg) {
          vulnerabilities.push('Missing algorithm in JWT header');
          score -= 15;
        }
        if (header.alg === 'none') {
          vulnerabilities.push('Unsafe algorithm (none) detected');
          score -= 40;
        }
      }

      // Check payload
      // 检查载荷
      if (parts.length >= 2) {
        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);

        // Check expiration
        // 检查过期时间
        if (payload.exp && payload.exp < now) {
          vulnerabilities.push('Token has expired');
          score -= 20;
        }

        // Check issued at time
        // 检查签发时间
        if (payload.iat && payload.iat > now) {
          vulnerabilities.push('Token issued in the future');
          score -= 15;
        }

        // Check not before time
        // 检查生效时间
        if (payload.nbf && payload.nbf > now) {
          vulnerabilities.push('Token not yet valid');
          score -= 10;
        }
      }

      // Generate recommendations
      // 生成建议
      if (score < 100) {
        recommendations.push('Consider implementing token refresh mechanism');
        recommendations.push('Validate token expiration before use');
        recommendations.push('Use secure algorithms (RS256, ES256)');
      }

    } catch (error) {
      vulnerabilities.push('Token parsing failed');
      score -= 50;
      recommendations.push('Ensure token is properly formatted');
    }

    return {
      isValid: score >= 70,
      score: Math.max(0, score),
      vulnerabilities,
      recommendations,
      riskLevel: this.getRiskLevel(score),
    };
  }

  /**
   * Validate access token security
   * 验证访问 token 安全性
   * 
   * @param token - The access token to validate 要验证的访问 token
   * @returns Security assessment result 安全评估结果
   */
  static validateAccessToken(token: string): SecurityAssessmentResult {
    const vulnerabilities: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check token length (should be reasonable)
    // 检查 token 长度（应该合理）
    if (token.length < 20) {
      vulnerabilities.push('Access token too short');
      score -= 20;
    }

    if (token.length > 1000) {
      vulnerabilities.push('Access token suspiciously long');
      score -= 15;
    }

    // Check for common patterns
    // 检查常见模式
    if (token.includes('test') || token.includes('demo')) {
      vulnerabilities.push('Token contains test/demo patterns');
      score -= 10;
    }

    // Check for proper encoding
    // 检查正确编码
    if (!/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token)) {
      vulnerabilities.push('Token contains invalid characters');
      score -= 15;
    }

    if (score < 100) {
      recommendations.push('Use cryptographically secure tokens');
      recommendations.push('Implement proper token validation');
      recommendations.push('Store tokens securely');
    }

    return {
      isValid: score >= 70,
      score: Math.max(0, score),
      vulnerabilities,
      recommendations,
      riskLevel: this.getRiskLevel(score),
    };
  }

  /**
   * Get risk level based on security score
   * 根据安全评分获取风险等级
   * 
   * @param score - Security score 安全评分
   * @returns Risk level 风险等级
   */
  private static getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 90) return 'low';
    if (score >= 70) return 'medium';
    if (score >= 50) return 'high';
    return 'critical';
  }
}

/**
 * Input Sanitization Utility
 * 输入清理工具
 * 
 * Sanitizes and validates input parameters for security
 * 清理和验证输入参数的安全性
 */
export class InputSanitizer {
  /**
   * Sanitize client ID
   * 清理客户端 ID
   * 
   * @param clientId - The client ID to sanitize 要清理的客户端 ID
   * @returns Sanitized client ID 清理后的客户端 ID
   */
  static sanitizeClientId(clientId: string): string {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error('Client ID is required and must be a string');
    }

    // Remove any potentially dangerous characters
    // 移除任何潜在的危险字符
    const sanitized = clientId.replace(/[^a-zA-Z0-9-_]/g, '');
    
    if (sanitized.length < 3) {
      throw new Error('Client ID must be at least 3 characters long');
    }

    return sanitized;
  }

  /**
   * Sanitize redirect URL
   * 清理重定向 URL
   * 
   * @param redirectUrl - The redirect URL to sanitize 要清理的重定向 URL
   * @returns Sanitized redirect URL 清理后的重定向 URL
   */
  static sanitizeRedirectUrl(redirectUrl: string): string {
    if (!redirectUrl || typeof redirectUrl !== 'string') {
      throw new Error('Redirect URL is required and must be a string');
    }

    try {
      const url = new URL(redirectUrl);
      
      // Only allow specific protocols
      // 只允许特定协议
      if (!['https:', 'http:', 'civic-auth-demo:'].includes(url.protocol)) {
        throw new Error('Invalid redirect URL protocol');
      }

      // Check for potentially dangerous patterns
      // 检查潜在的危险模式
      if (url.href.includes('javascript:') || url.href.includes('data:')) {
        throw new Error('Redirect URL contains dangerous patterns');
      }

      return url.href;
    } catch (error) {
      throw new Error('Invalid redirect URL format');
    }
  }

  /**
   * Sanitize nonce value
   * 清理 nonce 值
   * 
   * @param nonce - The nonce to sanitize 要清理的 nonce
   * @returns Sanitized nonce 清理后的 nonce
   */
  static sanitizeNonce(nonce: string): string {
    if (!nonce || typeof nonce !== 'string') {
      throw new Error('Nonce is required and must be a string');
    }

    // Remove any potentially dangerous characters
    // 移除任何潜在的危险字符
    const sanitized = nonce.replace(/[^a-zA-Z0-9-_]/g, '');
    
    if (sanitized.length < 10) {
      throw new Error('Nonce must be at least 10 characters long');
    }

    return sanitized;
  }

  /**
   * Validate authentication options
   * 验证认证选项
   * 
   * @param options - Authentication options 认证选项
   * @returns Validated options 验证后的选项
   */
  static validateAuthOptions(options: any): any {
    const validated: any = {};

    // Validate and sanitize client ID
    // 验证和清理客户端 ID
    if (!options.clientId) {
      throw new Error('Client ID is required');
    }
    validated.clientId = this.sanitizeClientId(options.clientId);

    // Validate and sanitize redirect URL
    // 验证和清理重定向 URL
    if (!options.redirectUrl) {
      throw new Error('Redirect URL is required');
    }
    validated.redirectUrl = this.sanitizeRedirectUrl(options.redirectUrl);

    // Optional nonce validation
    // 可选的 nonce 验证
    if (options.nonce) {
      validated.nonce = this.sanitizeNonce(options.nonce);
    }

    // Validate display mode
    // 验证显示模式
    if (options.displayMode && !['popup', 'redirect'].includes(options.displayMode)) {
      throw new Error('Invalid display mode');
    }
    if (options.displayMode) {
      validated.displayMode = options.displayMode;
    }

    // Validate scope
    // 验证作用域
    if (options.scope && typeof options.scope === 'string') {
      const validScopes = ['openid', 'profile', 'email'];
      const scopes = options.scope.split(' ');
      const invalidScopes = scopes.filter((scope: string) => !validScopes.includes(scope));
      
      if (invalidScopes.length > 0) {
        throw new Error(`Invalid scopes: ${invalidScopes.join(', ')}`);
      }
      validated.scope = options.scope;
    }

    return validated;
  }
}

/**
 * Vulnerability Scanner
 * 漏洞扫描器
 * 
 * Scans for common security vulnerabilities in authentication flows
 * 扫描认证流程中的常见安全漏洞
 */
export class VulnerabilityScanner {
  /**
   * Scan for common vulnerabilities
   * 扫描常见漏洞
   * 
   * @param options - Authentication options 认证选项
   * @returns Vulnerability scan results 漏洞扫描结果
   */
  static scanVulnerabilities(options: any): SecurityAssessmentResult {
    const vulnerabilities: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check for weak client IDs
    // 检查弱客户端 ID
    if (options.clientId && options.clientId.length < 10) {
      vulnerabilities.push('Client ID is too short');
      score -= 10;
    }

    if (options.clientId && /^(test|demo|dev)/.test(options.clientId)) {
      vulnerabilities.push('Client ID contains test/demo patterns');
      score -= 15;
    }

    // Check for insecure redirect URLs
    // 检查不安全的重定向 URL
    if (options.redirectUrl) {
      try {
        const url = new URL(options.redirectUrl);
        if (url.protocol === 'http:') {
          vulnerabilities.push('Redirect URL uses insecure HTTP protocol');
          score -= 20;
        }
      } catch (error) {
        vulnerabilities.push('Invalid redirect URL format');
        score -= 15;
      }
    }

    // Check for weak nonce values
    // 检查弱 nonce 值
    if (options.nonce && options.nonce.length < 20) {
      vulnerabilities.push('Nonce value is too short');
      score -= 10;
    }

    if (options.nonce && !/^[a-zA-Z0-9-_]{20,}$/.test(options.nonce)) {
      vulnerabilities.push('Nonce contains invalid characters');
      score -= 10;
    }

    // Check for missing security headers
    // 检查缺失的安全头
    if (!options.nonce) {
      vulnerabilities.push('Missing nonce for CSRF protection');
      score -= 15;
    }

    // Generate recommendations
    // 生成建议
    if (score < 100) {
      recommendations.push('Use HTTPS for all redirect URLs');
      recommendations.push('Implement proper CSRF protection');
      recommendations.push('Use cryptographically secure nonce values');
      recommendations.push('Validate all input parameters');
    }

    return {
      isValid: score >= 70,
      score: Math.max(0, score),
      vulnerabilities,
      recommendations,
      riskLevel: this.getRiskLevel(score),
    };
  }

  /**
   * Get risk level based on security score
   * 根据安全评分获取风险等级
   * 
   * @param score - Security score 安全评分
   * @returns Risk level 风险等级
   */
  private static getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 90) return 'low';
    if (score >= 70) return 'medium';
    if (score >= 50) return 'high';
    return 'critical';
  }
}

/**
 * Security assessment utilities
 * 安全评估工具
 */
export const securityUtils = {
  /**
   * Perform comprehensive security assessment
   * 执行综合安全评估
   * 
   * @param options - Authentication options 认证选项
   * @param tokens - Authentication tokens 认证 token
   * @returns Comprehensive security assessment 综合安全评估
   */
  assessSecurity(options: any, tokens?: any): {
    inputValidation: SecurityAssessmentResult;
    tokenSecurity: SecurityAssessmentResult[];
    vulnerabilityScan: SecurityAssessmentResult;
    overallScore: number;
    recommendations: string[];
  } {
    // Validate input parameters
    // 验证输入参数
    const inputValidation = VulnerabilityScanner.scanVulnerabilities(options);

    // Validate tokens if provided
    // 如果提供了 token 则验证
    const tokenSecurity: SecurityAssessmentResult[] = [];
    if (tokens) {
      if (tokens.idToken) {
        tokenSecurity.push(TokenSecurityValidator.validateJWT(tokens.idToken));
      }
      if (tokens.accessToken) {
        tokenSecurity.push(TokenSecurityValidator.validateAccessToken(tokens.accessToken));
      }
    }

    // Perform vulnerability scan
    // 执行漏洞扫描
    const vulnerabilityScan = VulnerabilityScanner.scanVulnerabilities(options);

    // Calculate overall score
    // 计算总体评分
    const scores = [inputValidation.score, vulnerabilityScan.score, ...tokenSecurity.map(t => t.score)];
    const overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Collect all recommendations
    // 收集所有建议
    const recommendations = [
      ...inputValidation.recommendations,
      ...vulnerabilityScan.recommendations,
      ...tokenSecurity.flatMap(t => t.recommendations),
    ];

    return {
      inputValidation,
      tokenSecurity,
      vulnerabilityScan,
      overallScore: Math.round(overallScore),
      recommendations: [...new Set(recommendations)], // Remove duplicates
    };
  },

  /**
   * Sanitize authentication options
   * 清理认证选项
   * 
   * @param options - Raw authentication options 原始认证选项
   * @returns Sanitized options 清理后的选项
   */
  sanitizeOptions(options: any): any {
    return InputSanitizer.validateAuthOptions(options);
  },

  /**
   * Validate token security
   * 验证 token 安全性
   * 
   * @param token - Token to validate 要验证的 token
   * @param type - Token type token 类型
   * @returns Security assessment result 安全评估结果
   */
  validateToken(token: string, type: 'jwt' | 'access'): SecurityAssessmentResult {
    if (type === 'jwt') {
      return TokenSecurityValidator.validateJWT(token);
    } else {
      return TokenSecurityValidator.validateAccessToken(token);
    }
  },
}; 