import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,

  // pagination
  count: 0,
  currentPage: 1,
  pageSize: 10,

  currentExpense: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    expenseStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    expenseListSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.results;
      state.count = action.payload.count;
    },

    expenseDetailSuccess: (state, action) => {
      state.loading = false;
      state.currentExpense = action.payload;
    },

    expenseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    clearCurrentExpense: (state) => {
      state.currentExpense = null;
    },
  },
});

export const {
  expenseStart,
  expenseListSuccess,
  expenseDetailSuccess,
  expenseFailure,
  setCurrentPage,
  clearCurrentExpense,
} = expenseSlice.actions;

const expenseReducer = expenseSlice.reducer;

export default expenseReducer;
