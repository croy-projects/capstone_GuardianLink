// React Router handles page navigation without reload
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateUser from "../components/CreateUser";
import EditUser from "../components/EditUser";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Home from "../pages/Home";
import DashboardAdmin from "../pages/DashboardAdmin";
import Register from "../pages/Register";
import RegisterNGO from "../pages/RegisterNGO";
import RegisterVolunteer from "../pages/RegisterVolunteer";
import DashboardNGO from "../pages/DashboardNGO";
import DashboardVolunteer from "../pages/DashboardVolunteer";

// Main App component
function App() {
  return (
    // BrowserRouter enables routing in the app
    <BrowserRouter>
      <>
        <Navbar />

        {/* Routes is a container for all routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-ngo" element={<RegisterNGO />} />
          <Route path="/register-volunteer" element={<RegisterVolunteer />} />
          <Route path="/dashboard-ngo" element={
            <ProtectedRoute>
              <DashboardNGO />
            </ProtectedRoute>
          } />
          <Route path="/dashboard-volunteer" element={
            <ProtectedRoute>
              <DashboardVolunteer />
            </ProtectedRoute>
          } />          
          <Route path="/dashboard-admin" element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          } />
          <Route path="/create-user" element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          } />
          <Route path="/edit-user/:id" element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          } />

        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}
export default App;