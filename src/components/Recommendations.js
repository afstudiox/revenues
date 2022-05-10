import React, { useContext } from 'react';
import Slider from 'react-slick';
import RecipesContext from '../context/RecipesContext';
import CardRecommendations from './CardRecommendations';
import './recommendations.css';
import './Slick.css';
import './Slick2.css';

function Recommendations() {
  const { recommended } = useContext(RecipesContext);
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  console.log(recommended);
  return (
    <div className="carousel">
      <Slider { ...settings }>
        {
          recommended[0] !== undefined
        && recommended?.map((recipe, index) => (
          <CardRecommendations key={ index } recipe={ recipe } index={ index } /> // Cheguei :D
        ))
        }
      </Slider>
    </div>
  );
}

export default Recommendations;
