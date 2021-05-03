import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';

//console.log(instructions);
const Single = ({route}) => {
  const [ingredients, setIngredients] = useState([]);
  //console.log('route', route);
  //console.log('route params', route.params.data);
  const recipe = route.params.data;
  console.log('Single recipe data', recipe);
  console.log('Single recipe ingredients', recipe.ingredients);

  //const instructions = recipe.instructions.JSON.stringify();
  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}
    >
      <Card style={{flex: 1}}>
        <Card.Title>{recipe.recipeName}</Card.Title>
        <Card.Divider />
        <Card.Image></Card.Image>
        <Text>Category: {recipe.category}</Text>
        <View
          style={{flex: 1, flexDirection: 'row', padding: 10, marginBottom: 20}}
        >
          <View style={{flex: 1}}>
            <Text>Here would be a list of ingredients</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>{recipe.instructions}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

/*const RECIPE_QUERY = gql`
  query {
    recipe(id: ${item.id}) {
      id
      recipeName
      category
    }
  }
`;*/

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
Single.propTypes = {
  route: PropTypes.object,
};
export default Single;
