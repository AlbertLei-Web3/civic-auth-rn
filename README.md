# CivicAuth React Native Wrapper

[![npm version](https://badge.fury.io/js/civic-auth-rn.svg)](https://badge.fury.io/js/civic-auth-rn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🔐 **CivicAuth React Native 包装器** - 基于 `@civic/auth` 的 React Native 身份验证解决方案
> 
> **CivicAuth React Native Wrapper** - React Native authentication solution based on `@civic/auth`

## 📋 项目概述 Project Overview

这是一个为 [Superteam Earn](https://earn.superteam.fun/listing/civicauth4reactnative/) 开发的 React Native 包装器，将 Civic Auth 的 Web SDK 适配到 React Native 环境中。

This is a React Native wrapper developed for [Superteam Earn](https://earn.superteam.fun/listing/civicauth4reactnative/) that adapts Civic Auth's Web SDK to React Native environment.

### ✨ 核心特性 Key Features

- 🔗 **基于官方 SDK** - 基于 `@civic/auth` Web SDK 构建
- 🎯 **React Native 优化** - 专门为 React Native 环境优化
- 🔒 **OAuth 2.0 / OpenID Connect** - 支持标准认证协议
- 📱 **深度链接支持** - 完整的深度链接回调处理
- 🎨 **TypeScript 支持** - 完整的 TypeScript 类型定义
- 🚀 **简洁 API** - 提供 `CivicAuthProvider` 和 `useUser()` 钩子

### 🏗️ 架构设计 Architecture

```
CivicAuth React Native Wrapper
├── CivicAuthProvider (React Context)
├── useUser() Hook
├── OAuth 2.0 Flow Handler
├── Deep Link Processing
└── TypeScript Types
```

## 🚀 快速开始 Quick Start

### 安装 Installation

```bash
npm install civic-auth-rn
# 或者 or
yarn add civic-auth-rn
```

### 基本使用 Basic Usage

```tsx
import React from 'react';
import { CivicAuthProvider, useUser } from 'civic-auth-rn';

function App() {
  return (
    <CivicAuthProvider
      clientId="your-civic-client-id"
      redirectUrl="yourapp://callback"
      displayMode="redirect"
    >
      <AuthScreen />
    </CivicAuthProvider>
  );
}

function AuthScreen() {
  const { user, isLoading, login, logout, isAuthenticated } = useUser();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return (
      <View>
        <Text>Welcome, {user?.profile?.name}!</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    );
  }

  return (
    <View>
      <Button title="Login with Civic" onPress={login} />
    </View>
  );
}
```

## 📚 API 文档 API Documentation

### CivicAuthProvider

主要的 Context Provider，包裹你的应用以提供认证功能。

Main Context Provider that wraps your app to provide authentication functionality.

#### Props

| 属性 Property | 类型 Type | 必填 Required | 默认值 Default | 说明 Description |
|---------------|-----------|---------------|----------------|------------------|
| `clientId` | `string` | ✅ | - | Civic 客户端 ID |
| `redirectUrl` | `string` | ❌ | `https://civic.com/auth/callback` | 认证回调 URL |
| `displayMode` | `'iframe' \| 'redirect' \| 'new_tab'` | ❌ | `'redirect'` | 认证显示模式 |
| `iframeMode` | `'embedded'` | ❌ | - | iframe 模式配置 |

### useUser Hook

用于访问用户认证状态和方法的 React Hook。

React Hook for accessing user authentication state and methods.

#### 返回值 Return Value

```typescript
interface CivicAuthContextType {
  user: CivicUser | null;           // 当前用户信息
  isLoading: boolean;               // 加载状态
  login: () => Promise<void>;       // 登录方法
  logout: () => void;               // 登出方法
  isAuthenticated: boolean;         // 认证状态
}
```

### CivicUser 类型 Type

```typescript
interface CivicUser {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  forwardedTokens?: Record<string, string>;
  profile?: {
    sub: string;
    email?: string;
    name?: string;
    [key: string]: any;
  };
}
```

## 🎯 演示应用 Demo Application

项目包含一个完整的演示应用，展示如何使用 CivicAuth React Native 包装器。

The project includes a complete demo application showing how to use the CivicAuth React Native wrapper.

### 运行演示 Running the Demo

```bash
# 进入演示目录
cd demo

# 安装依赖
npm install

# 启动演示应用
npm start
```

### 演示功能 Demo Features

- 🔐 **登录界面** - 展示 Civic Auth 登录流程
- 👤 **用户资料** - 显示认证后的用户信息
- 🔑 **令牌管理** - 展示访问令牌和刷新令牌
- 🎭 **演示模式** - 模拟认证流程用于测试

## 🔧 配置 Configuration

### 深度链接配置 Deep Link Configuration

为了处理认证回调，需要配置深度链接：

To handle authentication callbacks, you need to configure deep links:

#### Android (android/app/src/main/AndroidManifest.xml)

```xml
<activity
  android:name=".MainActivity"
  android:exported="true"
  android:launchMode="singleTask">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="yourapp" />
  </intent-filter>
</activity>
```

#### iOS (ios/YourApp/Info.plist)

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>yourapp</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>yourapp</string>
    </array>
  </dict>
</array>
```

## 🔒 安全考虑 Security Considerations

- 🔐 **客户端 ID** - 确保使用正确的 Civic 客户端 ID
- 🔄 **令牌交换** - 授权码到令牌的交换应在后端进行
- 🔗 **深度链接** - 验证深度链接的来源和参数
- 💾 **令牌存储** - 安全地存储访问令牌和刷新令牌

## 📖 官方文档 Official Documentation

- 📘 **Civic Auth 文档**: [https://docs.civic.com](https://docs.civic.com)
- 📘 **React SDK**: [https://docs.civic.com/docs/react](https://docs.civic.com/docs/react)
- 📘 **NPM 包**: [https://www.npmjs.com/package/@civic/auth](https://www.npmjs.com/package/@civic/auth)

## 🧪 测试 Testing

```bash
# 运行测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 运行类型检查
npm run type-check
```

## 📦 构建 Building

```bash
# 构建 TypeScript
npm run build

# 检查代码风格
npm run lint
```

## 🤝 贡献 Contributing

欢迎贡献！请阅读我们的贡献指南。

Contributions are welcome! Please read our contributing guidelines.

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 📄 许可证 License

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢 Acknowledgments

- 感谢 [Civic](https://civic.com) 提供强大的身份验证平台
- 感谢 [Superteam](https://superteam.fun) 提供开发机会
- 基于 `@civic/auth` 官方 SDK 构建

## 📞 支持 Support

如果你有任何问题或需要帮助，请：

If you have any questions or need help, please:

- 📧 发送邮件到：support@civicauth-rn.com
- 🐛 提交 Issue：[GitHub Issues](https://github.com/AlbertLei-Web3/civic-auth-rn/issues)
- 📖 查看文档：[项目文档](https://github.com/AlbertLei-Web3/civic-auth-rn#readme)

---

**Made with ❤️ for the React Native community**

**为 React Native 社区用心打造** 