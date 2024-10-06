import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('No token found, redirecting to sign-in');
    return <Navigate to="/sign-in" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log('Decoded token:', decodedToken);
    if (decodedToken.role !== role) {
      console.log(`Role mismatch: expected ${role}, got ${decodedToken.role}`);
      return <Navigate to="/sign-in" />;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default PrivateRoute;

