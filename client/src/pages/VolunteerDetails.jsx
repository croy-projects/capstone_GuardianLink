import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVolunteerById } from "../services/userService";


function VolunteerDetails() {
    const { id } = useParams();
    const [volunteer, setVolunteer] = useState(null);
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVolunteer = async () => {
            try {
                const data = await getVolunteerById(id);
                setVolunteer(data);
            } catch (err) {
                setError("Failed to load detail.");
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteer();
    }, [id]);

    if (loading) return <p>Loading...</p>;


    if (!volunteer) return <p>No volunteer found</p>;
    return (
        <div className="volunteer-details">
            {error && <p className="error">{error}</p>}
            <div className="info-section">
                <h2>{volunteer.name}</h2>
                <p><strong>Email:</strong> {volunteer.email}</p>
                <p><strong>Hours / Week:</strong> {volunteer.hours_by_week}</p>
                <button className="btn-back" onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/dashboard-ngo")}>Back</button>
            </div>
            <div className="resume-section">
                <h3>Resume</h3>
                {volunteer.resume ? (
                    <embed
                        src={volunteer.resume ? `/uploads/${volunteer.resume}` : ""}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                    />
                ) : (
                    <p>No resume uploaded</p>
                )}
            </div>
        </div>
    );
}

export default VolunteerDetails;