import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import DoneRecipes from './components/DoneRecipes';
import DrinkInProgress from './components/drinks/DrinkInProgress';
import Drinks from './components/drinks/Drinks';
import DrinksIngredients from './components/explore/DrinksIngredients';
import Explore from './components/explore/Explore';
import ExploreDrinks from './components/explore/ExploreDrinks';
import ExploreFoods from './components/explore/ExploreFoods';
import FoodsIngredients from './components/explore/FoodsIngredients';
import FoodsNationalities from './components/explore/FoodsNationalities';
import FavoriteRecipes from './components/FavoriteRecipes';
import FoodInProgress from './components/foods/FoodInProgress';
import Foods from './components/foods/Foods';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path={ `/foods/${'...'}` } component={ Foods } />
        <Route exact path={ `/drinks/${'...'}` } component={ Drinks } />
        <Route path={ `/foods/${'...'}/in-progress` } component={ FoodInProgress } />
        <Route path={ `/drinks/${'...'}/in-progress` } component={ DrinkInProgress } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
        <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsNationalities }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
