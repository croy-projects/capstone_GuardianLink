import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerVolunteer } from "../services/authService";
import "../styles/register.css";

function RegisterVolunteer() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        hours: "",
        resume: null,
        backgroundCheck: null,
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.name || !form.email || !form.password || !form.hours) {
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

    const handleFileChange = (e) => {
        setError("");
        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
        
        const validExt = /\.(pdf|doc|docx)$/.test(file.name.toLowerCase());
        if (!allowedTypes.includes(file.type) || !validExt) {
            setError("Only PDF, DOC, DOCX allowed");
            e.target.value = null; // reset input
            return;
        }

        setForm({ ...form, [e.target.name]: e.target.files[0] })
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

        try {
            //create built-in JavaScript object (FormData) to send form data to a server for files
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("password", form.password);
            formData.append("confirmPassword", form.confirmPassword);
            formData.append("hours", form.hours);
            formData.append("resume", form.resume);
            formData.append("backgroundCheck", form.backgroundCheck);

            await registerVolunteer(formData);
            setSuccess("Volunteer registered successfully!");
            setTimeout(() => navigate("/login"), 1500); // go back to login 
        } catch (err) {
            //extract backend error message safely
            const message =
                err.message ||                 // generic error
                "Registration failed";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Volunteer Registration</h2>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name *"
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
                        name="hours"
                        placeholder="Hours available / Week"
                        value={form.hours}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                    />
                    <input
                        type="file"
                        name="backgroundCheck"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                    />                    
                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default RegisterVolunteer;