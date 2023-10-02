import './assets/fonts/fonts.css';
import './sass/main.scss';
import icons from './assets/images/icons.svg';

import * as model from './app/model';
import recipeView from './app/views/recipeView';

const recipeContainer = document.querySelector('.recipe');

const renderSpinner = function () {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    renderSpinner();
    // 1. Load recipe from API
    await model.loadRecipe(id);

    // 2. Render recipe to the DOM
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

['load', 'hashchange'].forEach(ev => window.addEventListener(ev, showRecipe));
