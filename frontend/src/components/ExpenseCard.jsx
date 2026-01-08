import { deleteExpense } from "../features/expense/expenseApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExpenseCard = ({
  expense = {
    title: "Groceries",
    amount: 1200,
    category: "Food",
    date: "2025-01-01",
  },
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/expenses/edit/${expense.id}`);
  };

  const handleDelete = () => {
    dispatch(deleteExpense(expense.id));
  };


  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{expense.title}</h3>
        <p className="text-sm text-gray-500">
          {expense.category_name} • {expense.date}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-bold text-red-500">₹{expense.amount}</span>
        <button className="text-blue-500 cursor-pointer" onClick={handleEdit}>Edit</button>
        <button className="text-red-500 cursor-pointer" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ExpenseCard;
