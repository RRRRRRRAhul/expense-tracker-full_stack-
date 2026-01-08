export const selectCategories = (state) => state.categories.items;
export const selectCategoryLoading = (state) => state.categories.loading;
export const selectCategoryError = (state) => state.categories.error;
export const selectCurrentCategory = (state) =>
  state.categories.currentCategory;
