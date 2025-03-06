module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Add this line
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'react-native-reanimated/plugin',
  ],
};
