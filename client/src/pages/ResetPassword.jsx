import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { validatePassword } from "../utils/validation";

import "../styles/reset.css";

function ResetPassword() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault(); // "Prevent page reloads immediately
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const validationError = validatePassword(password);
            if (validationError) {
                setError(validationError);
                return;
            }
            await resetPassword(id, password);
            setSuccess("Password updated successfully!");
            setTimeout(() => navigate("/dashboard-admin"), 1500); // go back to dashboard 

        } catch (err) {

            setError('Reset password failed. Please try again.');

        } finally {
            setLoading(false);
        }

    };
    if (loading) return <p>Loading...</p>;
    return (
        <div className="reset-container">
            <div className="reset-card">
                <h2>Reset Password</h2>
                <p className="reset-subtitle">
                    Enter new password below.
                </p>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>

                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />
                    <div className="button-group">
                        <button type="button" className="btn-cancel" onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/")}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-action">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;