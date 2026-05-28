import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Foods from "../pages/Foods";
import Restaurants from "../pages/Restaurants";
import Orders from "../pages/Orders";
import Categories from "../pages/Categories";
import Offers from "../pages/Offers";
import Users from "../pages/Users";
import Reviews from "../pages/Reviews";
import Banners from "../pages/Banners";
import Settings from "../pages/Settings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

     <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

      <Route
        path="/foods"
        element={
          <ProtectedRoute>
          <AdminLayout>
            <Foods />
          </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurants"
        element={
           <ProtectedRoute>
          <AdminLayout>
            <Restaurants />
          </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
           <ProtectedRoute>
          <AdminLayout>
            <Orders />
          </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
           <ProtectedRoute>
          <AdminLayout>
            <Categories />
          </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/offers"
        element={
           <ProtectedRoute>
          <AdminLayout>
            <Offers />
          </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
           <ProtectedRoute>
          <AdminLayout>
            <Users />
          </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reviews"
        element={
           <ProtectedRoute>
          <AdminLayout>
            <Reviews />
          </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/banners"
        element={
           <ProtectedRoute>
          <AdminLayout>
            <Banners />
          </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
           <ProtectedRoute>
          <AdminLayout>
            <Settings />
          </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AdminRoutes;