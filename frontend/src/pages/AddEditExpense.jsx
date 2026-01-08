import ExpenseForm from "../components/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenseById,
  createExpense,
  updateExpense,
} from "../features/expense/expenseApi";
import { selectCurrentExpense } from "../features/expense/expenseSelector";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddEditExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEdit = Boolean(id);

  const expense = useSelector(selectCurrentExpense);

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchExpenseById(id));
    }
  }, [dispatch, isEdit, id]);

  const handleSubmit = (formData) => {
    if (isEdit) {
      dispatch(updateExpense(id, formData));
    } else {
      dispatch(createExpense(formData));
    }
    navigate("/expenses");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-black">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Expense" : "Add Expense"}
      </h1>

      <ExpenseForm
        initialData={isEdit ? expense : null}
        onSubmit={handleSubmit}
        isEdit={isEdit}
      />
    </div>
  );
};

export default AddEditExpense;
