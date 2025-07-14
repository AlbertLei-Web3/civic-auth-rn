/**
 * CivicAuth React Native Wrapper - Demo Login Screen
 * CivicAuth React Native 包装器 - 演示登录屏幕
 * 
 * This file contains the demo login screen that showcases the CivicAuth functionality
 * 此文件包含展示 CivicAuth 功能的演示登录屏幕
 * 
 * It demonstrates the loginWithCivic function with a clean, minimal UI following Civic's design
 * 它通过遵循 Civic 设计的简洁、极简 UI 演示 loginWithCivic 函数
 * 
 * Related files: demo/App.tsx, src/CivicAuthModule.ts
 * 相关文件：demo/App.tsx, src/CivicAuthModule.ts
 */

// Mock React for development (will be replaced with actual React import)
// 开发用的模拟 React（将被实际的 React 导入替换）
const React = {
  createElement: (type: any, props: any, ...children: any[]) => ({ type, props, children }),
  Fragment: 'Fragment'
};

// Mock React Native components for development
// 开发用的模拟 React Native 组件
const View = ({ children, style }: any) => ({ type: 'View', props: { children, style } });
const Text = ({ children, style }: any) => ({ type: 'Text', props: { children, style } });
const TouchableOpacity = ({ children, style, onPress, disabled }: any) => ({ type: 'TouchableOpacity', props: { children, style, onPress, disabled } });
const ActivityIndicator = ({ color, size }: any) => ({ type: 'ActivityIndicator', props: { color, size } });
const StyleSheet = {
  create: (styles: any) => styles
};
const Alert = {
  alert: (title: string, message: string, buttons: any[]) => console.log('Alert:', title, message)
};

// Mock useState for development
// 开发用的模拟 useState
const useState = (initialValue: any) => [initialValue, (value: any) => console.log('setState:', value)];

// Mock loginWithCivic and AuthResult for development
// 开发用的模拟 loginWithCivic 和 AuthResult
const loginWithCivic = async (): Promise<AuthResult> => ({
  success: true,
  token: 'mock-token-for-demo',
  userId: 'demo-user-id',
  email: 'demo@example.com'
});

// Type declaration for React.FC
// React.FC 类型声明
type ReactFC = (props?: any) => any;

// Mock AuthResult type
// 模拟 AuthResult 类型
interface AuthResult {
  success: boolean;
  token?: string;
  error?: string;
  userId?: string;
  email?: string;
}

/**
 * Demo Login Screen Component
 * 演示登录屏幕组件
 * 
 * This component demonstrates the CivicAuth login functionality
 * 此组件演示 CivicAuth 登录功能
 */
const DemoLoginScreen: ReactFC = () => {
  // State management for authentication
  // 认证的状态管理
  const [isLoading, setIsLoading] = useState(false);
  const [authResult, setAuthResult] = useState<AuthResult | null>(null);

  /**
   * Handle login with Civic
   * 处理 Civic 登录
   */
  const handleLoginWithCivic = async () => {
    try {
      setIsLoading(true);
      setAuthResult(null);

      // Call the loginWithCivic function
      // 调用 loginWithCivic 函数
      const result = await loginWithCivic();

      setAuthResult(result);

      if (result.success) {
        Alert.alert(
          'Success! 成功！',
          'Authentication completed successfully. 认证成功完成。',
          [{ text: 'OK 确定' }]
        );
      } else {
        Alert.alert(
          'Error 错误',
          result.error || 'Authentication failed. 认证失败。',
          [{ text: 'OK 确定' }]
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Error 错误',
        'An unexpected error occurred. 发生意外错误。',
        [{ text: 'OK 确定' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render authentication result
   * 渲染认证结果
   */
  const renderAuthResult = () => {
    if (!authResult) return null;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>
          {authResult.success ? 'Authenticated ✅' : 'Not authenticated ❌'}
        </Text>
        {authResult.token && (
          <Text style={styles.tokenText}>
            Token: {authResult.token.substring(0, 20)}...
          </Text>
        )}
        {authResult.error && (
          <Text style={styles.errorText}>
            Error: {authResult.error}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* 标题 */}
      <View style={styles.header}>
        <Text style={styles.title}>CivicAuth Demo</Text>
        <Text style={styles.subtitle}>React Native Wrapper</Text>
      </View>

      {/* Main content */}
      {/* 主要内容 */}
      <View style={styles.content}>
        {/* Login button */}
        {/* 登录按钮 */}
        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLoginWithCivic}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>Login with Civic</Text>
          )}
        </TouchableOpacity>

        {/* Authentication result */}
        {/* 认证结果 */}
        {renderAuthResult()}
      </View>

      {/* Footer */}
      {/* 页脚 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by Civic Identity
        </Text>
      </View>
    </View>
  );
};

/**
 * Styles for the demo login screen
 * 演示登录屏幕的样式
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#6B7280',
  },
  content: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#2D8CFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#2D8CFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  tokenText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'monospace',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});

export default DemoLoginScreen; 