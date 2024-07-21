import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

const VerifyPermission = (component, requiredRoles) => {
    const {  userDetails } = useAuth();

    const checkIsAccessible = (requiredRoles) => {
      if (!userDetails || !userDetails.roleName) {
        return false;
      }
      return requiredRoles.includes(userDetails.roleName.toLowerCase());
    };


    const isAccessible = checkIsAccessible(requiredRoles);

    if (!isAccessible) {
      return <Navigate to="/" />;
    }

    return <Component />;
};

export default VerifyPermission;
