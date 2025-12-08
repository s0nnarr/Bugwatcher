import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    <nav className="navbar">
      <div className="logo">BugWatcher</div>

      <div className="nav-actions">
        {!user && (
          <>
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button>Register</button>
          </>
        )}

        {user && (
          <>
            <span>{user.name} ({user.role})</span>
            <button onClick={() => setUser(null)}>Logout</button>
          </>
        )}
      </div>
    </nav>

    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
