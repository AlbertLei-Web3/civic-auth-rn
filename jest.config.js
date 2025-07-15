/**
 * Jest configuration for React Native
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-webview)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}; 