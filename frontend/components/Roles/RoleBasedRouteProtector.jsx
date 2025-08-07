import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";

const RoleBasedRouteProtector = ({ allowedRoles , children }) => {

    const loadingStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    }

    const { user, loading } = useContext(AuthContext);

    if (loading) return <div style={loadingStyle}>Loading...</div>

    if (!user) return <Navigate to="/login" />

    if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />

    return children

};

export default RoleBasedRouteProtector;