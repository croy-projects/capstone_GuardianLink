import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVolunteers } from '../services/userService';

export default function VolunteersTable() {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
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
                                <button
                                    className="btn-contact"
                                    onClick={() => window.location.href = `mailto:${u.email}`}
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