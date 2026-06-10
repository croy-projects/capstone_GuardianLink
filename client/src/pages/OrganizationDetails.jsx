import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../components/AuthContext";
import { ROLES } from "../config/roles";
import { getNGOById } from "../services/userService";

import "../styles/detail.css";

function OrganizationDetails() {
    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();
    const isAdmin = user?.role_id === ROLES.ADMIN;
    const isNGO = user?.role_id === ROLES.NGO;

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [organization, setOrganization] = useState(null);

    // [id]  that effect will re-run whenever id changes.  When no dependency array runs every render;
    useEffect(() => {
        
        if (!user) return;
        
        const fetchData = async () => {
            try {
                const organization = await getNGOById(id);

                setOrganization(organization);

            } catch (err) {
                setError("Failed to load detail.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [id]);

    if (loading) return <p>Loading...</p>;

    if (!organization) return <p>No organization found</p>;
    return (
        <div className="volunteer-details-page">
            <div className="detail-header">
                {error && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
            </div>
            <div className="profile-header-card">

                <div className="header-main-ngo">

                    <div className="avatar">
                        {organization.name?.charAt(0)}
                    </div>

                    <div className="identity-section">
                        <h2>{organization.name}</h2>
                        <p>{organization.email}</p>
                    </div>
                    <div className="quick-info">
                        <div className="info-pill">
                            <span className="label">Area of concern</span>
                            <span>{organization.area_of_concern}</span>
                        </div>
                    </div>

                </div>

                <div className="header-actions">
                    <button
                        type="button"
                        className="btn-back btn-action"
                        onClick={() =>
                            window.history.length > 1
                                ? navigate(-1)
                                : navigate("/")
                        }
                    >
                        Back
                    </button>
                </div>

            </div>
        </div>
    );
}

export default OrganizationDetails;