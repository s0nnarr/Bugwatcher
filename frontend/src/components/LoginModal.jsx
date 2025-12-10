import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginModal({ onClose }) {
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const logged = loginUser(email, password);

    if (!logged) {
      setError("Email sau parolă incorectă.");
      return;
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Autentificare</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Parolă</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="add-btn">Login</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Anulează</button>
        </form>
      </div>
    </div>
  );
}
