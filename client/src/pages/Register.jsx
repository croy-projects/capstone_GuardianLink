import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
    const navigate = useNavigate();

    return (
        <div className="register-page">
            <div className="register-selection-container">
                <h1>Join GuardianLink</h1>
                <p>Select how you'd like to get started</p>

                <div className="card-container">
                    {/* Volunteer Card */}
                    <div className="card">
                        <h2>Become a Volunteer</h2>
                        <p>Offer your cybersecurity expertise to help NGOs in need.</p>
                        <button onClick={() => navigate("/register-volunteer")}>
                            Register as Volunteer
                        </button>
                    </div>

                    {/* NGO Card */}
                    <div className="card">
                        <h2>Request Help</h2>
                        <p>Register your organization to receive cybersecurity support.&nbsp;&nbsp;</p>
                        <button onClick={() => navigate("/register-ngo")}>
                            Register as NGO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;