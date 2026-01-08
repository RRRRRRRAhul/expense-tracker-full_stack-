import { Link } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  selectExpenseCount,
  selectExpenseError,
  selectExpenseLoading,
  selectExpenses,
} from "../features/expense/expenseSelector";
import { fetchExpenses } from "../features/expense/expenseApi";
import { useEffect, useState } from "react";

const PAGE_SIZE = 10;

const Expenses = () => {
  const dispatch = useDispatch();

  // redux state
  const expenses = useSelector(selectExpenses);
  const loading = useSelector(selectExpenseLoading);
  const error = useSelector(selectExpenseError);
  const count = useSelector(selectExpenseCount);

  // local state
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchExpenses(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expenses</h1>

        <Link
          to="/expenses/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Expense
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500">Loading expenses...</div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-600">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && expenses.length === 0 && (
        <div className="text-center text-gray-500">
          No expenses found.
        </div>
      )}

      {/* Expense list */}
      {!loading && !error && expenses.length > 0 && (
        <ExpenseList expenses={expenses} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Expenses;
