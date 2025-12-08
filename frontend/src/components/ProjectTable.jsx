import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ProjectTable() {
  const { projects } = useContext(AppContext);

  if (projects.length === 0) {
    return <p>Nu există proiecte încă.</p>;
  }

  return (
    <table className="project-table">
      <thead>
        <tr>
          <th>Nume proiect</th>
          <th>Repository</th>
          <th>Owner</th>
          <th>Echipă</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td><a href={p.repo} target="_blank">Repo</a></td>
            <td>{p.owner}</td>
            <td>{p.team.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
