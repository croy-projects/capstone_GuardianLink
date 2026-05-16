import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVolunteers } from '../services/userService';
import { getProfile } from "../services/userService";

export default function VolunteersTable() {
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState(null);

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

        return `mailto:${volunteer.email}?subject=${subject}&body=${body}`;
    };
    const loadUsers = async () => {
        const ngo = await getProfile();
        setProfile(ngo);

        const data = await getVolunteers();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);
    const navigate = useNavigate();
    return (

        <section className="table-container">
            <h3>Available Volunteers</h3>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Hours / Week</th>
                        <th className="actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.hours_by_week}</td>
                            <td className="actions">
                                <button className="btn-view" onClick={() => navigate(`/volunteer-details/${u.id}`)}>
                                    View Resume
                                </button>

                                <button className="btn-contact"
                                    onClick={() => (window.location.href = createMailto(u))}
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