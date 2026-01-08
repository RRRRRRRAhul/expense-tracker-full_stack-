import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteCategory } from "../features/categories/categoryApi";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";

const CategoryList = ({ categories = [] }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirm = () => {
    dispatch(deleteCategory(selectedId));
    setOpen(false);
    setSelectedId(null);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedId(null);
  };

  if (!Array.isArray(categories)) {
    return <p className="text-red-500">Invalid categories data</p>;
  }

  if (categories.length === 0) {
    return <p className="text-gray-500">No categories added yet.</p>;
  }


  return (
    <>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <span>{cat.name}</span>

            <button
              onClick={() => handleDeleteClick(cat.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <Modal onClose={handleCancel}>
          <ConfirmDelete
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </Modal>
      )}
    </>
  );
};

export default CategoryList;
