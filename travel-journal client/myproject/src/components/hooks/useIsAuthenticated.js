import { useState, useEffect } from 'react';

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(cookie => cookie.includes('AspNetCore.Identity.Application'));
    alert(cookie,"cookie")
    setIsAuthenticated(!!cookie);
  }, []);

  return isAuthenticated;
};