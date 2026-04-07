// React Router handles page navigation without reload
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateUser from "../components/CreateUser";

import Home from "../pages/Home";
import Admin from "../pages/DashboardAdmin";


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
          <Route path="/admin" element={<Admin />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Routes>

        <Footer />
      </>
    </BrowserRouter>
  );
}
export default App;