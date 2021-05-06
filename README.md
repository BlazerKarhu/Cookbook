# Cookbook
SSSF-Project  
Cookbook application to share recipes  
Currently login/register and uploading recipes work
## Link to server  
https://jtm-sssf.jelastic.metropolia.fi/graphql  Might not work  
## Expo QR  
![image](https://user-images.githubusercontent.com/33052692/116972180-50417780-acc3-11eb-9bb5-0e102c8c6c8f.png)

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
    username
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
