/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // lista de useri înregistrați
  const [users, setUsers] = useState([
    // useri demo 
    { email: "mp@mara.com", password: "1234", role: "MP" },
    { email: "tst@mara.com", password: "1234", role: "TST" },
  ]);

 
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/me", {
          withCredentials: true
        });
        setUser(res.data);

      } catch (err) {
        console.log("Error restoring session: ", err);
      }
    }
    restoreSession();
  }, []);

  // logout
  const logoutUser = async () => {
    await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true });
    setUser(null);
  };

  const loginUser = (userData) => { // This holds the login state.
    setUser(userData);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        setUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
