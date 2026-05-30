import { createContext, useContext, useState, useEffect } from 'react';
import { authService, websiteService } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    checkAuth();
    loadSettings();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        authService.logout();
      }
    }
    setLoading(false);
  };

  const loadSettings = async () => {
    try {
      const settingsData = await websiteService.getSettings();
      setSettings(settingsData);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const login = async (email, password) => {
    const userData = await authService.login(email, password);
    setUser(userData.user);
    return userData;
  };

  const register = async (fullName, email, phone, password) => {
    const result = await authService.register(fullName, email, phone, password);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const refreshSettings = async () => {
    await loadSettings();
  };

  const value = {
    user,
    loading,
    settings,
    login,
    register,
    logout,
    updateUser,
    refreshSettings,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
