import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { Redirect } from 'react-router-dom';

const verifyPermission = (Component, requiredRoles) => {
  function Verify() {
    const {  userDetails } = useAuth();

    const checkIsAccessible = (requiredRoles) => {
      if (!userDetail || !userDetails.roleId) {
        return false;
      }
      return requiredRoles.includes(userDetails.roleId);
    };


    const isAccessible = checkIsAccessible(requiredRoles);

    if (!isAccessible) {
      return <Redirect to="/" />;
    }

    return <Component />;
  }

  return Verify;
};

export default verifyPermission;
