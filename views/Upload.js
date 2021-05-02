import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import {getIngredients} from '../hooks/fetchGQL';
import {useRecipe} from '../hooks/fetchGQL';

const Upload = () => {
  const [inputs, setInputs] = useState({
    recipeName: '',
    category: '',
    instructions: '',
  });

  const {postRecipe} = useRecipe(inputs);

  const handleInputChange = (name, text) => {
    console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const uploadRecipe = async (inputs) => {
    try {
      const recipeData = await postRecipe(inputs);
      console.log('upload recipe data', recipeData);
    } catch (error) {
      console.log('upload recipe error', error);
    }
  };
  try {
    const ingredients = getIngredients();
    // No idea why this is a promise, when it tells me in getIngredients that
    // it is a nice array I could use.
    console.log('ingredients list', ingredients);
  } catch (error) {
    console.log('upload error', error);
  }

  return (
    <View>
      <Card>
        <Card.Title h2>Upload a recipe</Card.Title>
        <Input
          placeholder="Recipe name"
          onChangeText={(txt) => handleInputChange('recipeName', txt)}
        ></Input>
        <Input
          placeholder="Category"
          onChangeText={(txt) => handleInputChange('category', txt)}
        ></Input>
        <Input
          placeholder="Instructions"
          onChangeText={(txt) => handleInputChange('instructions', txt)}
        ></Input>

        <Button title="Upload" onPress={() => uploadRecipe()}></Button>
      </Card>
    </View>
  );
};

export default Upload;
