import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function BugList({ project, onClose }) {
  const { bugs, assignBug, resolveBug } = useContext(AppContext);

  const projectBugs = bugs.filter(b => b.projectId === project.id);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <h2 style={{fontSize:18}}>Bug-uri — {project.name || project.title}</h2>
          <button className="btn ghost" onClick={onClose}>Închide</button>
        </div>

        {projectBugs.length === 0 && <p className="muted">Nu exista bug-uri pentru acest proiect.</p>}

        {projectBugs.map(bug => (
          <div key={bug.id} className="bug-item" style={{padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
            <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
              <div>
                <div style={{fontWeight:700, marginBottom:6}}>{bug.title || 'Untitled'}</div>
                <div className="muted">Reporter: {bug.reporter?.email || '—'}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="muted">Status: {bug.status}</div>
                <div className="muted">Priority: {bug.priority}</div>
              </div>
            </div>

            <p style={{marginTop:10}}>{bug.description}</p>

            <div style={{display:'flex', gap:8, marginTop:10}}>
              {!bug.assignedUser && (
                <button className="btn primary" onClick={() => assignBug(bug.id, /* placeholder */ null)}>
                  Aloca mie
                </button>
              )}

              {bug.assignedUser && bug.status !== "RESOLVED" && (
                <button className="btn" onClick={() => resolveBug(bug.id, prompt("Link commit rezolvare:"))}>
                  Marcheaza rezolvat
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
