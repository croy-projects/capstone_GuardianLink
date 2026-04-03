// React Router handles page navigation without reload
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Page components
import Home from "../pages/Home";


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
        </Routes>

        <Footer />
      </>
    </BrowserRouter>
  );
}
export default App;