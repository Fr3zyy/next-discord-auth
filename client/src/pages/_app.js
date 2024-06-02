import { useState, createContext, useContext, useEffect } from 'react';
import '../styles/globals.css';
import { API_URI } from "../../config"
const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`${API_URI}/api/auth/status`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
