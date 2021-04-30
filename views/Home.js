import React from 'react';
import {Button, StyleSheet, Text, View, Pressable} from 'react-native';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import {ListItem} from 'react-native-elements';
import {gql, useQuery} from '@apollo/client';
import Loading from './Loading';

const RECIPE_QUERY = gql`
  {
    recipes {
      id
      recipeName
      category
    }
  }
`;

const RecipeItem = ({recipe}) => {
  const {recipeName, category} = recipe;
  let header, subheader;

  if (recipeName) {
    header = `Recipe ${recipeName}`;
    subheader = category;
  } else {
    header = recipeName;
  }

  return (
    <Pressable style={styles.item}>
      <Text>{header}</Text>
      {subheader && <Text>{subheader}</Text>}
    </Pressable>
  );
};

const Home = ({navigation}) => {
  const {data, loading} = useQuery(RECIPE_QUERY);
  console.log('query data', data);
  console.log('Home');
  if (loading) {
    return <Loading />;
  }
  console.log('Home done loading');
  return (
    <View style={styles.container}>
      <ListItem>
        <Card></Card>
        <Text>Fuck</Text>
        <Button
          title="Click Me"
          onPress={() => navigation.navigate('Recipe Info')}
        ></Button>
      </ListItem>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};
