// AuthContext.js
import { createContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    const checkExpiration = () => {
      const expiresAt = localStorage.getItem('expiresAt');
      if (expiresAt && Date.now() > parseInt(expiresAt)) {
        localStorage.clear();
        window.location.reload();
      }
    };

    // Check every minute
    const interval = setInterval(checkExpiration, 60000);
    return () => clearInterval(interval);
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};