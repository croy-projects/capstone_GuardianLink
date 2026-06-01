import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from "../config/roles";
import { useAuth } from "./AuthContext";
import "../styles/navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo">GuardianLink</div>
            <div
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "✖" : "☰"}
            </div>
            <ul className={menuOpen ? "nav-links active" : "nav-links"}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                {!user ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                ) : (
                    <>
                        {/* Role-based dashboard */}
                        {user.role_id === ROLES.ADMIN && (
                            <li><Link to="/dashboard-admin">Dashboard</Link></li>
                        )}

                        {user.role_id === ROLES.NGO && (
                            <li><Link to="/dashboard-ngo">Dashboard</Link></li>
                        )}

                        {user.role_id === ROLES.VOLUNTEER && (
                            <li><Link to="/dashboard-volunteer">Dashboard</Link></li>
                        )}
                        <li><Link to="profile-user">Profile</Link></li>
                        <li><button type="button" className="link-button" onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;