import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/authService";
import { ROLES } from "../config/roles";
import { useAuth } from "./AuthContext";
import "../styles/login.css";

function Login() {
    const navigate = useNavigate();

    const { user, login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault(); // "Prevent page reloads immediately
        setError("");
        setLoading(true);
        try {

           const data = await loginUser(form);
            // Store token
            login(data.token); 

            // Decode token to get role
            const user = jwtDecode(data.token);

            // Redirect based on role
            if (user.role_id === ROLES.ADMIN ) {
                navigate("/dashboard-admin");
            } else if (user.role_id === ROLES.NGO) {
                navigate("/dashboard-ngo");
            } else if (user.role_id === ROLES.VOLUNTEER) {
                navigate("/dashboard-volunteer");
            } else {
                navigate("/");
            }

        } catch (err) {
            console.log("err", err);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-card">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
export default Login;