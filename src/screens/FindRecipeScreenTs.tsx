// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import { findRecipesByIngredients } from '../api/ApiHandler';
// import { Recipe } from '../components/Types';
// import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../components/Types';
// import { StackNavigationProp } from '@react-navigation/stack';
// import ImageBackground2 from '../components/ImageBackground2';

// const FindRecipeScreenTs: React.FC = () => {
//   const [ingredients, setIngredients] = useState<string[]>(['']);
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'FindRecipe'>>();

//   const addIngredient = () => {
//     if (ingredients.length < 10) {
//       setIngredients([...ingredients, '']);
//     }
//   };

//   const removeIngredient = (index: number) => {
//     if (ingredients.length > 1) {
//       const newIngredients = [...ingredients];
//       newIngredients.splice(index, 1);
//       setIngredients(newIngredients);
//     }
//   };

//   const handleIngredientChange = (text: string, index: number) => {
//     const newIngredients = [...ingredients];
//     newIngredients[index] = text;
//     setIngredients(newIngredients);
//   };

//   const handleFetchRecipes = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const ingredientsString = ingredients.join(',');
//       const data = await findRecipesByIngredients(ingredientsString);
//       setRecipes(data);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewRecipe = (recipeId: number) => {
//     navigation.navigate('Recipe', { recipeId });
//   };

//   const renderRecipeItem = ({ item }: { item: Recipe }) => (
//     <View style={styles.recipeItem}>
//       <Image source={{ uri: item.image }} style={styles.recipeImage} />
//       <Text style={styles.recipeTitle}>{item.title}</Text>
//       <Text style={styles.recipeDetails}>
//         Used Ingredients: {item.usedIngredientCount} | Missing Ingredients:{' '}
//         {item.missedIngredientCount}
//       </Text>
//       <TouchableOpacity
//         style={styles.viewRecipeButton}
//         onPress={() => handleViewRecipe(item.id)}
//       >
//         <Text style={styles.viewRecipeButtonText}>View Recipe</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <ImageBackground2>
//       <View style={styles.container}>
//         <Text style={styles.title}>Find a recipe!</Text>
//         <Text style={styles.subtitle}>Enter ingredients:</Text>
//         {ingredients.map((ingredient, index) => (
//           <View key={index} style={styles.ingredientRow}>
//             <TextInput
//               style={styles.input}
//               placeholder={`Ingredient ${index + 1}`}
//               value={ingredient}
//               onChangeText={(text) => handleIngredientChange(text, index)}
//             />
//             {ingredients.length > 1 && (
//               <TouchableOpacity
//                 style={styles.removeButton}
//                 onPress={() => removeIngredient(index)}
//               >
//                 <Text style={styles.removeButtonText}>X</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         ))}
//         {ingredients.length < 10 && (
//           <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
//             <Text style={styles.addButtonText}>+ Add Ingredient</Text>
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity
//           style={styles.searchButton}
//           onPress={handleFetchRecipes}
//           disabled={loading}
//         >
//           <Text style={styles.searchButtonText}>Search for Recipe!</Text>
//         </TouchableOpacity>

//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
//         ) : error ? (
//           <Text style={styles.errorText}>Error: {error}</Text>
//         ) : (
//           <FlatList
//             data={recipes}
//             renderItem={renderRecipeItem}
//             keyExtractor={(item) => item.id.toString()}
//             style={styles.recipeList}
//           />
//         )}
//       </View>
//     </ImageBackground2>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     flex: 1,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
//   ingredientRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 8,
//     marginRight: 8,
//   },
//   recipeList: {
//     marginTop: 16,
//   },
//   recipeItem: {
//     marginBottom: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//   },
//   recipeImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   recipeTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   recipeDetails: {
//     fontSize: 14,
//     color: '#666',
//   },
//   viewRecipeButton: {
//     backgroundColor: '#388E3C', // Darker green
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 25, // More rounded corners
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#2E7D32',
//   },
//   viewRecipeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   addButton: {
//     backgroundColor: '#4CAF50', // Light green
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   searchButton: {
//     backgroundColor: '#2196F3', // Blue
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   searchButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   removeButton: {
//     backgroundColor: '#FF5252', // Red
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   loader: {
//     marginTop: 16,
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 16,
//   },
// });

// export default FindRecipeScreenTs;
// src/screens/FindRecipeScreenTs.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../components/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageBackground2 from '../components/ImageBackground2';
import { fetchRecipesByIngredientsRequest } from '../redux/slices/recipeSlice';
import { RootState } from '../redux/store';
import { Recipe } from '../components/Types';
const FindRecipeScreenTs: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'FindRecipe'>>();

  // Access Redux state
  const { recipes, loading, error } = useSelector((state: RootState) => state.recipes);

  const addIngredient = () => {
    if (ingredients.length < 10) {
      setIngredients([...ingredients, '']);
    }
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const handleIngredientChange = (text: string, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setIngredients(newIngredients);
  };

  const handleFetchRecipes = () => {
    const ingredientsString = ingredients.join(',');
    dispatch(fetchRecipesByIngredientsRequest(ingredientsString)); // Dispatch Redux action
  };

  const handleViewRecipe = (recipeId: number) => {
    navigation.navigate('Recipe', { recipeId });
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeItem}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeDetails}>
        Used Ingredients: {item.usedIngredientCount} | Missing Ingredients:{' '}
        {item.missedIngredientCount}
      </Text>
      <TouchableOpacity
        style={styles.viewRecipeButton}
        onPress={() => handleViewRecipe(item.id)}
      >
        <Text style={styles.viewRecipeButtonText}>View Recipe</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground2>
      <View style={styles.container}>
        <Text style={styles.title}>Find a recipe!</Text>
        <Text style={styles.subtitle}>Enter ingredients:</Text>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientRow}>
            <TextInput
              style={styles.input}
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChangeText={(text) => handleIngredientChange(text, index)}
            />
            {ingredients.length > 1 && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeIngredient(index)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        {ingredients.length < 10 && (
          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Text style={styles.addButtonText}>+ Add Ingredient</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleFetchRecipes}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>Search for Recipe!</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : (
          <FlatList
            data={recipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.recipeList}
          />
        )}
      </View>
    </ImageBackground2>
  );
};

// Styles remain the same as before
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  recipeList: {
    marginTop: 16,
  },
  recipeItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipeDetails: {
    fontSize: 14,
    color: '#666',
  },
  viewRecipeButton: {
    backgroundColor: '#388E3C', // Darker green
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, // More rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2E7D32',
  },
  viewRecipeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50', // Light green
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#2196F3', // Blue
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF5252', // Red
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
  },
});

export default FindRecipeScreenTs;