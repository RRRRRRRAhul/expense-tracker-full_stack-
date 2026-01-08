import { fetchFromApi } from "../../service/api";
import {
  categoryStart,
  categoryListSuccess,
  categoryDetailSuccess,
  categoryFailure,
} from "./categorySlice";

// Fetch all categories
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(categoryStart());

    const data = await fetchFromApi("/expense/categories/");

    // ✅ ALWAYS extract array
    dispatch(categoryListSuccess(data?.results ?? []));
  } catch (error) {
    dispatch(
      categoryFailure(
        error.response?.data?.detail || "Failed to load categories"
      )
    );
  }
};

// Fetch single category
export const fetchCategoryById = (id) => async (dispatch) => {
  try {
    dispatch(categoryStart());

    const data = await fetchFromApi(`/expense/categories/${id}/`);

    dispatch(categoryDetailSuccess(data));
  } catch (error) {
    dispatch(
      categoryFailure(
        error.response?.data?.detail || "Failed to load category"
      )
    );
  }
};

// Create category
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch(categoryStart());

    await fetchFromApi("/expense/categories/", {
      method: "POST",
      body: categoryData,
    });

    dispatch(fetchCategories());
  } catch (error) {
    dispatch(
      categoryFailure(
        error.response?.data?.detail || "Failed to create category"
      )
    );
  }
};

// Delete category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(categoryStart());

    await fetchFromApi(`/expense/categories/${id}/`, {
      method: "DELETE",
    });

    dispatch(fetchCategories());
  } catch (error) {
    dispatch(
      categoryFailure(
        error.response?.data?.detail || "Failed to delete category"
      )
    );
  }
};
