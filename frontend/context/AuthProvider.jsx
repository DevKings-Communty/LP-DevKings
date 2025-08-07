import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
//import { useNavigate } from 'react-router-dom';
const AuthProvider = ({ children }) => {
  //const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // userData expected shape: { user: {...}, accessToken: '...', refreshToken: '...' }
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    setUser(userData.user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
