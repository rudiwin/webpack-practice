import * as model from './model';
import recipeView from './views/recipeView';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // 1. Load recipe from API
    await model.loadRecipe(id);

    // 2. Render recipe to the DOM
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};

export { init };
