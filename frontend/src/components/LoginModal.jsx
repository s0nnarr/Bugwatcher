import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function LoginModal({ onClose }) {
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post('http://localhost:3000/users/login', { 
      email,  
      password
    },
    { withCredentials: true }
    );
    
    // console.log(res.data);
    if (!res.data) {
      setError("Email sau parolă incorecte.");
      return;
    }
    loginUser(res.data);

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
