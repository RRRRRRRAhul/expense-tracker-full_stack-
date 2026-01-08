import { fetchFromApi } from "../../service/api";
import {
  expenseStart,
  expenseDetailSuccess,
  expenseFailure,
  expenseListSuccess,
} from "./expenseSlice";

export const fetchExpenses = (page = 1) => async (dispatch) => {
  try {
    dispatch(expenseStart());

    // full correct path
    const data = await fetchFromApi(
      `/expense/expenses/?page=${page}&page_size=10`
    );

    dispatch(
      expenseListSuccess({
        results: data.results || [],
        count: data.count || 0,
      })
    );
  } catch (error) {
    dispatch(
      expenseFailure(
        error.response?.data?.detail || "Failed to load expenses"
      )
    );
  }
};


// Fetch single expense by ID
export const fetchExpenseById = (id) => async (dispatch) => {
  try {
    dispatch(expenseStart());

    const data = await fetchFromApi(`/expense/expenses/${id}/`);

    dispatch(expenseDetailSuccess(data));
  } catch (error) {
    dispatch(
      expenseFailure(error.response?.data?.detail || "Failed to load expense")
    );
  }
};

// Create a new expense
export const createExpense = (expenseData) => async (dispatch, getState) => {
  try {
    dispatch(expenseStart());

    await fetchFromApi("/expense/expenses/", {
      method: "POST",
      body: expenseData,
    });

    const { currentPage } = getState().expenses;
    dispatch(fetchExpenses(currentPage));
  } catch (error) {
    dispatch(
      expenseFailure(error.response?.data?.detail || "Failed to create expense")
    );
  }
};

// Update an expense
export const updateExpense = (id, expenseData) => async (dispatch, getState) => {
  try {
    dispatch(expenseStart());

    await fetchFromApi(`/expense/expenses/${id}/`, {
      method: "PUT",
      body: expenseData,
    });

    const { currentPage } = getState().expenses;
    dispatch(fetchExpenses(currentPage));
  } catch (error) {
    dispatch(
      expenseFailure(error.response?.data?.detail || "Failed to update expense")
    );
  }
};

// Delete an expense
export const deleteExpense = (id) => async (dispatch, getState) => {
  try {
    dispatch(expenseStart());

    await fetchFromApi(`/expense/expenses/${id}/`, {
      method: "DELETE",
    });

    const { currentPage } = getState().expenses;
    dispatch(fetchExpenses(currentPage));
  } catch (error) {
    dispatch(
      expenseFailure(error.response?.data?.detail || "Failed to delete expense")
    );
  }
};
