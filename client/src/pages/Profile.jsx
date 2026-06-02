import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { ROLES } from "../config/roles";
import { getProfile, deleteUser } from "../services/userService";

import "../styles/profile.css";

function Profile() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const { user, logout } = useAuth();

    const handleDelete = async () => {

        setError("");
        setLoading(true);

        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            try {
                await deleteUser(profile.id);
                setSuccess("User deleted successfully!");
                logout(); //protected route handle redirect to login page
               
            } catch (err) {
                setError('Error deleting user');
            }
            finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (!user) return;

        const fetchProfile = async () => {
            setLoading(true);
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (err) {
                setError("Unable to load user profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    if (!user) {
        return <p>Please login to view your profile.</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!profile) {
        return <p>No profile</p>;
    }
    return (

        <div className="profile-page">
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {/* COMMON INFO HEADER */}
            <div className="profile-header">
                <div className="profile-avatar">{profile.name?.charAt(0)}</div>

                <div className="profile-info">
                    <h2>{profile.name}</h2>
                    <p>{profile.email}</p>
                    <span className="role-badge">{profile.role}</span>
                </div>
                {/* ACTIONS */}
                <div className="profile-actions">
                    <button type="button" className="btn-action" onClick={() => navigate(`/edit-user/${profile.id}`)}>
                        Edit Profile
                    </button>
                    <button type="button"
                        className="btn-delete"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Account"}
                    </button>
                </div>

            </div>

            {/* BODY */}
            <div className="profile-body">

                {/* LEFT */}
                <div className="profile-main">
                    <div className="card">
                        <h3>Details</h3>
                        {/* VOLUNTEER */}
                        {profile.role_id === ROLES.VOLUNTEER && (
                            <>
                                <p><strong>Hours / Week:</strong> {profile.hours_by_week}</p>

                                <button type="button" className="btn-view" onClick={() => navigate(`/volunteer-details/${profile.id}`)}>
                                    View Detail
                                </button>
                            </>
                        )}
                        {/* NGO */}
                        {profile.role_id === ROLES.NGO && (
                            <>
                                <h3>Areas of Concern</h3>
                                <div className="long-text">
                                    {profile.area_of_concern}
                                </div>
                            </>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;