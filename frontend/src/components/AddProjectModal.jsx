import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";

export default function AddProjectModal({ onClose }) {
  const { addProject } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [repo, setRepo] = useState("");
  const [teamInput, setTeamInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const team = teamInput.split(",").map(t => t.trim());

    addProject({
      name,
      repo,
      owner: user.email,
      team
    });

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Adaugă proiect</h2>

        <form onSubmit={handleSubmit}>
          
          <label>Nume proiect</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Repository URL</label>
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
          />

          <label>Echipa (separate prin virgulă)</label>
          <input
            type="text"
            value={teamInput}
            onChange={(e) => setTeamInput(e.target.value)}
            placeholder="ex: Mara, Andrei, Ioana"
            required
          />

          <button type="submit" className="submit-btn">
            Salvează proiect
          </button>

          <button type="button" onClick={onClose} className="cancel-btn">
            Anulează
          </button>
        </form>
      </div>
    </div>
  );
}
