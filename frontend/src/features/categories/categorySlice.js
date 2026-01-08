import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],          // list of categories
  loading: false,
  error: null,
  currentCategory: null, // single category (optional use)
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    categoryListSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload; // ✅ payload is an array
    },

    categoryDetailSuccess: (state, action) => {
      state.loading = false;
      state.currentCategory = action.payload; // ✅ single object
    },

    categoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
  },
});

export const {
  categoryStart,
  categoryListSuccess,
  categoryDetailSuccess,
  categoryFailure,
  clearCurrentCategory,
} = categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
