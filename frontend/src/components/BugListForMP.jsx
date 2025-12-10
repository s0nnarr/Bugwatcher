import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";

export default function BugListForMP() {
  const { projects, bugs, assignBug, resolveBug } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  // proiectele unde acest MP este owner
  const ownedProjects = projects.filter(p => p.owner === user.email);
  const ownedProjectIds = ownedProjects.map(p => p.id);

  // bug-urile lor
  const myBugs = bugs.filter(b => ownedProjectIds.includes(b.projectId));

  if (myBugs.length === 0) {
    return <p>Nu există bug-uri pentru proiectele tale.</p>;
  }

  const getProjectName = (id) =>
    (projects.find(p => p.id === id) || {}).name;

  const handleAssign = (bugId) => {
    assignBug(bugId, user.email);
  };

  const handleResolve = (bugId) => {
    const link = window.prompt("Link commit rezolvare:");
    if (link) {
      resolveBug(bugId, link);
    }
  };

  return (
    <div className="bug-list-mp">
      <h3>Bug-urile proiectelor mele</h3>

      <table className="bug-table">
        <thead>
          <tr>
            <th>Proiect</th>
            <th>Descriere</th>
            <th>Severitate</th>
            <th>Prioritate</th>
            <th>Status</th>
            <th>Asignat</th>
            <th>Commit Rezolvare</th>
            <th>Acțiuni</th>
          </tr>
        </thead>

        <tbody>
          {myBugs.map(b => (
            <tr key={b.id}>
              <td>{getProjectName(b.projectId)}</td>
              <td>{b.description}</td>
              <td>{b.severity}</td>
              <td>{b.priority}</td>
              <td>{b.status}</td>
              <td>{b.assignedTo || "—"}</td>
              <td>
                {b.resolveCommit ? (
                  <a href={b.resolveCommit} target="_blank">Vezi commit</a>
                ) : "—"}
              </td>
              <td>
                {b.status === "Open" && (
                  <button onClick={() => handleAssign(b.id)}>
                    Alocă-mi
                  </button>
                )}

                {b.status !== "Resolved" && (
                  <button onClick={() => handleResolve(b.id)}>
                    Rezolvat ✔
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
