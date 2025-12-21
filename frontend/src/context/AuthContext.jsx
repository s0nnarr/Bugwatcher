/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // lista de useri înregistrați
  const [users, setUsers] = useState([
    // useri demo 
    { email: "mp@mara.com", password: "1234", role: "MP" },
    { email: "tst@mara.com", password: "1234", role: "TST" },
  ]);

  // înregistrare user nou
  const registerUser = (email, password, role) => {
    const exists = users.some(u => u.email === email);
    if (exists) return false;

    const newUser = { email, password, role };
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  // login
  const loginUser = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return null;

    setUser(found);
    return found;
  };

  // logout
  const logoutUser = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
