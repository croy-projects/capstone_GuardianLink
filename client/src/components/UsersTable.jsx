import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/userService';
import BackgroundCheckStatus from "./BackgroundCheckStatus";
import ResumeStatus from "./ResumeStatus";

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);

        } catch {
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        setError("");
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await deleteUser(id).then(loadUsers);
                setSuccess("User deleted successfully!");
                setTimeout(() => setSuccess(""), 1500);

            } catch (err) {
                setError('Error delete user');
            }
            finally {
                setLoading(false);
            }

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
            <h3>Users List</h3>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th className="documents-col">Resume</th>
                        <th className="documents-col">Background Check</th>
                        <th className="actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.role}</td>
                            <td>{u.email}</td>
                            <td>
                                {u.role === 'Volunteer' && (
                                    <span>
                                        <ResumeStatus hasDocument={u.resume} />
                                    </span>

                                )}


                            </td>
                            <td>

                                {u.role === 'Volunteer' && (
                                    <span>
                                        <BackgroundCheckStatus
                                            status={u.background_check_status}
                                            hasDocument={!!u.background_check}
                                        />
                                    </span>

                                )}

                            </td>

                            <td className="actions">
                                {u.role === 'Volunteer' && (
                                    <button type="button" className="btn-action" onClick={() => navigate(`/volunteer-details/${u.id}`)}>
                                        Details
                                    </button>
                                )}
                                {(u.role === 'Organization') && (
                                    <button type="button" className="btn-action" onClick={() => navigate(`/organization-details/${u.id}`)}>
                                        Details
                                    </button>

                                )}
                                {(u.role === 'Admin') && (
                                    <button type="button" disabled className="btn-action" style={{ visibility: 'hidden' }}  >
                                        Detail
                                    </button>
                                )}
                                <button type="button" className="btn-edit" onClick={() => navigate(`/edit-user/${u.id}`)}>
                                    Edit
                                </button>
                                <button type="button" className="btn-reset" onClick={() => navigate(`/reset-password/${u.id}`)}>
                                    Reset Pass
                                </button>
                                <button type="button" className="btn-delete" onClick={() => handleDelete(u.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="table-actions">
                <button type="button" className="btn-action"
                    onClick={() => navigate('/create-user')}
                >
                    Create User
                </button>
            </div>
        </section>
    );
}