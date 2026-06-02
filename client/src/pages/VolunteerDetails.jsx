import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../components/AuthContext";
import { ROLES } from "../config/roles";
import { getVolunteerById, getVolunteerFile } from "../services/userService";

import "../styles/detail.css";

function VolunteerDetails() {
    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();
    const isAdmin = user?.role_id === ROLES.ADMIN;
    const isVolunteer = user?.role_id === ROLES.VOLUNTEER;

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [volunteer, setVolunteer] = useState(null);

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [documentUrl, setDocumentUrl] = useState(null);

    const [documents, setDocuments] = useState({
        resume: null,
        backgroundCheck: null
    });

    const createdUrls = useRef([]);

    // [] empty - This effect does not depend on any state or props.  Run once at start. Cleanup when leaving the page.
    useEffect(() => {
        return () => {
            createdUrls.current.forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, []);

    // [id]  that effect will re-run whenever id changes.  When no dependency array runs every render;
    useEffect(() => {

        const fetchVolunteer = async () => {
            try {
                const data = await getVolunteerById(id);

                setVolunteer(data);

                //preview resume by default
                loadDocument(data.resume, "resume");

            } catch (err) {
                setError("Failed to load detail.");
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteer();

    }, [id]);


    const loadDocument = async (fileName, documentType) => {

        setSelectedDocument(documentType);

        if (!fileName) return;

        setError("");

        try {
            // fetch protected file if exists
            const fileBlob = await getVolunteerFile(id, fileName);

            const url = URL.createObjectURL(fileBlob);

            createdUrls.current.push(url);

            setDocuments(prev => ({
                ...prev, //copies everything already in the object.
                [documentType]: url  // square brackets are computed property name. let JavaScript decide the property name dynamically.
            }));

            //setSelectedDocument(documentType);
            setDocumentUrl(url);

        } catch (err) {
            setError(`Failed to load ${documentType}.`);
        }


    };

    const handleDocumentView = async (fileName, documentType) => {

        setSelectedDocument(documentType);

        if (!fileName) {
            setDocumentUrl(null);
            return;
        }

        // Already downloaded
        if (documents[documentType]) {
            setDocumentUrl(documents[documentType]);
            return;
        }

        // Toggle off if already selected
        if (selectedDocument === documentType) {
            setSelectedDocument(null);
            setDocumentUrl(null);
            return;
        }


        loadDocument(fileName, documentType);
    };


    if (loading) return <p>Loading...</p>;

    if (!volunteer) return <p>No volunteer found</p>;
    return (
        <div className="page-wrapper">
            <div className="detail-header">
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}
            </div>

            <div className="volunteer-details">
                <div className="info-section">
                    <h2>{volunteer.name}</h2>
                    <p><strong>Email:</strong> {volunteer.email}</p>
                    <p><strong>Hours / Week:</strong> {volunteer.hours_by_week}</p>

                    {(isVolunteer || isAdmin) && (
                        <div className="document-selector">
                            <label>
                                <input
                                    type="radio"
                                    name="document"
                                    checked={selectedDocument === "resume"}
                                    onChange={() =>
                                        handleDocumentView(volunteer.resume, "resume")
                                    }
                                />
                                Resume
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="document"
                                    checked={selectedDocument === "backgroundCheck"}
                                    onChange={() =>
                                        handleDocumentView(
                                            volunteer.background_check,
                                            "backgroundCheck"
                                        )
                                    }
                                />
                                Background Check
                            </label>
                        </div>
                    )}
                    <div className="info-actions">
                        <button type="button" className="btn" onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/")}>Back</button>
                    </div>
                </div>

                <div className="resume-section">
                    <div className="resume-header">
                        Document Viewer
                    </div>

                    {selectedDocument === "resume" && !volunteer.resume ? (
                        <p>No resume uploaded.</p>
                    ) : selectedDocument === "backgroundCheck" &&
                        !volunteer.background_check ? (
                        <p>No background check uploaded.</p>
                    ) :
                        documentUrl ? (
                            <div className="resume-preview">
                                <embed
                                    src={documentUrl}
                                    type="application/pdf"
                                    width="100%"
                                    height="600px"
                                />
                            </div>
                        ) : (
                            <p>No document to view.</p>
                        )}

                </div>

            </div>
        </div>
    );
}

export default VolunteerDetails;