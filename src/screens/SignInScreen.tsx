import React, { useState } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../components/Types';
import { useDispatch } from 'react-redux';
import { signInRequest } from '../redux/slices/userSlice'; // Import the signInRequest action
import ImageBackground3 from '../components/ImageBackground3';

type MainMenuScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'MainMenu'>;
};

const MainMenuScreenTs: React.FC<MainMenuScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch(); // Initialize the dispatch function

  const handleSignIn = () => {
    // Dispatch the signInRequest action with email and password
    dispatch(signInRequest({ email, password }));

    // Navigate to the MainMenu after successful sign-in (handled in the saga)
    // Note: The navigation logic will be handled in the saga after successful authentication
  };

  return (
    <ImageBackground3>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in Screen</Text>
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
        <TouchableOpacity
          style={styles.button} // Apply the button style
          onPress={handleSignIn} // Handle the press event
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground3>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    //backgroundColor: '#F0FFF0', // Light green background
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#228B22', // Forest green for the title text
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#32CD32', // Lime green border for inputs
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#2E8B57', // Sea green for input text
    backgroundColor: '#FFFFFF', // White background for inputs
  },
  button: {
    backgroundColor: '#32CD32', // Lime green background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: 'bold', // Optional: make text bold
  },
});

export default MainMenuScreenTs;