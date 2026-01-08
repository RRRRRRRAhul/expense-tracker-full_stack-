import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../features/categories/categoryApi";
import { selectCategoryLoading } from "../features/categories/categorySelector";

const CategoryForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectCategoryLoading);

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    dispatch(createCategory({ name }));
    setName("");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow flex gap-2"
    >
      <input
        className="flex-1 border p-2 rounded"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 rounded"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default CategoryForm;
