import { Routes, Route, BrowserRouter as Router, Outlet } from "react-router-dom";

/* Pages */
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expense";
import Categories from "./pages/Categories";
import AddEditExpense from "./pages/AddEditExpense";

/* Components */
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

/* Auth pages (create later if not yet) */
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./features/auth/authApi";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <>
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 p-6">
                    {/*  Outlet renders child routes */}
                    <Outlet />
                  </main>
                </div>
              </>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/add" element={<AddEditExpense />} />
            <Route path="/expenses/edit/:id" element={<AddEditExpense />} />
            <Route path="/categories" element={<Categories />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
