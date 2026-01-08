import ExpenseList from "../components/ExpenseList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../features/expense/expenseApi";
import {
  selectRecentExpenses,
  selectAverageExpenseAmount,
  selectExpensesCount,
  selectHighestExpense,
  selectTotalExpenseAmount,
} from "../features/expense/expenseDerivedSelector";

const Dashboard = () => {
  const dispatch = useDispatch();
  const recentExpenses = useSelector(selectRecentExpenses);
  const totalExpenseAmount = useSelector(selectTotalExpenseAmount);
  const highestExpense = useSelector(selectHighestExpense);
  const expensesCount = useSelector(selectExpensesCount);
  const averageExpenseAmount = useSelector(selectAverageExpenseAmount);

  const summary = [
    { label: "Total Expenses", value: `₹${totalExpenseAmount.toFixed(2)}` },
    {
      label: "Highest Expense",
      value: highestExpense ? `₹${highestExpense.toFixed(2)}` : "N/A",
    },
    { label: "Number of Expenses", value: expensesCount },
    { label: "Average Expense", value: `₹${averageExpenseAmount.toFixed(2)}` },
  ];

  useEffect(() => {
    dispatch(fetchExpenses(1)); // Fetch first page of expenses
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summary.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-500">{item.label}</p>
            <p className="text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Recent Expenses */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Expenses</h2>

        <ExpenseList expenses={recentExpenses} />
      </div>
    </div>
  );
};

export default Dashboard;
