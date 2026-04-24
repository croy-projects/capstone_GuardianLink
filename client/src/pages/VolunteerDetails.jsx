import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVolunteerById } from "../services/userService";

function VolunteerDetails() {
    const { id } = useParams();
    const [volunteer, setVolunteer] = useState(null);

    useEffect(() => {
        const fetchVolunteer = async () => {
            const data = await getVolunteerById(id);
            setVolunteer(data);
        };

        fetchVolunteer();
    }, [id]);

    if (!volunteer) return <p>Loading...</p>;

    return (
        <div className="volunteer-details">
            <div className="info-section">
                <h2>{volunteer.name}</h2>
                <p><strong>Email:</strong> {volunteer.email}</p>
                <p><strong>Hours / Week:</strong> {volunteer.hours_by_week}</p>
            </div>
            <div className="resume-section">
                <h3>Resume</h3>
                {volunteer.resume ? (
                    <embed
                        src={`/uploads/${volunteer.resume}`}
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