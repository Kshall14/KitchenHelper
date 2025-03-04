// src/screens/MainMenuScreenTs.tsx
import React, { useState } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '../redux/slices/userSlice'; // Import the action
import ImageBackground3 from '../components/ImageBackground3';
const MainMenuScreenTs: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const handleSignUp = () => {
    // Dispatch the signUpRequest action with the payload
    dispatch(signUpRequest({ email, password, displayName }));
    
  };

  return (
    <ImageBackground3>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Kitchen Helper!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Display Name"
        onChangeText={setDisplayName}
        value={displayName}
        placeholderTextColor="#F00FFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        placeholderTextColor="#F00FFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Create a Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholderTextColor="#F00FFF"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground3>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#228B22',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#32CD32',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#2E8B57',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainMenuScreenTs;