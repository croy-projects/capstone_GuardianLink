import { useEffect, useState } from 'react';
import { getNGOs } from '../services/userService';
import { getProfile } from "../services/userService";

export default function NGOTable() {
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState(null);
    const createMailto = (ngo) => {
        const subject = encodeURIComponent("Volunteer Support");
        const body = encodeURIComponent(
            `Hi ${ngo.name},\n\nI would like to help.\n\nThanks\n\n${profile.name}\n${profile.email}`
        );

        return `mailto:${ngo.email}?subject=${subject}&body=${body}`;
    };

    const loadUsers = async () => {
        const volunteer = await getProfile();
        setProfile(volunteer);

        const data = await getNGOs();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);
    return (
        <div className="dashboard-container">
            <h2>Organizations Needing Help</h2>
            <h3>Browse and connect with organizations that require assistance.</h3>
            <div className="ngo-grid">
                {users.map((ngo) => (
                    <div key={ngo.id} className="ngo-card">
                        <h3>{ngo.name}</h3>
                        <p><strong>Email:</strong> {ngo.email}</p>
                        <p><strong>Concern:</strong> {ngo.area_of_concern}</p>

                        <div className="card-actions">
                            <button onClick={() => (window.location.href = createMailto(ngo))}>
                                Contact
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}