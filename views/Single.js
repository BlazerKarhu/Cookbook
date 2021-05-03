import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-elements';
import PropTypes from 'prop-types';

//console.log(instructions);
const Single = ({route}) => {
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
          flexGrow: 1,
        },
      ]}
    >
      <Card style={{flex: 1, flexGrow: 1}}>
        <Card.Title>{recipe.recipeName}</Card.Title>
        <Card.Divider />
        <Card.Image></Card.Image>
        <Text>Category: {recipe.category}</Text>
        <View
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            flexShrink: 1,
            padding: 10,
            marginBottom: 20,
          }}
        >
          <View style={{flex: 1, flexGrow: 1, paddingRight: 20}}>
            <Text h4>Ingredients</Text>
            <Text>Here would be a list of ingredients</Text>
          </View>
          <View style={{flex: 1, flexGrow: 1}}>
            <Text h4>Instructions</Text>
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
    flexGrow: 1,
    width: '100%',
    alignSelf: 'center',
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
