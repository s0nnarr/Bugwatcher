import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";

export default function AddBugModal({ projectId, onClose }) {
  const { addBug } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [severity, setSeverity] = useState("Low");
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");
  const [commitLink, setCommitLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addBug({
      projectId,
      severity,
      priority,
      description,
      commitLink,
      reporter: user.email,
    });

    alert("Bug raportat cu succes!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Raportează bug</h2>

        <form onSubmit={handleSubmit} className="bug-form">

          <label>Severitate</label>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <label>Prioritate</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>

          <label>Descriere</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrie problema..."
          />

          <label>Link commit asociat</label>
          <input
            type="text"
            required
            value={commitLink}
            onChange={(e) => setCommitLink(e.target.value)}
            placeholder="https://github.com/.../commit/123"
          />

          <button className="add-btn" type="submit">Trimite bug</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Anulează</button>
        </form>
      </div>
    </div>
  );
}
