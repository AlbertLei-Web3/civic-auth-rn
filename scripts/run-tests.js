#!/usr/bin/env node

/**
 * Test Runner Script for CivicAuth React Native Wrapper
 * CivicAuth React Native 包装器的测试运行脚本
 * 
 * This script runs comprehensive tests with proper reporting and optimization
 * 此脚本运行全面的测试，并提供适当的报告和优化
 * 
 * Includes unit tests, integration tests, performance tests, and security tests
 * 包含单元测试、集成测试、性能测试和安全测试
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Test Runner Configuration
 * 测试运行器配置
 */
const config = {
  // Test directories
  // 测试目录
  testDirs: [
    'src/test',
    'src/**/__tests__',
  ],
  
  // Test patterns
  // 测试模式
  testPatterns: [
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
  ],
  
  // Coverage thresholds
  // 覆盖率阈值
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Performance thresholds
  // 性能阈值
  performanceThresholds: {
    maxTestTime: 10000, // 10 seconds
    maxMemoryUsage: 100 * 1024 * 1024, // 100MB
  },
};

/**
 * Color codes for console output
 * 控制台输出的颜色代码
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

/**
 * Log utility functions
 * 日志工具函数
 */
const log = {
  info: (message) => console.log(`${colors.blue}ℹ${colors.reset} ${message}`),
  success: (message) => console.log(`${colors.green}✓${colors.reset} ${message}`),
  warning: (message) => console.log(`${colors.yellow}⚠${colors.reset} ${message}`),
  error: (message) => console.log(`${colors.red}✗${colors.reset} ${message}`),
  header: (message) => console.log(`\n${colors.bright}${colors.cyan}${message}${colors.reset}\n`),
};

/**
 * Check if file exists
 * 检查文件是否存在
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Get test files
 * 获取测试文件
 */
function getTestFiles() {
  const testFiles = [];
  
  config.testDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir, { recursive: true });
      files.forEach(file => {
        if (typeof file === 'string' && config.testPatterns.some(pattern => 
          file.match(pattern.replace('**/*', '.*')))) {
          testFiles.push(path.join(dir, file));
        }
      });
    }
  });
  
  return testFiles;
}

/**
 * Run Jest tests
 * 运行 Jest 测试
 */
function runJestTests(options = {}) {
  const args = ['jest'];
  
  if (options.watch) args.push('--watch');
  if (options.coverage) args.push('--coverage');
  if (options.ci) args.push('--ci', '--coverage', '--watchAll=false');
  if (options.verbose) args.push('--verbose');
  
  try {
    log.info('Running Jest tests...');
    const result = execSync(args.join(' '), { 
      stdio: 'inherit',
      encoding: 'utf8',
    });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, output: error.message };
  }
}

/**
 * Run performance tests
 * 运行性能测试
 */
function runPerformanceTests() {
  log.header('Running Performance Tests');
  
  const startTime = Date.now();
  const startMemory = process.memoryUsage();
  
  // Run performance-intensive tests
  // 运行性能密集型测试
  const performanceTests = [
    'src/test/IntegrationTests.test.ts',
  ];
  
  let success = true;
  performanceTests.forEach(testFile => {
    if (fileExists(testFile)) {
      try {
        log.info(`Running performance test: ${testFile}`);
        execSync(`npx jest ${testFile} --testTimeout=30000`, { 
          stdio: 'inherit',
          encoding: 'utf8',
        });
      } catch (error) {
        log.error(`Performance test failed: ${testFile}`);
        success = false;
      }
    }
  });
  
  const endTime = Date.now();
  const endMemory = process.memoryUsage();
  const duration = endTime - startTime;
  const memoryUsed = endMemory.heapUsed - startMemory.heapUsed;
  
  log.info(`Performance test duration: ${duration}ms`);
  log.info(`Memory used: ${Math.round(memoryUsed / 1024 / 1024)}MB`);
  
  if (duration > config.performanceThresholds.maxTestTime) {
    log.warning(`Test duration exceeded threshold: ${duration}ms > ${config.performanceThresholds.maxTestTime}ms`);
  }
  
  if (memoryUsed > config.performanceThresholds.maxMemoryUsage) {
    log.warning(`Memory usage exceeded threshold: ${memoryUsed} > ${config.performanceThresholds.maxMemoryUsage}`);
  }
  
  return success;
}

/**
 * Run security tests
 * 运行安全测试
 */
function runSecurityTests() {
  log.header('Running Security Tests');
  
  const securityTests = [
    'src/test/CivicAuthModule.test.ts',
  ];
  
  let success = true;
  securityTests.forEach(testFile => {
    if (fileExists(testFile)) {
      try {
        log.info(`Running security test: ${testFile}`);
        execSync(`npx jest ${testFile} --testNamePattern="security|validation|sanitize"`, { 
          stdio: 'inherit',
          encoding: 'utf8',
        });
      } catch (error) {
        log.error(`Security test failed: ${testFile}`);
        success = false;
      }
    }
  });
  
  return success;
}

/**
 * Generate test report
 * 生成测试报告
 */
function generateTestReport(results) {
  log.header('Test Report');
  
  const report = {
    timestamp: new Date().toISOString(),
    totalTests: results.totalTests || 0,
    passedTests: results.passedTests || 0,
    failedTests: results.failedTests || 0,
    coverage: results.coverage || {},
    performance: results.performance || {},
    security: results.security || {},
  };
  
  // Save report to file
  // 保存报告到文件
  const reportPath = path.join(__dirname, '../coverage/test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  log.success(`Test report saved to: ${reportPath}`);
  
  // Display summary
  // 显示摘要
  console.log('\n' + '='.repeat(50));
  console.log('TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Tests: ${report.totalTests}`);
  console.log(`Passed: ${report.passedTests}`);
  console.log(`Failed: ${report.failedTests}`);
  console.log(`Success Rate: ${report.totalTests > 0 ? Math.round((report.passedTests / report.totalTests) * 100) : 0}%`);
  console.log('='.repeat(50));
  
  return report;
}

/**
 * Main test runner function
 * 主测试运行器函数
 */
function runTests() {
  log.header('CivicAuth React Native Wrapper - Test Suite');
  
  const args = process.argv.slice(2);
  const options = {
    watch: args.includes('--watch'),
    coverage: args.includes('--coverage'),
    ci: args.includes('--ci'),
    verbose: args.includes('--verbose'),
    performance: args.includes('--performance'),
    security: args.includes('--security'),
  };
  
  log.info('Starting comprehensive test suite...');
  
  // Check if Jest is available
  // 检查 Jest 是否可用
  if (!fileExists('node_modules/.bin/jest')) {
    log.error('Jest not found. Please install dependencies first.');
    process.exit(1);
  }
  
  // Run main tests
  // 运行主要测试
  const testResult = runJestTests(options);
  
  // Run performance tests if requested
  // 如果请求则运行性能测试
  let performanceResult = { success: true };
  if (options.performance) {
    performanceResult = runPerformanceTests();
  }
  
  // Run security tests if requested
  // 如果请求则运行安全测试
  let securityResult = { success: true };
  if (options.security) {
    securityResult = runSecurityTests();
  }
  
  // Generate report
  // 生成报告
  const results = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    performance: performanceResult,
    security: securityResult,
  };
  
  const report = generateTestReport(results);
  
  // Exit with appropriate code
  // 使用适当的代码退出
  const allSuccess = testResult.success && performanceResult.success && securityResult.success;
  
  if (allSuccess) {
    log.success('All tests passed successfully!');
    process.exit(0);
  } else {
    log.error('Some tests failed. Please check the output above.');
    process.exit(1);
  }
}

// Run the test suite
// 运行测试套件
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests,
  runJestTests,
  runPerformanceTests,
  runSecurityTests,
  generateTestReport,
}; 