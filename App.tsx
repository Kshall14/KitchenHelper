import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigatorTs from './src/Navigation/DrawerNavigatorTs';
import firebase from '@react-native-firebase/app';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux/Store';
const App: React.FC = () => {
 
  useEffect(() => {

    // Check if Firebase is initialized
    if (firebase.apps.length) {
      console.log('Firebase initialized successfully!');
    } else {
      console.log('Firebase initialization failed.');
    }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigatorTs />
      </NavigationContainer>
    </Provider>
  );
};

export default App;