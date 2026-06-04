import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVolunteers, getProfile } from '../services/userService';
import BackgroundCheckStatus from "./BackgroundCheckStatus";
import ResumeStatus from "./ResumeStatus";


export default function VolunteersTable() {
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const createMailto = (volunteer) => {
        const subject = encodeURIComponent(
            "Cybersecurity Support Request from " + profile.name
        );

        const body = encodeURIComponent(
            `Hi ${volunteer.name},\n\n` +
            `We found your profile on GuardianLink and would love your help with our cybersecurity needs.\n\n` +
            `Please let us know your availability.\n\n` +
            `Best regards,\n${profile.name}\n${profile.email}`
        );

        window.open(`mailto:${volunteer.email}?subject=${subject}&body=${body}`, "_blank");
    };
    const loadUsers = async () => {
        setLoading(true);
        setError("");

        try {
            try {
                const ngo = await getProfile();
                setProfile(ngo);
            } catch {
                setError("Failed to load profile");
            }

            try {
                const data = await getVolunteers();
                setUsers(data);
            } catch {
                setError("Failed to load volunteers");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (

        <section className="table-container">
            <h3>Available Volunteers</h3>
            {error && <p className="error">{error}</p>}
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Hours / Week</th>
                        <th className="documents-col">Resume</th>
                        <th className="documents-col">Background Check</th>
                        <th className="actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.hours_by_week}</td>
                            <td>
                                <span>
                                    <ResumeStatus hasDocument={u.resume} />
                                </span>
                            </td>
                            <td>
                                <span>
                                    <BackgroundCheckStatus
                                        status={u.background_check_status}
                                        hasDocument={!!u.background_check}
                                    />
                                </span>
                            </td>


                            <td className="actions">
                                <button type="button" className="btn-view" onClick={() => navigate(`/volunteer-details/${u.id}`)}>
                                    View Resume
                                </button>

                                <button type="button" className="btn-contact"
                                    onClick={() => createMailto(u)}
                                >
                                    Contact
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}