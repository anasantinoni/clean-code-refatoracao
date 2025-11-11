module.exports = {
  preset: 'react-native',
  
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  
  setupFiles: ['./jest-setup.js'],
  
  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'],
  
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  
  moduleNameMapper: {
    'prettier': '<rootDir>/node_modules/prettier'
  }
};