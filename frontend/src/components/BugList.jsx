import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function BugList({ project, onClose }) {
  const { bugs, assignBug, resolveBug } = useContext(AppContext);

  const projectBugs = bugs.filter(b => b.projectId === project.id);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Bug-uri pentru {project.name}</h2>

        <button className="close-btn" onClick={onClose}>X</button>

        {projectBugs.length === 0 && <p>Nu exista bug-uri pentru acest proiect.</p>}

        {projectBugs.map(bug => (
          <div key={bug.id} className="bug-item">
            <p><b>Descriere:</b> {bug.description}</p>
            <p><b>Prioritate:</b> {bug.priority}</p>
            <p><b>Severitate:</b> {bug.severity}</p>
            <p><b>Status:</b> {bug.status}</p>

            {!bug.assignedTo && (
              <button onClick={() => assignBug(bug.id, "MP")}>
                Aloca mie
              </button>
            )}

            {bug.assignedTo && bug.status !== "Resolved" && (
              <button
                onClick={() =>
                  resolveBug(bug.id, prompt("Link commit rezolvare:"))
                }
              >
                Marcheaza rezolvat
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
