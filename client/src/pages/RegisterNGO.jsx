import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNGO } from "../services/authService";
import "../styles/register.css";

function RegisterNGO() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        areaOfConcern: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.name || !form.email || !form.password || !form.areaOfConcern) {
            return "Please fill in all required fields";
        }

        if (form.password.length < 6) {
            return "Password must be at least 6 characters";
        }

        if (form.password !== form.confirmPassword) {
            return "Passwords do not match";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        await registerNGO(form);
        setSuccess("NGO registered successfully!");
        setTimeout(() => navigate("/login"), 1500); // go back to login 

    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>NGO Registration</h2>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="NGO Name *"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password *"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password *"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="areaOfConcern"
                        placeholder="Area of Concern"
                        value={form.areaOfConcern}
                        onChange={handleChange}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default RegisterNGO;