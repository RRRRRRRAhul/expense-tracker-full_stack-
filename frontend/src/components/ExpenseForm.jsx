import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/categoryApi";
import { selectCategories } from "../features/categories/categorySelector";

const ExpenseForm = ({ initialData, onSubmit, isEdit }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        amount: initialData.amount || "",
        category: initialData.category || "",
        date: initialData.date || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      category: Number(formData.category), // ✅ ensure ID is number
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        placeholder="Title"
        required
      />

      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        placeholder="Amount"
        required
      />

      {/* ✅ CATEGORY DROPDOWN */}
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {isEdit ? "Update Expense" : "Save Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
