import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authApi";
import { selectAuthUser } from "../features/auth/authSelector";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Tracker</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm">
          Hello, {user?.name || user?.email || "User"}
        </span>
        <button
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
