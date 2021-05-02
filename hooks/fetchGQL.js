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

const useLogin = () => {
  const postLogin = async (username, password) => {
    const query = {
      query: `
              {
                login(username: "Joonas4", password: "Mielonen1") {
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

export {getRecipes, useLogin, useRegister};
