import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Foods from './components/foods/Foods';
import Drinks from './components/drinks/Drinks';
import FoodInProgress from './components/foods/FoodInProgress';
import DrinkInProgress from './components/drinks/DrinkInProgress';
import Explore from './components/explore/Explore';
import ExploreFoods from './components/explore/ExploreFoods';
import ExploreDrinks from './components/explore/ExploreDrinks';
import FoodsIngredients from './components/explore/FoodsIngredients';
import DrinksIngredients from './components/explore/DrinksIngredients';
import FoodsNationalities from './components/explore/FoodsNationalities';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Foods } />
        <Route path="/drinks" component={ Drinks } />
        <Route path={ `/foods/${'...'}` } component={ Foods } />
        <Route path={ `/drinks/${'...'}` } component={ Drinks } />
        <Route path={ `/foods/${'...'}/in-progress` } component={ FoodInProgress } />
        <Route path={ `/drinks/${'...'}/in-progress` } component={ DrinkInProgress } />
        <Route path="/explore" component={ Explore } />
        <Route path="/explore/foods" component={ ExploreFoods } />
        <Route path="/explore/drinks" component={ ExploreDrinks } />
        <Route path="/explore/foods/ingredients" component={ FoodsIngredients } />
        <Route path="/explore/drinks/ingredients" component={ DrinksIngredients } />
        <Route path="/explore/foods/nationalities" component={ FoodsNationalities } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
