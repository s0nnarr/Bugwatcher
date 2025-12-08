import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginModal({ onClose }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // =========================
    // LOGICA DE LOGIN
    // =========================

    let role = "TST"; // default

    // regula simplă: dacă emailul conține "mp", userul e MP
    if (email.toLowerCase().includes("mp")) {
      role = "MP";
    }

    // setează user-ul logat
    setUser({
      name: email.split("@")[0], // numele = partea din fața emailului
      email,
      role,
    });

    onClose(); // închide modalul
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Autentificare</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Parolă</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
          <button type="button" onClick={onClose}>Anulează</button>
        </form>

      </div>
    </div>
  );
}
