import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ROLES } from "../config/roles";
const ProtectedRoute = ({ children, allowedRoles, requireOwnership }) => {
    const { user } = useAuth();
    const { id } = useParams();

    // Not logged in
    if (!user) {
        return <Navigate to="/login" />;
    }

    const isAdmin = user.role_id === ROLES.ADMIN;
    const isOwner = user.id?.toString() === id;
    const isAllowedRole = allowedRoles?.includes(user.role_id);

    // with roles: check role not allowed
    if (!isAllowedRole) {
        return <Navigate to="/" />;
    }

    // Ownership restriction (for edit pages)
    if (requireOwnership && id && !isAdmin && !isOwner) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;