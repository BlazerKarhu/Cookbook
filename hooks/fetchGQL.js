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
    const response = await fetch('http://192.168.1.142:4000/graphql', options);
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
    const query = {
      query: `
          mutation {
            addRecipe(
              recipeName: "${inputs.recipeName}",
              instructions: "${inputs.instructions}",
              category: "${inputs.category}") {
               id
      }
    }
    `,
    };
    const data = await fetchGraphql(query);
    console.log('post recipe data', data);
    return data.recipe;
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
  /*const postLogin = async () => {
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
  };*/
  const postLogin = async () => {
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
  };

  const checkToken = async (token) => {
    try {
      console.log('This is not implemented');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {postLogin, checkToken};
};

const useRegister = () => {
  const postRegister = async (inputs) => {
    console.log('trying to create user', inputs);
    const fetchOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    };
    try {
      const response = await fetch(baseUrl + 'users', fetchOptions);
      const json = await response.json();
      console.log('register result', json);
      if (response.ok) {
        return json;
      } else {
        throw new Error(json.message + ': ' + json.error);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {postRegister};
};

export {useRecipe, getIngredients, postIngredient, useLogin, useRegister};
