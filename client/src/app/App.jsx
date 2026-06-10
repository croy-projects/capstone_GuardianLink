// React Router handles page navigation without reload
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROLES } from "../config/roles";

// Page components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateUser from "../components/CreateUser";
import EditUser from "../components/EditUser";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Home from "../pages/Home";
import AboutUs from "../pages/About";
import DashboardAdmin from "../pages/DashboardAdmin";
import Register from "../pages/Register";
import RegisterNGO from "../pages/RegisterNGO";
import RegisterVolunteer from "../pages/RegisterVolunteer";
import DashboardNGO from "../pages/DashboardNGO";
import DashboardVolunteer from "../pages/DashboardVolunteer";
import VolunteerDetails from "../pages/VolunteerDetails";
import OrganizationDetails from "../pages/OrganizationDetails";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";

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
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-ngo" element={<RegisterNGO />} />
          <Route path="/register-volunteer" element={<RegisterVolunteer />} />
          <Route path="/dashboard-ngo" element={
            <ProtectedRoute allowedRoles={[ROLES.NGO]}>
              <DashboardNGO />
            </ProtectedRoute>
          } />
          <Route path="/volunteer-details/:id" element={
            <ProtectedRoute  allowedRoles={[ROLES.ADMIN, ROLES.NGO]} requireOwnership={true}>
              <VolunteerDetails />
            </ProtectedRoute>
          } />
          <Route path="/organization-details/:id" element={
            <ProtectedRoute  allowedRoles={[ROLES.ADMIN, ROLES.VOLUNTEER]} requireOwnership={true}>
              <OrganizationDetails />
            </ProtectedRoute>
          } />
          <Route path="/dashboard-volunteer" element={
            <ProtectedRoute  allowedRoles={[ROLES.VOLUNTEER]}>
              <DashboardVolunteer />
            </ProtectedRoute>
          } />          
          <Route path="/dashboard-admin" element={
            <ProtectedRoute  allowedRoles={[ROLES.ADMIN]}>
              <DashboardAdmin />
            </ProtectedRoute>
          } />
          <Route path="/create-user" element={
            <ProtectedRoute  allowedRoles={[ROLES.ADMIN]}>
              <CreateUser />
            </ProtectedRoute>
          } />
          <Route path="/edit-user/:id" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]} requireOwnership={true}>
              <EditUser />
            </ProtectedRoute>
          } />
          <Route path="/reset-password/:id" element={
            <ProtectedRoute  allowedRoles={[ROLES.ADMIN]}>
              <ResetPassword />
            </ProtectedRoute>
          } />

          <Route path="/profile-user" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]} requireOwnership={true}>
              <Profile />
            </ProtectedRoute>
          } />

        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}
export default App;