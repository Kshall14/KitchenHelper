import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SavedRecipe } from '../components/Types';
import { getRecipeInformation } from '../api/ApiHandler';
import ImageBackground4 from '../components/ImageBackground2';
import { useDispatch, useSelector } from 'react-redux';
import { addSavedRecipe, removeSavedRecipe } from '../redux/slices/savedRecipesSlice';
import { RootState } from '../redux/Store';

type RecipeScreenRouteProp = RouteProp<RootStackParamList, 'Recipe'>;

type RecipeScreenProps = {
  route: RecipeScreenRouteProp;
};

const ViewRecipeScreenTs: React.FC<RecipeScreenProps> = ({ route }) => {
  const { recipeId, recipe: passedRecipe } = route.params;
  const [recipe, setRecipe] = useState<SavedRecipe | null>(passedRecipe || null);
  const [loading, setLoading] = useState<boolean>(!passedRecipe); // Only load if passedRecipe is not provided
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const dispatch = useDispatch();
  const savedRecipes = useSelector((state: RootState) => state.savedRecipes);

  useEffect(() => {
    // Reset state when route.params changes
    setRecipe(passedRecipe || null);
    setLoading(!passedRecipe);
    setError(null);

    if (passedRecipe) {
      checkIfFavorited(passedRecipe.id); // Check if the passed recipe is favorited
    }
  }, [route.params]); // Watch for changes in route.params

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (passedRecipe) {
        // If passedRecipe is provided, skip the API call
        setLoading(false);
        return;
      }

      try {
        const data = await getRecipeInformation(recipeId);
        setRecipe(data);
        checkIfFavorited(data.id); // Check if the recipe is already favorited
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId, passedRecipe]); // Add passedRecipe as a dependency

  const checkIfFavorited = async (id: number) => {
    try {
      const savedRecipes = await AsyncStorage.getItem('savedRecipes');
      if (savedRecipes) {
        const recipes = JSON.parse(savedRecipes);
        const isSaved = recipes.some((recipe: SavedRecipe) => recipe.id === id);
        setIsFavorited(isSaved);
      }
    } catch (err) {
      console.error('Failed to check if recipe is favorited:', err);
    }
  };

  const toggleFavorite = async () => {
    if (!recipe) return;

    try {
      const savedRecipes = await AsyncStorage.getItem('savedRecipes');
      let updatedRecipes: SavedRecipe[] = savedRecipes ? JSON.parse(savedRecipes) : [];

      if (isFavorited) {
        // Remove the recipe from favorites
        updatedRecipes = updatedRecipes.filter((r: SavedRecipe) => r.id !== recipe.id);
        dispatch(removeSavedRecipe(recipe.id)); // Update Redux store
      } else {
        // Add the recipe to favorites
        updatedRecipes = [...updatedRecipes, recipe];
        dispatch(addSavedRecipe(recipe)); // Update Redux store
      }

      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes)); // Update Async Storage
      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ImageBackground4>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Text style={styles.favoriteButtonText}>
            {isFavorited ? 'Unfavorite' : 'Favorite'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        {recipe.analyzedInstructions?.[0]?.steps.map((step: any) => (
          <Text key={step.number} style={styles.stepText}>
            {step.number}. {step.step}
          </Text>
        ))}
      </ScrollView>
    </ImageBackground4>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#F0FFF0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  favoriteButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default ViewRecipeScreenTs;