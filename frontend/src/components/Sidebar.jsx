import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-40 bg-gray-900 text-white min-h-screen p-5">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/expenses" className="hover:text-blue-400">
            Expenses
          </Link>
        </li>
        <li>
          <Link to="/categories" className="hover:text-blue-400">
            Categories
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
