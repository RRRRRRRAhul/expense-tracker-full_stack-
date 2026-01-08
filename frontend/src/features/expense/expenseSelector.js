export const selectExpenses = (state) => state.expenses.items;
export const selectExpenseLoading = (state) => state.expenses.loading;
export const selectExpenseError = (state) => state.expenses.error;

export const selectExpenseCount = (state) => state.expenses.count;

export const selectCurrentExpense = (state) =>
  state.expenses.currentExpense;
