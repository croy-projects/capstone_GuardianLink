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
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const { user, logout } = useAuth();

    const handleDelete = async () => {

        setError("");
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            try {
                await deleteUser(profile.id);
                setSuccess("User deleted successfully!");
                logout();
                setTimeout(() => navigate("/"), 1500); // go back to home
            } catch (err) {
                setError('Error updating user');
            }
        }
    };

    useEffect(() => {
        if (!user) {
            return <p>Please login to view your profile.</p>;
        }

        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (err) {
                console.log('err', err);
                setError("Unable to load user profile.");
                return;

            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []); //Need an empty dependency array so it only runs once


    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>No profile</p>;
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
                    <button className="btn-action" onClick={() => navigate(`/edit-user/${profile.id}`)}>
                        Edit Profile
                    </button>

                    <button className="btn-delete" onClick={handleDelete}>
                        Delete Account
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
                        <>
                            {profile.role_id === ROLES.VOLUNTEER && (
                                <p><strong>Hours / Week:</strong> {profile.hours_by_week}</p>

                            )}
                        </>
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