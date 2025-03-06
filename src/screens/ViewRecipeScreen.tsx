import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  LogBox,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SavedRecipe, RecipeType } from '../components/Types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchRecipeInformationRequest } from '../redux/slices/recipeInfoSlice';
import ImageBackground4 from '../components/ImageBackground2';
import { addSavedRecipe, removeSavedRecipe } from '../redux/slices/waterMelonDBSlice';
import { saveRecipe, deleteRecipe, isRecipeFavorited } from '../waterMelonDB/helpers';
import HTML from 'react-native-render-html';
import { saveIngredientsToShoppingList } from '../waterMelonDB/helpers'; // Import the helper function

// Suppress warnings
LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components',
  'Support for defaultProps will be removed from memo components',
  'TRenderEngineProvider: Support for defaultProps',
]);

type RecipeScreenRouteProp = RouteProp<RootStackParamList, 'Recipe'>;

type RecipeScreenProps = {
  route: RecipeScreenRouteProp;
};

const ViewRecipeScreenTs: React.FC<RecipeScreenProps> = ({ route }) => {
  const { recipeId: recipeIdParam, recipe: passedRecipe } = route.params;
  const recipeId = Number(recipeIdParam); // Parse recipeId as a number
  const dispatch = useDispatch();
  const { recipe, loading, error } = useSelector((state: RootState) => state.recipeInfo);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const { width } = useWindowDimensions(); // Get the screen width

  useEffect(() => {
    if (isNaN(recipeId)) {
      console.error('Invalid recipeId:', recipeIdParam);
      return;
    }

    if (!passedRecipe) {
      // Fetch recipe information if not passed via navigation
      dispatch(fetchRecipeInformationRequest(recipeId)); // Use parsed recipeId
    } else {
      // Use the passed recipe and check if it's favorited
      checkIfFavorited(passedRecipe.spoonacularId); // Use spoonacularId
    }
  }, [recipeId, passedRecipe]);

  const checkIfFavorited = async (id: number) => {
    if (typeof id !== 'number' || isNaN(id)) {
      console.error('Invalid spoonacularId:', id);
      return;
    }

    try {
      const isFavorited = await isRecipeFavorited(id); // Use spoonacularId
      setIsFavorited(isFavorited);
    } catch (err) {
      console.error('Failed to check if recipe is favorited:', err);
    }
  };

  const toggleFavorite = async () => {
    const displayedRecipe = recipe || passedRecipe;
    if (!displayedRecipe) return;

    try {
      if (isFavorited) {
        // Remove the recipe from favorites
        await deleteRecipe(displayedRecipe.spoonacularId); // Use spoonacularId
        dispatch(removeSavedRecipe(displayedRecipe.spoonacularId)); // Use spoonacularId
      } else {
        // Add the recipe to favorites
        const recipeToSave: RecipeType = {
          spoonacularId: displayedRecipe.spoonacularId, // Use spoonacularId
          title: displayedRecipe.title,
          ingredients: displayedRecipe.ingredients || [],
          instructions: displayedRecipe.instructions || '', // Use instructions field
          image: displayedRecipe.image,
          readyInMinutes: displayedRecipe.readyInMinutes || 30,
        };
        console.log('Recipe to save:', recipeToSave);
        await saveRecipe(recipeToSave); // Use WatermelonDB helper
        dispatch(addSavedRecipe(recipeToSave)); // Update Redux store
      }

      setIsFavorited(!isFavorited); // Toggle favorite state
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  // Function to handle adding ingredients to the shopping list
  const handleAddToShoppingList = async () => {
    const displayedRecipe = recipe || passedRecipe;
    if (!displayedRecipe) return;
  
    try {
      // Extract ingredients from the recipe
      const ingredients = displayedRecipe.ingredients?.map(
        (ingredient) => `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`
      ) || [];
      console.log('Ingredients to save:', ingredients); // Debugging log
    console.log('Recipe name:', displayedRecipe.title); // Debugging log
    console.log('Recipe ID:', displayedRecipe.id); // Debugging log
      // Ensure recipeId is a number
      const recipeId = typeof displayedRecipe.id === 'string' 
        ? parseInt(displayedRecipe.id, 10) 
        : displayedRecipe.id;
  
      // Save ingredients to the shopping list
      await saveIngredientsToShoppingList(ingredients, displayedRecipe.title, recipeId);
  
      console.log('Ingredients added to shopping list successfully.');
    } catch (error) {
      console.error('Error adding ingredients to shopping list:', error);
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

  const displayedRecipe = recipe || passedRecipe;

  if (!displayedRecipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Recipe not found.</Text>
      </View>
    );
  }

  // Parse ingredients from JSON string (for WatermelonDB recipes)
  const ingredients = displayedRecipe.ingredients || [];
  // Ensure ingredients is always an array
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];

  // Handle instructions (remove extra escaping if necessary)
  const instructions = displayedRecipe.instructions || '';

  return (
    <ImageBackground4>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{displayedRecipe.title}</Text>
        <Image source={{ uri: displayedRecipe.image }} style={styles.recipeImage} />

        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Text style={styles.favoriteButtonText}>
            {isFavorited ? 'Unfavorite' : 'Favorite'}
          </Text>
        </TouchableOpacity>

        {/* Add to Shopping List Button */}
        <TouchableOpacity style={styles.shoppingListButton} onPress={handleAddToShoppingList}>
          <Text style={styles.shoppingListButtonText}>Add to Shopping List</Text>
        </TouchableOpacity>

        {/* Ready In Minutes */}
        <Text style={styles.sectionTitle}>Ready in {displayedRecipe.readyInMinutes} minutes</Text>

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {safeIngredients.map((ingredient: any, index: number) => (
          <Text key={index} style={styles.ingredient}>
            • {ingredient.original}
          </Text>
        ))}

        {/* Instructions */}
        <Text style={styles.sectionTitle}>Instructions:</Text>
        {displayedRecipe.analyzedInstructions?.[0]?.steps ? (
          displayedRecipe.analyzedInstructions[0].steps.map((step: any) => (
            <Text key={step.number} style={styles.stepText}>
              {step.number}. {step.step}
            </Text>
          ))
        ) : (
          <HTML
            source={{ html: instructions }}
            contentWidth={width} // Pass the screen width
            tagsStyles={{
              ol: { marginLeft: 20 }, // Style for ordered lists
              li: { marginBottom: 10 }, // Style for list items
            }}
          />
        )}
      </ScrollView>
    </ImageBackground4>
  );
};

// Styles remain the same as before
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
  shoppingListButton: {
    backgroundColor: '#4CAF50', // Green color for the shopping list button
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  shoppingListButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
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