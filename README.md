# CivicAuth React Native Wrapper

A React Native wrapper for Civic's identity authentication system, allowing developers to easily integrate Civic Auth login into their mobile apps.

## 项目简介 (Project Description)

CivicAuth React Native Wrapper 是 Civic 身份认证系统的 React Native 包装器，允许开发者轻松地将 Civic Auth 登录集成到他们的移动应用中。

## Features 功能特性

- 🔐 **Secure Authentication** - WebView-based Civic authentication flow
- 🎨 **Civic Design Compliance** - Follows Civic's official design guidelines
- 📱 **Android Support** - Native Android module implementation
- 🛡️ **Security First** - No direct wallet access, token extraction only
- 📦 **Easy Integration** - Simple `loginWithCivic()` function
- 🎯 **Demo App** - Complete working example included
- ✅ **Official Documentation Integration** - Based on Civic Auth official docs
- 🧪 **Comprehensive Testing** - Full test suite included

## 功能特性 (Features)

- 🔐 **安全认证** - 基于 WebView 的 Civic 认证流程
- 🎨 **Civic 设计规范** - 遵循 Civic 官方设计指南
- 📱 **Android 支持** - 原生 Android 模块实现
- 🛡️ **安全优先** - 无直接钱包访问，仅提取令牌
- 📦 **易于集成** - 简单的 `loginWithCivic()` 函数
- 🎯 **演示应用** - 包含完整的工作示例
- ✅ **官方文档集成** - 基于 Civic Auth 官方文档
- 🧪 **全面测试** - 包含完整测试套件

## Installation 安装

```bash
npm install civic-auth-rn
```

### Android Setup Android 设置

Add the following to your `android/settings.gradle`:

```gradle
include ':civic-auth-rn'
project(':civic-auth-rn').projectDir = new File(rootProject.projectDir, '../node_modules/civic-auth-rn/android')
```

Add the following to your `android/app/build.gradle`:

```gradle
dependencies {
    implementation project(':civic-auth-rn')
}
```

Add the following to your `MainApplication.java`:

```java
import com.civicauth.CivicAuthPackage;

@Override
protected List<ReactPackage> getPackages() {
    List<ReactPackage> packages = new PackageList(this).getPackages();
    packages.add(new CivicAuthPackage());
    return packages;
}
```

## Usage 使用方法

### Basic Usage 基本用法

```typescript
import { loginWithCivic } from 'civic-auth-rn';

const handleLogin = async () => {
  try {
    const result = await loginWithCivic({
      clientId: 'your-client-id',
      redirectUrl: 'your-app://callback'
    });
    
    if (result.success) {
      console.log('Authentication successful:', result.idToken);
      console.log('User ID:', result.userId);
      console.log('Email:', result.email);
    } else {
      console.error('Authentication failed:', result.error);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

### Advanced Usage 高级用法

```typescript
import CivicAuth from 'civic-auth-rn';

const civicAuth = new CivicAuth();

const handleLogin = async () => {
  try {
    const result = await civicAuth.loginWithCivic({
      clientId: 'your-client-id',
      redirectUrl: 'your-app://callback',
      nonce: 'anti-replay-protection',
      displayMode: 'popup',
      scope: 'openid profile email'
    });
    
    if (result.success) {
      console.log('User authenticated:', result.userId);
      console.log('ID Token:', result.idToken);
      console.log('Access Token:', result.accessToken);
      console.log('Refresh Token:', result.refreshToken);
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }
};
```

## Testing 测试

The package includes comprehensive tests for all functionality:

包包含所有功能的全面测试：

```typescript
import { runCivicAuthTests } from 'civic-auth-rn/src/test/CivicAuthTest';

// Run all tests
const testResults = await runCivicAuthTests();
console.log('Test Results:', testResults);
```

### Test Coverage 测试覆盖

- ✅ **Module Availability** - Tests native module availability
- ✅ **Parameter Validation** - Validates required parameters
- ✅ **URL Building** - Tests Civic Auth URL construction
- ✅ **Token Structure** - Validates token response format
- ✅ **Error Handling** - Tests error scenarios
- ✅ **Configuration** - Tests auth info and settings

## Demo App 演示应用

The package includes a complete demo app showcasing the CivicAuth functionality.

包包含一个完整的演示应用，展示 CivicAuth 功能。

### Running the Demo 运行演示

```bash
# Clone the repository
git clone https://github.com/AlbertLei-Web3/civic-auth-rn.git
cd civic-auth-rn

# Install dependencies
npm install

# Run the demo app
npm run demo:android
```

## API Reference API 参考

### `loginWithCivic(options)`

Authenticates a user with Civic's identity system.

使用 Civic 身份系统认证用户。

#### Parameters 参数

- `options.clientId` (required) - Civic Dashboard project ID
- `options.redirectUrl` (required) - OAuth callback URL
- `options.nonce` (optional) - Anti-replay protection
- `options.displayMode` (optional) - Login window presentation
- `options.scope` (optional) - Authentication scope

#### Returns 返回值

```typescript
interface AuthResult {
  success: boolean;
  idToken?: string;        // OIDC id_token
  accessToken?: string;    // OAuth 2.0 access_token
  refreshToken?: string;   // Refresh token for re-authentication
  userId?: string;         // User identifier
  email?: string;          // User email
  name?: string;           // User name
  error?: string;          // Error message if failed
}
```

## Security Considerations 安全考虑

- No direct wallet access or private key handling
- Token extraction only from redirect URLs
- Secure WebView implementation with proper isolation
- No storage of sensitive data in the module
- Based on Civic Auth official security guidelines

## 安全考虑 (Security Considerations)

- 无直接钱包访问或私钥处理
- 仅从重定向 URL 提取令牌
- 具有适当隔离的安全 WebView 实现
- 模块中不存储敏感数据
- 基于 Civic Auth 官方安全指南

## Official Documentation 官方文档

This implementation is based on Civic Auth official documentation:

此实现基于 Civic Auth 官方文档：

- **Civic Auth Documentation**: https://docs.civic.com/
- **React Integration Guide**: https://docs.civic.com/integration/react
- **API Reference**: https://docs-sip.civic.com/

## Contributing 贡献

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 贡献 (Contributing)

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## License 许可证

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

此项目基于 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## Support 支持

For support, email support@civic.com or join our Slack channel.

如需支持，请发送邮件至 support@civic.com 或加入我们的 Slack 频道。

## 支持 (Support)

如需支持，请发送邮件至 support@civic.com 或加入我们的 Slack 频道。 