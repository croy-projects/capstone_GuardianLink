// React Router handles page navigation without reload
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page components
import Home from "../pages/Home";

// Main App component
export default function App() {
  return (
    // BrowserRouter enables routing in the app
    <BrowserRouter>
      {/* Routes is a container for all routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}