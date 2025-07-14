/**
 * Security Assessment Utility for CivicAuth React Native Wrapper
 * CivicAuth React Native 包装器的安全评估工具
 * 
 * This file provides security validation and assessment utilities
 * 此文件提供安全验证和评估工具
 * 
 * Related files: src/CivicAuthModule.ts, src/test/IntegrationTests.test.ts
 * 相关文件：src/CivicAuthModule.ts, src/test/IntegrationTests.test.ts
 */

/**
 * Security assessment result interface
 * 安全评估结果接口
 */
interface SecurityAssessment {
  overallScore: number;
  inputValidation: {
    isValid: boolean;
    issues: string[];
  };
  tokenSecurity: {
    isValid: boolean;
    score: number;
    issues: string[];
  };
  vulnerabilityScan: {
    hasVulnerabilities: boolean;
    vulnerabilities: string[];
  };
  recommendations: string[];
}

/**
 * Token validation result interface
 * Token 验证结果接口
 */
interface TokenValidationResult {
  isValid: boolean;
  score: number;
  issues: string[];
  type: 'jwt' | 'oauth' | 'unknown';
}

/**
 * Security Utilities Class
 * 安全工具类
 * 
 * Provides comprehensive security validation and assessment
 * 提供全面的安全验证和评估
 */
class SecurityUtils {
  /**
   * Sanitize authentication options
   * 清理认证选项
   * 
   * @param options - Raw authentication options
   * @param options - 原始认证选项
   * @returns Sanitized options
   * @returns 清理后的选项
   */
  sanitizeOptions(options: any): any {
    const sanitized = { ...options };

    // Sanitize clientId
    // 清理 clientId
    if (sanitized.clientId) {
      sanitized.clientId = this.sanitizeString(sanitized.clientId);
    }

    // Sanitize redirectUrl
    // 清理 redirectUrl
    if (sanitized.redirectUrl) {
      sanitized.redirectUrl = this.sanitizeUrl(sanitized.redirectUrl);
    }

    // Sanitize nonce
    // 清理 nonce
    if (sanitized.nonce) {
      sanitized.nonce = this.sanitizeString(sanitized.nonce);
    }

    // Sanitize scope
    // 清理 scope
    if (sanitized.scope) {
      sanitized.scope = this.sanitizeString(sanitized.scope);
    }

    return sanitized;
  }

  /**
   * Sanitize string input
   * 清理字符串输入
   * 
   * @param input - Raw string input
   * @param input - 原始字符串输入
   * @returns Sanitized string
   * @returns 清理后的字符串
   */
  private sanitizeString(input: string): string {
    // Remove script tags and dangerous content
    // 移除脚本标签和危险内容
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }

  /**
   * Sanitize URL input
   * 清理 URL 输入
   * 
   * @param url - Raw URL input
   * @param url - 原始 URL 输入
   * @returns Sanitized URL
   * @returns 清理后的 URL
   */
  private sanitizeUrl(url: string): string {
    // Remove dangerous protocols
    // 移除危险协议
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
    const lowerUrl = url.toLowerCase();
    
    for (const protocol of dangerousProtocols) {
      if (lowerUrl.startsWith(protocol)) {
        throw new Error(`Dangerous protocol detected: ${protocol}`);
      }
    }

    return url.trim();
  }

  /**
   * Validate JWT token
   * 验证 JWT token
   * 
   * @param token - JWT token to validate
   * @param token - 要验证的 JWT token
   * @param type - Token type
   * @param type - Token 类型
   * @returns Validation result
   * @returns 验证结果
   */
  validateToken(token: string, type: 'jwt' | 'oauth' | 'unknown' = 'jwt'): TokenValidationResult {
    const issues: string[] = [];
    let score = 100;

    // Basic token validation
    // 基本 token 验证
    if (!token || typeof token !== 'string') {
      issues.push('Token is missing or invalid');
      score = 0;
      return { isValid: false, score, issues, type };
    }

    // Check token length
    // 检查 token 长度
    if (token.length < 10) {
      issues.push('Token is too short');
      score -= 30;
    }

    // Check for JWT format (3 parts separated by dots)
    // 检查 JWT 格式（3个部分用点分隔）
    if (type === 'jwt') {
      const parts = token.split('.');
      if (parts.length !== 3) {
        issues.push('Invalid JWT format');
        score -= 40;
      } else {
        // Validate base64 encoding
        // 验证 base64 编码
        try {
          atob(parts[1]); // Decode payload
          score += 10;
        } catch {
          issues.push('Invalid JWT encoding');
          score -= 20;
        }
      }
    }

    // Check for common vulnerabilities
    // 检查常见漏洞
    if (token.includes('null') || token.includes('undefined')) {
      issues.push('Token contains null/undefined values');
      score -= 20;
    }

    return {
      isValid: score >= 70,
      score: Math.max(0, score),
      issues,
      type,
    };
  }

  /**
   * Perform comprehensive security assessment
   * 执行全面的安全评估
   * 
   * @param options - Authentication options
   * @param options - 认证选项
   * @param tokens - Authentication tokens
   * @param tokens - 认证 tokens
   * @returns Security assessment result
   * @returns 安全评估结果
   */
  performSecurityAssessment(options: any, tokens?: any): SecurityAssessment {
    const assessment: SecurityAssessment = {
      overallScore: 0,
      inputValidation: { isValid: true, issues: [] },
      tokenSecurity: { isValid: true, score: 100, issues: [] },
      vulnerabilityScan: { hasVulnerabilities: false, vulnerabilities: [] },
      recommendations: [],
    };

    // Input validation assessment
    // 输入验证评估
    try {
      const sanitizedOptions = this.sanitizeOptions(options);
      assessment.inputValidation.isValid = true;
      assessment.overallScore += 25;
    } catch (error) {
      assessment.inputValidation.isValid = false;
      assessment.inputValidation.issues.push((error as Error).message);
      assessment.overallScore += 0;
    }

    // Token security assessment
    // Token 安全评估
    if (tokens) {
      if (tokens.idToken) {
        const tokenValidation = this.validateToken(tokens.idToken, 'jwt');
        assessment.tokenSecurity = tokenValidation;
        assessment.overallScore += tokenValidation.score * 0.5;
      }
      if (tokens.accessToken) {
        const accessTokenValidation = this.validateToken(tokens.accessToken, 'oauth');
        assessment.overallScore += accessTokenValidation.score * 0.3;
      }
    } else {
      assessment.overallScore += 25; // No tokens to validate
    }

    // Vulnerability scan
    // 漏洞扫描
    const vulnerabilities = this.scanForVulnerabilities(options, tokens);
    assessment.vulnerabilityScan.hasVulnerabilities = vulnerabilities.length > 0;
    assessment.vulnerabilityScan.vulnerabilities = vulnerabilities;
    
    if (vulnerabilities.length > 0) {
      assessment.overallScore -= vulnerabilities.length * 10;
    }

    // Generate recommendations
    // 生成建议
    assessment.recommendations = this.generateRecommendations(assessment);

    // Ensure score is within bounds
    // 确保分数在范围内
    assessment.overallScore = Math.max(0, Math.min(100, assessment.overallScore));

    return assessment;
  }

  /**
   * Scan for security vulnerabilities
   * 扫描安全漏洞
   * 
   * @param options - Authentication options
   * @param options - 认证选项
   * @param tokens - Authentication tokens
   * @param tokens - 认证 tokens
   * @returns List of vulnerabilities
   * @returns 漏洞列表
   */
  private scanForVulnerabilities(options: any, tokens?: any): string[] {
    const vulnerabilities: string[] = [];

    // Check for weak clientId
    // 检查弱 clientId
    if (options.clientId && options.clientId.length < 8) {
      vulnerabilities.push('Weak clientId detected');
    }

    // Check for insecure redirectUrl
    // 检查不安全的 redirectUrl
    if (options.redirectUrl && !options.redirectUrl.startsWith('https://')) {
      vulnerabilities.push('Insecure redirectUrl (not HTTPS)');
    }

    // Check for missing nonce
    // 检查缺少 nonce
    if (!options.nonce) {
      vulnerabilities.push('Missing nonce parameter');
    }

    // Check for weak tokens
    // 检查弱 tokens
    if (tokens) {
      if (tokens.idToken && tokens.idToken.length < 50) {
        vulnerabilities.push('Weak ID token detected');
      }
      if (tokens.accessToken && tokens.accessToken.length < 20) {
        vulnerabilities.push('Weak access token detected');
      }
    }

    return vulnerabilities;
  }

  /**
   * Generate security recommendations
   * 生成安全建议
   * 
   * @param assessment - Security assessment result
   * @param assessment - 安全评估结果
   * @returns List of recommendations
   * @returns 建议列表
   */
  private generateRecommendations(assessment: SecurityAssessment): string[] {
    const recommendations: string[] = [];

    if (assessment.overallScore < 80) {
      recommendations.push('Implement additional security measures');
    }

    if (!assessment.inputValidation.isValid) {
      recommendations.push('Improve input validation and sanitization');
    }

    if (assessment.tokenSecurity.score < 80) {
      recommendations.push('Enhance token security validation');
    }

    if (assessment.vulnerabilityScan.hasVulnerabilities) {
      recommendations.push('Address identified security vulnerabilities');
    }

    if (recommendations.length === 0) {
      recommendations.push('Security configuration is adequate');
    }

    return recommendations;
  }
}

// Export singleton instance
// 导出单例实例
export const securityUtils = new SecurityUtils(); 