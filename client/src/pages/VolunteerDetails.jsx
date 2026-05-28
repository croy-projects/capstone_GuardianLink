import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVolunteerById, getVolunteerFile } from "../services/userService";
import "../styles/detail.css";

function VolunteerDetails() {
    const { id } = useParams();
    const [volunteer, setVolunteer] = useState(null);
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [fileResumeUrl, setFileResumeUrl] = useState(null);


    useEffect(() => {
        const fetchVolunteer = async () => {
            try {
                const data = await getVolunteerById(id);
                setVolunteer(data);

                // fetch protected resume file if exists
                if (data.resume) {
                    const fileBlob = await getVolunteerFile(id, data.resume);
                    const url = URL.createObjectURL(fileBlob);
                    setFileResumeUrl(url);
                }
            } catch (err) {
                setError("Failed to load detail.");
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteer();
        return () => {
            if (fileResumeUrl) URL.revokeObjectURL(fileResumeUrl);
        };
    }, [id]);

    if (loading) return <p>Loading...</p>;

    if (!volunteer) return <p>No volunteer found</p>;
    return (

        <div className="volunteer-details">

            <div className="info-section">
                <h2>{volunteer.name}</h2>
                <p><strong>Email:</strong> {volunteer.email}</p>
                <p><strong>Hours / Week:</strong> {volunteer.hours_by_week}</p>
                <div className="info-actions">
                    <button className="btn" onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/dashboard-ngo")}>Back</button>

                </div>
                <div className="error-message">
                    {error && <p>{error}</p>}
                </div>
            </div>

            <div className="resume-section">
                <div className="resume-header">Resume</div>

                {fileResumeUrl ? (
                    <div className="resume-preview">
                        <embed
                            src={fileResumeUrl}
                            type="application/pdf"
                            width="100%"
                            height="600px"
                        />
                    </div>
                ) : (
                    <p>No resume uploaded</p>
                )}

            </div>

        </div>
    );
}

export default VolunteerDetails;