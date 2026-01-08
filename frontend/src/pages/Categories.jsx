import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import Modal from "../components/Modal";

import { fetchCategories } from "../features/categories/categoryApi";
import {
  selectCategories,
  selectCategoryLoading,
  selectCategoryError,
} from "../features/categories/categorySelector";

const Categories = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && <CategoryList categories={categories} />}

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <CategoryForm onClose={() => setOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Categories;
