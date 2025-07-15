/**
 * ProfileScreen - 用户资料界面
 * 
 * 展示用户认证信息和登出功能
 * Screen that displays user authentication info and logout functionality
 */

import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { useUser } from 'civic-auth-rn';

interface ProfileScreenProps {
  onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const { user, logout, isAuthenticated } = useUser();

  const handleLogout = () => {
    Alert.alert(
      '确认登出 Confirm Logout',
      '您确定要登出吗？\nAre you sure you want to logout?',
      [
        { text: '取消 Cancel', style: 'cancel' },
        { 
          text: '登出 Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            onLogout();
          }
        }
      ]
    );
  };

  const mockUser = {
    accessToken: 'mock_access_token_123456789',
    idToken: 'mock_id_token_abcdefghijk',
    refreshToken: 'mock_refresh_token_xyz789',
    profile: {
      sub: 'civic_user_123',
      email: 'demo@civic.com',
      name: 'Civic Demo User',
      verified: true,
      citizenship: 'US',
      kyc_level: 'basic'
    }
  };

  const displayUser = user || mockUser;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>🎉 认证成功！</Text>
        <Text style={styles.welcomeSubtext}>Authentication Successful!</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>✅ 已验证 Verified</Text>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>👤 用户信息 User Profile</Text>
        
        <View style={styles.profileCard}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>用户ID User ID:</Text>
            <Text style={styles.profileValue}>{displayUser.profile?.sub}</Text>
          </View>
          
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>邮箱 Email:</Text>
            <Text style={styles.profileValue}>{displayUser.profile?.email}</Text>
          </View>
          
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>姓名 Name:</Text>
            <Text style={styles.profileValue}>{displayUser.profile?.name}</Text>
          </View>
          
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>验证状态 Verified:</Text>
            <Text style={[styles.profileValue, styles.verifiedText]}>
              {displayUser.profile?.verified ? '✅ 已验证' : '❌ 未验证'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tokenSection}>
        <Text style={styles.sectionTitle}>🔑 令牌信息 Token Info</Text>
        
        <View style={styles.tokenCard}>
          <View style={styles.tokenItem}>
            <Text style={styles.tokenLabel}>Access Token:</Text>
            <Text style={styles.tokenValue} numberOfLines={1}>
              {displayUser.accessToken}
            </Text>
          </View>
          
          <View style={styles.tokenItem}>
            <Text style={styles.tokenLabel}>ID Token:</Text>
            <Text style={styles.tokenValue} numberOfLines={1}>
              {displayUser.idToken}
            </Text>
          </View>
          
          <View style={styles.tokenItem}>
            <Text style={styles.tokenLabel}>Refresh Token:</Text>
            <Text style={styles.tokenValue} numberOfLines={1}>
              {displayUser.refreshToken}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>⚡ 操作 Actions</Text>
        
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => Alert.alert('刷新令牌', '令牌刷新功能（演示）\nToken refresh feature (demo)')}
          activeOpacity={0.7}
        >
          <Text style={styles.refreshButtonText}>🔄 刷新令牌</Text>
          <Text style={styles.refreshButtonSubtext}>Refresh Tokens</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutButtonText}>🚪 登出</Text>
          <Text style={styles.logoutButtonSubtext}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ 说明 Information</Text>
        <Text style={styles.infoText}>
          这是一个演示界面，展示了成功认证后的用户信息。
        </Text>
        <Text style={styles.infoText}>
          This is a demo screen showing user information after successful authentication.
        </Text>
        <Text style={styles.infoText}>
          在实际应用中，您可以使用这些令牌来访问受保护的资源。
        </Text>
        <Text style={styles.infoText}>
          In a real application, you can use these tokens to access protected resources.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: '#d4edda',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c3e6cb',
  },
  statusText: {
    color: '#155724',
    fontSize: 14,
    fontWeight: 'bold',
  },
  profileSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 12,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  profileLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
    flex: 1,
  },
  profileValue: {
    fontSize: 14,
    color: '#6c757d',
    flex: 1,
    textAlign: 'right',
  },
  verifiedText: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  tokenSection: {
    marginBottom: 20,
  },
  tokenCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  tokenItem: {
    marginBottom: 16,
  },
  tokenLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  tokenValue: {
    fontSize: 12,
    color: '#6c757d',
    fontFamily: 'monospace',
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  actionsSection: {
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  refreshButtonSubtext: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  logoutButtonSubtext: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  infoSection: {
    backgroundColor: '#e9ecef',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 8,
  },
}); 