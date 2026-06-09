import { useEffect, useState } from 'react';
import { getNGOs, getProfile } from '../services/userService';

export default function NGOTable() {
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const createMailto = (ngo) => {
        const subject = encodeURIComponent("Volunteer Support");
        const body = encodeURIComponent(
            `Hello, I found your profile on GuardianLink and would like to volunteer for ${ngo.name}.\n\nThank you, and I look forward to hearing from you.\n\nBest regards\n\n${profile.name}\n${profile.email}`
        );

        window.open(`mailto:${ngo.email}?subject=${subject}&body=${body}`, "_blank");
    };

    const loadUsers = async () => {
        try {
            try {
                const volunteer = await getProfile();
                setProfile(volunteer);
            } catch {
                setError("Failed to load profile");
            }

            try {
                const data = await getNGOs();
                setUsers(data);
            } catch {
                setError("Failed to load organizations");
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
        <div className="dashboard-container">
            <h2>Organizations Needing Help</h2>
            <h3>Browse and connect with organizations that require assistance.</h3>
            {error && <p className="error">{error}</p>}
            <div className="ngo-grid">
                {users.map((ngo) => (
                    <div key={ngo.id} className="ngo-card">
                        <h3>{ngo.name}</h3>
                        <p><strong>Email:</strong> {ngo.email}</p>
                        <p><strong>Concern:</strong> {ngo.area_of_concern}</p>

                        <div className="card-actions">
                            <button type="button" onClick={() => createMailto(ngo)} >
                                Contact
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}