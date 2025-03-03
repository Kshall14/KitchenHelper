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
import { getRandomRecipe } from '../api/ApiHandler';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../components/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageBackground2 from '../components/ImageBackground2';

type RandomRecipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
};

const RandomRecipesScreenTs: React.FC = () => {
  const [randomRecipes, setRandomRecipes] = useState<RandomRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Recipe'>>();

  useEffect(() => {
    // Temporarily comment out the API call
    /*
    const fetchRandomRecipes = async () => {
      try {
        const recipes: RandomRecipe[] = [];
        for (let i = 0; i < 3; i++) {
          const data = await getRandomRecipe();
          if (data.recipes && data.recipes.length > 0) {
            recipes.push(data.recipes[0]);
          }
        }
        setRandomRecipes(recipes);
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
  
    fetchRandomRecipes();
    */
  
    // Use mock data for now
    const mockRecipes: RandomRecipe[] = [
      {
        id: 1,
        title: 'Mock Recipe 1',
        image: 'https://spoonacular.com/recipeImages/1-312x231.jpg',
        readyInMinutes: 30,
      },
      {
        id: 2,
        title: 'Mock Recipe 2',
        image: 'https://spoonacular.com/recipeImages/2-312x231.jpg',
        readyInMinutes: 45,
      },
      {
        id: 3,
        title: 'Mock Recipe 3',
        image: 'https://spoonacular.com/recipeImages/3-312x231.jpg',
        readyInMinutes: 60,
      },
    ];
    setRandomRecipes(mockRecipes);
    setLoading(false);
  }, []);

  const handleViewRecipe = (recipeId: number) => {
    navigation.navigate('Recipe', { recipeId });
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

  return (
    <ImageBackground2>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Random Recipes</Text>
        <View style={styles.recipeList}>
          {randomRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.timeContainer}>
                  <Image source={require('../../assets/ClockIcon.png')} style={styles.clockIcon} />
                  <Text style={styles.recipeTime}>{recipe.readyInMinutes} minutes</Text>
                </View>
                <TouchableOpacity
                  style={styles.viewRecipeButton}
                  onPress={() => handleViewRecipe(recipe.id)}
                >
                  <Text style={styles.viewRecipeButtonText}>View Recipe</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  recipeList: {
    marginBottom: 16,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  recipeDetails: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  clockIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  recipeTime: {
    fontSize: 14,
    color: '#666',
  },
  viewRecipeButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  viewRecipeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default RandomRecipesScreenTs;