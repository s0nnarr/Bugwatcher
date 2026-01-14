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
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBug({
        title: title || `Bug reported by ${user.email}`,
        projectId,
        severity,
        priority,
        description,
      });
      alert("Bug raportat cu succes!");
      onClose();
    } catch (err) {
      console.error("Error reporting bug:", err);
      alert("Eroare la raportarea bug-ului. Încearcă din nou.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Raportează bug</h2>

        <form onSubmit={handleSubmit} className="bug-form">

          <label>Titlu</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Scurt titlu al bug-ului"
          />

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
          </select>

          <label>Descriere</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrie problema..."
          />

          <label>Link commit asociat (opțional)</label>
          <input
            type="text"
            value={commitLink}
            onChange={(e) => setCommitLink(e.target.value)}
            placeholder="https://github.com/.../commit/123"
          />

          <div style={{display:'flex', gap:8, marginTop:6}}>
            <button className="btn primary" type="submit">Trimite bug</button>
            <button type="button" className="btn ghost" onClick={onClose}>Anulează</button>
          </div>
        </form>
      </div>
    </div>
  );
}
