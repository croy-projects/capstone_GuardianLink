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
                    <div className="form-group">
                        <label htmlFor="name">NGO Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="areaOfConcern">Area of Concern</label>
                        <textarea
                            type="text"
                            name="areaOfConcern"
                            placeholder="Describe your cybersecurity concerns..."
                            value={form.areaOfConcern}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default RegisterNGO;