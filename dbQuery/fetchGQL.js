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
    const response = await fetch('http://localhost:3000/graphql', options);
    const json = await response.json();
    console.log(json.data);
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

export {getRecipes};
