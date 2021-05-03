# Cookbook
SSSF-Project
## Link to server  
https://jtm-sssf.jelastic.metropolia.fi/graphql  Might not work  
![image](https://user-images.githubusercontent.com/33052692/116920595-84814d80-ac5b-11eb-94da-68344b5297f2.png)

## Sample Queries
### Register user
```
mutation{
  registerUser(
    username: "someUsername", 
    password: "somePassword",
    full_name: "someFullName"
  )
  {
    id
  }
}
```
### Login
```
{
  login(username: "someUserName", password: "somePassword") {
    token
  }
}
```
### Get Recipes
```
{
  recipes {  
    id  
    recipeName  
    instructions  
    category  
    ingredients {  
      id  
      ingredientName  
      grams  
      nutrients {  
        energykcal  
        protein  
        carbs  
        sugars  
        fat  
        fibers  
      }
    }
  }
}
```
### Post a new Recipe
```
mutation {
  addRecipe(
    recipeName: "Recipe name"
    instructions: "Recipe instructions"
    category: Has to be "Dessert, Appetizer, Main Dish, Salad, Meat, Soup, Vegan"
    ingredients: ["SomeIngredientID", "SomeOtherIngredientID"]
  ) {
    id
    recipeName
  }
}


```
### Get Ingredients
```
{
  ingredients {
    id
    ingredientName
    grams
    nutrients {
        energykcal
        protein
        carbs
        sugars
        fat
        fibers
      }
  }
}
```
### Add Ingredients
```
mutation {
  addIngredient(
    ingredientName: "SomeIngredientName"
    grams: 300
    nutrients: "someNutrientsId"
  ) {
    ingredientName
    grams
    nutrients {
      id
    }
  }
}
```
