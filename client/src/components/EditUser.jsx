import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import { getRoles } from "../services/roleService";
import { getUserById, updateUser } from "../services/userService";
import { ROLES } from "../config/roles";
function EditUser() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const isAdmin = user?.role_id === ROLES.ADMIN;

    const [roles, setRoles] = useState([]);

    const [form, setForm] = useState({
        name: '',
        role_id: '',
        email: ''
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch roles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load roles. Please try again.");
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {

            const updateData = {
                name: form.name,
                email: form.email
            }
            // Only Admin can change role_id
            if (isAdmin){
                updateData.role_id = form.role_id;
            }

            await updateUser(id, updateData);

            setSuccess("User updated successfully!");
            setTimeout(() => window.history.length > 1 ? navigate(-1) : navigate("/"), 1500); // go back
        } catch (err) {
            setError('Error updating user');
        }
    };

    // Load user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDetail = await getUserById(id);
                setForm({
                    name: userDetail.name,
                    email: userDetail.email,
                    role_id: userDetail.role_id
                });
            } catch (err) {
                setError("Unable to load user profile.");
                return;

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
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
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
                        disabled={!isAdmin}
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
                    <button type="button" className="btn-action" onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/")}>
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