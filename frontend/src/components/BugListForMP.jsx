import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";

export default function BugListForMP() {
  const { projects, bugs, assignBug, resolveBug } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  // Proiectele detinute de MP (owner = email)
  const myProjectIds = projects
    .filter(p => p.owner === user.email)
    .map(p => p.id);

  const myBugs = bugs.filter(b => myProjectIds.includes(b.projectId));

  if (myBugs.length === 0) {
    return <p>Nu exista bug-uri pentru proiectele tale inca.</p>;
  }

  const handleAssign = (bugId) => {
    assignBug(bugId, user.email);
  };

  const handleResolve = (bugId) => {
    const commitLink = window.prompt("Introdu link-ul commit-ului de rezolvare:");
    if (!commitLink) return;
    resolveBug(bugId, commitLink);
  };

  return (
    <>
      <h3>Bug-urile proiectelor mele</h3>
      <table className="project-table">
        <thead>
          <tr>
            <th>Descriere</th>
            <th>Severitate</th>
            <th>Prioritate</th>
            <th>Status</th>
            <th>Asignat</th>
            <th>Commit (rezolvare)</th>
            <th>Actiuni</th>
          </tr>
        </thead>
        <tbody>
          {myBugs.map(b => (
            <tr key={b.id}>
              <td>{b.description}</td>
              <td>{b.severity}</td>
              <td>{b.priority}</td>
              <td>{b.status}</td>
              <td>{b.assignedTo || "-"}</td>
              <td>
                {b.resolveCommit ? (
                  <a href={b.resolveCommit} target="_blank">Vezi commit</a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                <button onClick={() => handleAssign(b.id)}>
                  Aloca-mi
                </button>
                <button onClick={() => handleResolve(b.id)}>
                  Marcheaza rezolvat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
