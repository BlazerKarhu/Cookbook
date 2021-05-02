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
    const response = await fetch('http://localhost:4000/graphql', options);
    const json = await response.json();
    console.log('response json', json.data);
    return json.data;
  } catch (e) {
    console.log(e);
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
                login(username: "${username}", password: "${password}") {
                  token
                }
              }`,
    };
    const data = await fetchGraphql(query);
    console.log(data);
    return data.login;
  };

  const checkToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const response = await fetch(baseUrl + 'users/user', options);
      const userData = response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
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
