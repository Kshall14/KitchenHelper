import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/Store';
import ImageBackground2 from '../components/ImageBackground2';
import { SavedRecipe } from '../components/Types';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../components/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import { loadSavedRecipes } from '../redux/slices/savedRecipesSlice';
import { fetchSavedRecipes } from '../waterMelonDB/helpers';

const SavedRecipesScreenTs = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SavedRecipe'>>();
  const dispatch = useDispatch();
  
  // Access saved recipes from the Redux store
  const savedRecipes = useSelector((state: RootState) => state.savedRecipes.savedRecipes);

  // Load saved recipes when the component mounts
  // useEffect(() => {
  //   const loadRecipes = async () => {
  //     try {
  //       const savedRecipes = await fetchSavedRecipes();
  //       //console.log('Fetched recipes:', savedRecipes); // Debugging log
  //       dispatch(loadSavedRecipes(savedRecipes));
  //     } catch (err) {
  //       console.error('Failed to load saved recipes:', err);
  //     }
  //   };

  //   loadRecipes();
  // }, [dispatch]);
  useFocusEffect(
    React.useCallback(() => {
      const loadRecipes = async () => {
        try {
          const savedRecipes = await fetchSavedRecipes();
          dispatch(loadSavedRecipes(savedRecipes));
        } catch (err) {
          console.error('Failed to load saved recipes:', err);
        }
      };
  
      loadRecipes();
  
      // Optionally, you can return a cleanup function if needed
      return () => {
        // Cleanup logic (if any)
      };
    }, [dispatch])
  );
  // Navigate to the ViewRecipeScreen when a recipe is clicked
  const handleViewRecipe = (recipe: SavedRecipe) => {
    navigation.navigate('Recipe', { recipeId: recipe.spoonacularId, recipe });
  };

  return (
    <ImageBackground2>
      <View style={styles.container}>
        <Text style={styles.title}>Saved Recipes</Text>
        {savedRecipes.length === 0 ? (
          <Text style={styles.noRecipesText}>No saved recipes found.</Text>
        ) : (
          <FlatList
            data={savedRecipes}
            keyExtractor={(item) => item.spoonacularId.toString()}
            renderItem={({ item }) => {
              //console.log('Rendering item:', item); // Debugging log
              return (
                <TouchableOpacity
                  style={styles.recipeCard}
                  onPress={() => handleViewRecipe(item)}
                >
                  <Image source={{ uri: item.image }} style={styles.recipeImage} />
                  <Text style={styles.recipeTitle}>{item.title}</Text>
                  <Text style={styles.recipeTime}>Ready in {item.readyInMinutes} minutes</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </ImageBackground2>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  noRecipesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  recipeCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#EDD7F1',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default SavedRecipesScreenTs;