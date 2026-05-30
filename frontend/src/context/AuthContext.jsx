import { createContext, useContext, useState, useEffect } from 'react';
import { authService, settingsService } from '../services/api';

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
    const token = authService.getToken();
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
      const settingsData = await settingsService.getSettings();
      setSettings(settingsData);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const login = async (credentials) => {
    const userData = await authService.login(credentials);
    setUser(userData);
    return userData;
  };

  const register = async (userData) => {
    const result = await authService.register(userData);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
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
