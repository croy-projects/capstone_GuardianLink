import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import { getRoles } from "../services/roleService";
import { getUserById, updateUser, getVolunteerById, getNGOById } from "../services/userService";
import BackgroundCheckStatus from "./BackgroundCheckStatus";
import { ROLES } from "../config/roles";
import { validate } from "../utils/validation";

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
        area_of_concern: '',
        resume: null,
        background_check: null,
        background_check_status: ''

    });

    // based on Authentication
    const isAdminAuth = user?.role_id === ROLES.ADMIN;

    // Based on the information provided by the user in the form
    const isVolunteer = Number(form.role_id) === ROLES.VOLUNTEER;
    const isNGO = Number(form.role_id) === ROLES.NGO;

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch roles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(data);
            } catch (err) {
                setError("Failed to load roles.");
            }
        };

        fetchRoles();
    }, []);

    // Update and validate form 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "role_id" ? Number(value) : value
        });
    };

    // Update and validate form for files
    const handleFileChange = (e) => {
        setError("");
        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf"
        ];

        const validExt = /\.(pdf)$/.test(file.name.toLowerCase());
        if (!allowedTypes.includes(file.type) || !validExt) {
            setError("Only PDF allowed");
            e.target.value = null; // reset input
            return;
        }

        setForm({ ...form, [e.target.name]: e.target.files[0] })
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {

            const validationError = validate(form);
            if (validationError) {
                setError(validationError);
                return;
            }

            setSaving(true);

            const updateData = new FormData();
            updateData.append("name", form.name);
            updateData.append("email", form.email);
            updateData.append("role_id", user.role_id);
            updateData.append("old_role_id", originalRole);


            if (isVolunteer) {
                updateData.append("hours_by_week"
                    , form.hours_by_week ?
                        Number(form.hours_by_week)
                        : null)

                if (form.resume) {
                    updateData.append("resume", form.resume);
                }
                if (form.background_check) {
                    updateData.append("background_check", form.background_check);
                }

                // Only Admin can change background_check_status
                if (isAdminAuth) {
                    updateData.append("background_check_status", form.background_check_status);
                }

            }
            if (isNGO) {
                updateData.append("area_of_concern", form.area_of_concern);
            }

            // Only Admin can change role_id
            if (isAdminAuth) {
                updateData.set("role_id", form.role_id);
            }

            await updateUser(id, updateData);

            setSuccess("User updated successfully!");
            setTimeout(() => window.history.length > 1 ? navigate(-1) : navigate("/"), 1500); // go back

        } catch (err) {
            setError(err.message || "Error updating user");
        } finally {
            setSaving(false);
        }
    };

    // Load user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDetail = await getUserById(id);

                // get extra data based on the role 
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
                        hours_by_week: volunteerData.hours_by_week || "",
                        resume: volunteerData.resume || "",
                        background_check: volunteerData.background_check || "",
                        background_check_status: volunteerData.background_check_status || "",
                    };
                }

                // set form 
                setForm({
                    name: userDetail.name,
                    email: userDetail.email,
                    role_id: Number(userDetail.role_id),
                    hours_by_week: "",
                    area_of_concern: "",
                    ...extraData
                });


                //keep original role before update
                setOriginalRole(Number(userDetail.role_id));

            } catch (err) {
                setError("Unable to load user profile.");
                return;

            } finally {
                setLoading(false);
            }
        };

        fetchUser();

    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (saving) return <p>Saving...</p>;

    return (
        <div className="form-page">
            <h2>Edit User</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role_id">Role *</label>
                    <select
                        name="role_id"
                        value={form.role_id}
                        onChange={handleChange}
                        required
                        disabled={!isAdminAuth}
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
                    <label htmlFor="email">Email *</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                {isVolunteer && (
                    <>
                        <div className="form-group">
                            <label htmlFor="hours_by_week">Hours Available / Week *</label>
                            <input
                                type="number"
                                name="hours_by_week"
                                placeholder="Hours"
                                value={form.hours_by_week}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="resume">Resume (.pdf)</label>
                            <p>
                                {form.resume ? <span>&#10003; Uploaded - View in Detail</span> : <span>&#128269; No resume submitted</span>}
                            </p>
                            <input
                                type="file"
                                name="resume"
                                placeholder=""
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                            <p className="legend">Add a new file to replace the current resume.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="background_check">Background Check (.pdf) </label>
                            <p>
                                {form.background_check ? <span>&#10003; Uploaded - View in Detail</span> : <span>&#128269; No background check submitted</span>}
                            </p>
                            <input
                                type="file"
                                name="background_check"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                            <p className="legend">Add a new file to replace the current background check.</p>
                        </div>


                        {isAdminAuth && (
                            <div className="form-group">
                                <label htmlFor="background_check_status">
                                    Background Check Status
                                </label>

                                <select
                                    id="background_check_status"
                                    name="background_check_status"
                                    value={form.background_check_status}
                                    onChange={handleChange}
                                >
                                    <option value="none">No Check on File</option>
                                    <option value="pending">Pending Review</option>
                                    <option value="verified">Verified</option>
                                    <option value="flagged">Flagged / Action Needed</option>
                                </select>
                            </div>
                        )}
                        {!isAdminAuth && (
                            <div className="form-group">
                                    <label htmlFor="background_check_status">
                                        Background Check Status
                                    </label>

                                    <BackgroundCheckStatus
                                        status={form.background_check_status}
                                        hasDocument={!!form.background_check}
                                    />
                                </div>

                        )}
                    </>
                )}
                {isNGO && (
                    <div className="form-group">
                        <label htmlFor="area_of_concern">Area of Concern *</label>
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
                    {isVolunteer && (
                        <button type="button" className="btn-view" onClick={() => navigate(`/volunteer-details/${id}`)}>
                            Details
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default EditUser;