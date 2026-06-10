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
    // Ownership restriction (for edit pages)

    const profileId = id ?? user?.id;
    const isOwner = user?.id?.toString() === profileId?.toString();

    // with roles: check role not allowed
    const isAllowedRole = allowedRoles?.includes(user.role_id);
    
    //console.log("isOwner", isOwner);
    //console.log("requireOwnership", requireOwnership);
    
    const hasAccess = isAdmin || (requireOwnership && isOwner) || isAllowedRole;
    //console.log("hasAccess", hasAccess);

    if (!hasAccess) {
        return <Navigate to="/" />;
    }
  
    return children;
};

export default ProtectedRoute;