/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // lista de useri înregistrați
  const [users, setUsers] = useState([
    // useri demo 
    { email: "mp@mara.com", password: "1234", role: "MP" },
    { email: "tst@mara.com", password: "1234", role: "TST" },
  ]);



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
        loginUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
