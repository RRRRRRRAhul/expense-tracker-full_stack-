import { createSelector } from "@reduxjs/toolkit";
import { selectExpenses as selectExpensesState } from "./expenseSelector";

export const selectExpenses = selectExpensesState;

export const selectTotalExpenseAmount = createSelector(
    [selectExpenses],
    (expenses) => {
        return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    }
);

export const selectExpensesCount = createSelector(
    [selectExpenses],
    (expenses) => expenses.length
);

export const selectHighestExpense = createSelector(
  [selectExpenses],
  (expenses) =>
    expenses.length === 0
      ? 0
      : Math.max(...expenses.map((e) => Number(e.amount || 0)))
);

export const selectRecentExpenses = createSelector(
  [selectExpenses],
  (expenses) =>
    [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
);

export const selectAverageExpenseAmount = createSelector(
    [selectExpenses],
    (expenses) => {
        if (expenses.length === 0) return 0;
        const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
        return total / expenses.length;
    }
);