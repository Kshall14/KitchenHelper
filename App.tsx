import React, { useEffect, ReactNode } from 'react'; // Import ReactNode
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigatorTs from './src/Navigation/DrawerNavigatorTs';
import firebase from '@react-native-firebase/app';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadSavedRecipes } from './src/redux/slices/savedRecipesSlice';

//import { app } from '@react-native-firebase/app';
// Define the props for AppLoader
interface AppLoaderProps {
  children: ReactNode; // Explicitly define the children prop
}

// Component to load saved recipes into Redux store
const AppLoader: React.FC<AppLoaderProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem('savedRecipes');
        if (savedRecipes) {
          const recipes = JSON.parse(savedRecipes);
          dispatch(loadSavedRecipes(recipes)); // Load saved recipes into Redux store
        }
      } catch (err) {
        console.error('Failed to load saved recipes:', err);
      }
    };

    loadRecipes();
  }, [dispatch]);

  return <>{children}</>; // Render children (the rest of the app)
};

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
        <AppLoader>
          <DrawerNavigatorTs />
        </AppLoader>
      </NavigationContainer>
    </Provider>
  );
};

export default App;