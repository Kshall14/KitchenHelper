import React from 'react';
import { ImageBackground, StyleSheet, View, ViewStyle } from 'react-native';

type BackgroundProps = {
  children: React.ReactNode;
  style?: ViewStyle; // Optional custom styles for the container
};

const ImageBackground3: React.FC<BackgroundProps> = ({ children, style }) => {
  return (
    <ImageBackground
      source={require('../../assets/Background3.jpg')} // Replace with your image path
      style={[styles.background, style]}
      resizeMode="cover" // Ensures the image covers the entire screen
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent overlay
  },
});

export default ImageBackground3;