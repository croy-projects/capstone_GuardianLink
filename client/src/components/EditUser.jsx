import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getRoles } from "../services/roleService";
import { getUserById, updateUser } from "../services/userService";

function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [roles, setRoles] = useState([]);

    const [form, setForm] = useState({
        name: '',
        role_id: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(true);

    // Fetch roles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, form);
            navigate('/admin'); // go back to dashboard
        } catch (err) {
            console.error(err);
            alert('Error updating user');
        }
    };

    // Load user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(id);
                setForm({
                    name: user.name,
                    email: user.email,
                    role_id: user.role_id,
                    password: user.password
                });
            } catch (err) {
                console.error(err);
                alert('User not found');
                navigate('/admin');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, navigate]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="form-page">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role_id">Role</label>
                    <select
                        name="role_id"
                        value={form.role_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select role</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.role}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="button" className="btn-action" onClick={() => navigate('/admin')}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-action">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditUser;