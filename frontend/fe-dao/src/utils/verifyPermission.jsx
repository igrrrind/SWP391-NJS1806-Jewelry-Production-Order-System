import { useAuth } from '@/contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const VerifyPermission = ({ component: Component, requiredRoles }) => {
    const { userDetails } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isAccessible, setIsAccessible] = useState(false);

    useEffect(() => {
        if (userDetails) {
            const checkIsAccessible = (roles) => {
                if (!userDetails.roleName) {
                    return false;
                }
                return roles.includes(userDetails.roleName.toLowerCase());
            };
            
            setIsAccessible(checkIsAccessible(requiredRoles));
            setLoading(false);
        }
    }, [userDetails, requiredRoles]);

    if (loading) {
        return <div>Authenticating user...</div>; // Replace this with your loading component if any
    }

    if (!isAccessible) {
        return <Navigate to="/" />;
    }

    return <Component />;
};

export default VerifyPermission;
