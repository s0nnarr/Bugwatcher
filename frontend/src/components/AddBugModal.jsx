import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function AddBugModal({ projectId, onClose }) {
  const { addBug } = useContext(AppContext);

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
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Raporteaza un bug</h2>

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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrie problema..."
            required
          />

          <label>Link commit</label>
          <input
            type="text"
            value={commitLink}
            onChange={(e) => setCommitLink(e.target.value)}
            placeholder="https://github.com/user/repo/commit/123..."
            required
          />

          <button type="submit" className="add-btn">Raporteaza bug</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Anuleaza</button>

        </form>
      </div>
    </div>
  );
}
