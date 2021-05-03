import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {gql, useQuery} from '@apollo/client';
import Loading from './Loading';
import {FlatList} from 'react-native';
import styles from './Styles';
import {TouchableOpacity} from 'react-native';
import {useRecipe} from '../hooks/fetchGQL';
import {MainContext} from '../contexts/MainContext';

const Home = ({navigation}) => {
  const {update} = useContext(MainContext);
  const {getRecipes} = useRecipe();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setRecipes(await getRecipes());
      } catch (error) {
        console.log('upload error', error);
      }
    })();
  }, [update]);
  try {
    const {data, error, loading} = useQuery(RECIPE_QUERY);
    console.log('data in home', data);
    if (loading) {
      return <Loading />;
    }
    return (
      <View>
        <FlatList
          data={recipes}
          keyExtractor={(recipe) => recipe.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Recipe Info', {data: item})}
            >
              <RecipeItem recipe={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  } catch (error) {
    console.error(error);
  }
};

const RECIPE_QUERY = gql`
  query {
    recipes {
      id
      recipeName
      instructions
      category
      ingredients {
        ingredientName
        grams
        nutrients {
          id
        }
      }
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
    <View style={styles.item}>
      <Text style={styles.header}>{header}</Text>
      {subheader && <Text style={styles.subheader}>{subheader}</Text>}
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};
/**/
export default Home;
