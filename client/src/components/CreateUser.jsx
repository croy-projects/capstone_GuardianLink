import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "../services/userService";
import { getRoles } from "../services/roleService";
import { ROLES } from "../config/roles";

function CreateUser() {
    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);

    const [form, setForm] = useState({
        name: '',
        role_id: '',
        email: '',
        password: '',
        hours_by_week: '',
        area_of_concern: ''
    });

    const isVolunteer = Number(form.role_id) === ROLES.VOLUNTEER;
    const isNGO = Number(form.role_id) === ROLES.NGO;

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


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
                role_id: form.role_id,
                password: form.password,
                hours_by_week: Number(form.hours_by_week),
                area_of_concern: form.area_of_concern
            }

            await createUser(updateData);
            setSuccess("User created successfully!");
            setTimeout(() => window.history.length > 1 ? navigate(-1) : navigate("/"), 1500); // go back
        } catch (err) {
            setError('Error updating user');
        }
    };

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

    return (
        <div className="form-page">
            <h2>Create User</h2>
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
                <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <input
                        name="password"
                        placeholder="Password"
                        value={form.password}
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
                    <button type="button" className="btn-action" onClick={() => navigate('/dashboard-admin')}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-action">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateUser;