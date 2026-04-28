import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ROLES } from "../config/roles";
import { useAuth } from "./AuthContext";
function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav>
            <div>GuardianLink</div>
            <ul>
                <li><Link to="/">Home</Link></li>
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
                        <li><button className="link-button" onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;