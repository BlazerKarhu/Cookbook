import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Alert} from 'react-native';
import {ScrollView} from 'react-native';
import {Button, Text, Card, Input, ListItem} from 'react-native-elements';
import {getIngredients} from '../hooks/fetchGQL';
import {useRecipe} from '../hooks/fetchGQL';
import MultiSelect from 'react-native-multiple-select';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [inputs, setInputs] = useState({
    recipeName: '',
    category: '',
    instructions: '',
    ingredients: [''],
  });
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const {update, setUpdate} = useContext(MainContext);

  const {postRecipe} = useRecipe(inputs);

  const handleInputChange = (name, text) => {
    console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
        ingredients: selectedIngredients,
      };
    });
  };
  const successAlert = () => {
    Alert.alert('Success', 'Maybe, move to home and find out', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setUpdate(update + 1);
          navigation.navigate('Home');
        },
      },
    ]);
  };

  const onSelectedItemsChange = (selectedItems) => {
    console.log('onSelectedItemsChange', selectedItems);
    setSelectedIngredients(selectedItems);
  };

  const uploadRecipe = async (inputs) => {
    try {
      setInputs((inputs) => {
        return {
          ...inputs,
          ingredients: selectedIngredients,
        };
      });
      const recipeData = await postRecipe(inputs);
      console.log('upload recipe data', recipeData);
      successAlert();
    } catch (error) {
      console.log('upload recipe error', error);
    }
  };

  //use useEffect if promise is returned.
  useEffect(() => {
    (async () => {
      try {
        setIngredients(await getIngredients());
      } catch (error) {
        console.log('upload error', error);
      }
    })();
  }, []);

  console.log('ingredients list', inputs);

  const name = ingredients.map((item) => {
    item.name = item.ingredientName;
  });
  const multilistItem = {
    options: name,
  };
  return (
    <ScrollView>
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
        <View>
          <Text h4>Choose ingredients</Text>
          {ingredients.length > 0 && (
            <MultiSelect
              items={ingredients}
              onSelectedItemsChange={onSelectedItemsChange}
              uniqueKey="id"
              selectedItems={selectedIngredients}
            ></MultiSelect>
          )}
        </View>
        <Button title="Upload" onPress={() => uploadRecipe()}></Button>
      </Card>
    </ScrollView>
  );
};

/*<ScrollView style={styles.ingredientsScroll}>
            {ingredients.map((l, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={() =>
                  Alert.alert('Ingredient pressed', l.ingredientName)
                }
              >
                <ListItem.Content>
                  <ListItem.Title>{l.ingredientName}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  ingredientsScroll: {
    flex: 1,
    height: 200,
    flexDirection: 'column',
    maxHeight: '100%',
    flexGrow: 0,
    marginBottom: 20,
  },
});
Upload.propTypes = {
  navigation: PropTypes.object,
};
export default Upload;
