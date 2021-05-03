import {Alert} from 'react-native';

const fetchGraphql = async (query) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(query),
  };
  try {
    const response = await fetch(
      'https://jtm-sssf.jelastic.metropolia.fi/graphql',
      options
    );
    const json = await response.json();
    console.log('response json', json.data);
    return json.data;
  } catch (e) {
    console.log('fetchGraphql error', e);
    return false;
  }
};

const useRecipe = (inputs) => {
  const getRecipes = async () => {
    const query = {
      query: `
            {
              recipes {
                id
                recipeName
                category
              }
            }`,
    };
    const data = await fetchGraphql(query);
    console.log(data);
    return data.recipes;
  };

  const postRecipe = async () => {
    const recipe = {
      recipeName: inputs.recipeName,
      instructions: inputs.instructions,
      ingredients: inputs.ingredients,
      category: inputs.category,
    };
    const query = {
      query: `
      mutation munHaku(
        $recipeName: String!
        $instructions: String
        $ingredients: [ID!]
        $category: String
      ) {
        addRecipe(
          recipeName: $recipeName
          instructions: $instructions
          ingredients: $ingredients
          category: $category
        ) {
          id
        }
      }
    `,
      variables: JSON.stringify(recipe),
    };
    console.log('postRecipe query', query);
    const data = await fetchGraphql(query);
    console.log('post recipe data', data);
    return data?.recipe;
  };
  return {getRecipes, postRecipe};
};

const getIngredients = async () => {
  const query = {
    query: `
    {
      ingredients {
        id
        ingredientName
      }
    }`,
  };
  const data = await fetchGraphql(query);
  return data.ingredients;
};

const postIngredient = async () => {
  const query = {
    query: `
    mutation {
      addIngredient(ingredientName:"Chicken Breast", grams:300) {
        ingredientName
        grams
      }
    }
    `,
  };
  const data = await fetchGraphql(query);
  console.log(data);
  return data.ingredient;
};

const useLogin = (inputs) => {
  const postLogin = async () => {
    const query = {
      query: `
              {
                login(
                  username: "${inputs.username}",
                  password: "${inputs.password}") {
                    token
                }
              }`,
    };
    const data = await fetchGraphql(query);
    return data.login;
  };
  /*const postLogin = async () => {
    const query = {
      query: `
              {
                login(
                  username: "Joonas4",
                  password: "Mielonen1") {
                    token
                }
              }`,
    };
    const data = await fetchGraphql(query);
    return data.login;
  };*/

  const checkToken = async (token) => {
    try {
      console.log('This is not implemented');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {postLogin, checkToken};
};

const useRegister = (inputs) => {
  const postRegister = async () => {
    console.log('trying to create user', inputs);
    try {
      const registerInputs = {
        username: inputs.username,
        password: inputs.password,
        full_name: inputs.full_name,
      };
      const query = {
        query: `
        mutation register(
          $username: String!
          $password: String!
          $full_name: String
        ) {
          registerUser(
            username: $username
            password: $password
            full_name: $full_name
          ) {
            id
          }
        }
      `,
        variables: JSON.stringify(registerInputs),
      };

      const data = await fetchGraphql(query);
      if (data.registerUser === null) {
        Alert.alert('Try with different username');
        return;
      }
      Alert.alert('Register success');
      return data.register;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {postRegister};
};

export {useRecipe, getIngredients, postIngredient, useLogin, useRegister};
