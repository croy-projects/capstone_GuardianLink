import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import { getRoles } from "../services/roleService";
import { getUserById, updateUser, getVolunteerById, getNGOById } from "../services/userService";
import { ROLES } from "../config/roles";
function EditUser() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const [roles, setRoles] = useState([]);
    const [originalRole, setOriginalRole] = useState(null);

    const [form, setForm] = useState({
        name: '',
        role_id: '',
        email: '',
        hours_by_week: '',
        area_of_concern: ''
    });

    const isAdmin = user?.role_id === ROLES.ADMIN;
    const isVolunteer = Number(form.role_id) === ROLES.VOLUNTEER;
    const isNGO = Number(form.role_id) === ROLES.NGO;

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
                email: form.email,
                role_id: user.role_id,
                hours_by_week: Number(form.hours_by_week),
                area_of_concern: form.area_of_concern,
                old_role_id: originalRole
            }

            // Only Admin can change role_id
            if (isAdmin) {
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

                let extraData = {};
                if (Number(userDetail.role_id) === ROLES.NGO) {
                    const ngoData = await getNGOById(id);
                    if (ngoData) {
                        extraData = {
                            area_of_concern:
                                ngoData.area_of_concern || ""
                        };

                    }
                }

                if (Number(userDetail.role_id) === ROLES.VOLUNTEER) {
                    const volunteerData = await getVolunteerById(id);
                    extraData = {
                        hours_by_week: volunteerData.hours_by_week || ""
                    };
                }
                setForm({
                    name: userDetail.name,
                    email: userDetail.email,
                    role_id: userDetail.role_id,
                    hours_by_week: "",
                    area_of_concern: "",
                    ...extraData
                });

                setOriginalRole(userDetail.role_id);

            } catch (err) {
                console.log("fetch user err", err);
                setError("Unable to load user profile.");
                return;

            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

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
                {isVolunteer && (
                    <>
                        <div className="form-group">
                            <label htmlFor="hours_by_week">Hours Available / Week</label>
                            <input
                                type="number"
                                name="hours_by_week"
                                placeholder="Hours"
                                value={form.hours_by_week}
                                onChange={handleChange}
                            />
                        </div>

                    </>
                )}
                {isNGO && (
                    <div className="form-group">
                        <label htmlFor="area_of_concern">Area of Concern</label>
                        <textarea
                            name="area_of_concern"
                            placeholder="Area of Concern"
                            value={form.area_of_concern}
                            onChange={handleChange}
                        />
                    </div>
                )}
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