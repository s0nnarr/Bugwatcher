import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ProjectTable() {
  const { projects, bugs } = useContext(AppContext);

  if (projects.length === 0) {
    return <p>Nu exista proiecte inregistrate.</p>;
  }

  const getBugCountForProject = (projectId) =>
    bugs.filter((b) => b.projectId === projectId).length;

  return (
    <table className="project-table">
      <thead>
        <tr>
          <th>Nume proiect</th>
          <th>Repository</th>
          <th>Owner</th>
          <th>Echipă</th>
          <th>Nr. bug-uri</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>
              <a href={p.repo} target="_blank" rel="noreferrer">
                {p.repo}
              </a>
            </td>
            <td>{p.owner || "—"}</td>
            <td>{p.team?.join(", ") || "—"}</td>
            <td>{getBugCountForProject(p.id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
