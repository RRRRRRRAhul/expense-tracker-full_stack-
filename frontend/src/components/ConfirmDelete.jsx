const ConfirmDelete = ({ onConfirm, onCancel }) => {
  return (
    <div className="space-y-4">
      <p>Are you sure you want to delete?</p>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-1 border rounded">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-1 bg-red-600 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
