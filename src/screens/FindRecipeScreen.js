import React from 'react';
import { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { findRecipesByIngredients } from '../api/ApiHandler';

const RecipeScreen = () => {
    const [ingredients, setIngredients] = useState(['']); // Start with one empty ingredient
    const [recipes, setRecipes] = useState([]); // State to store recipes
    const [loading, setLoading] = useState(false); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    // Function to add a new ingredient input
    const addIngredient = () => {
        if (ingredients.length < 10) {
            setIngredients([...ingredients, '']); // Add a new empty string to the ingredients array
        }
    };

    // Function to remove an ingredient input
    const removeIngredient = (index) => {
        if (ingredients.length > 1) {
            const newIngredients = [...ingredients];
            newIngredients.splice(index, 1); // Remove the ingredient at the specified index
            setIngredients(newIngredients);
        }
    };

    // Function to update an ingredient's value
    const handleIngredientChange = (text, index) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = text; // Update the ingredient at the specified index
        setIngredients(newIngredients);
    };

    // Function to fetch recipes
    const handleFetchRecipes = async () => {
        setLoading(true);
        setError(null);

        try {
            // Join the ingredients array into a comma-separated string
            const ingredientsString = ingredients.join(',');

            // Pass the comma-separated string to the API function
            const data = await findRecipesByIngredients(ingredientsString);
            setRecipes(data); // Set the fetched recipes
        } catch (err) {
            setError(err.message); // Set error message if something goes wrong
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Render each recipe item in the FlatList
    const renderRecipeItem = ({ item }) => (
        <View style={styles.recipeItem}>
            <Image
                source={{ uri: item.image }}
                style={styles.recipeImage}
            />
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={styles.recipeDetails}>
                Used Ingredients: {item.usedIngredientCount} | Missing Ingredients: {item.missedIngredientCount}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Ingredients Section */}
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
                        <Button
                            title="X"
                            onPress={() => removeIngredient(index)}
                            color="red"
                        />
                    )}
                </View>
            ))}
            {ingredients.length < 10 && (
                <Button
                    title="+ Add Ingredient"
                    onPress={addIngredient}
                />
            )}
            <Button
                title="Search for Recipe!"
                onPress={handleFetchRecipes}
                disabled={loading} // Disable button while loading
            />

            {/* Recipes Section */}
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
    );
};

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
    loader: {
        marginTop: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 16,
    },
});

export default RecipeScreen;