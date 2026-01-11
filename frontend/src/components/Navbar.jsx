import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <nav className="navbar">
        <h1 className="logo">BugWatcher</h1>

        {!user ? (
          <div>
            <button onClick={() => setShowRegister(true)}>Register</button>
            <button onClick={() => setShowLogin(true)}>Login</button>
          </div>
        

        ) : (
          <div>
            <span>{user.email} ({user.role})</span>
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
