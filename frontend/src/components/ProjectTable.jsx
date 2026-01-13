import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function ProjectTable() {
  const { projects, bugs, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const projectList = projects.Projects || [];
  console.log("ProjectTable projects from context:", projectList);
  if (projectList.length === 0) {
    return <p>Nu exista proiecte inregistrate.</p>;
  }
  console.log("Rendering ProjectTable with projects:", projects);

  const getBugCountForProject = (projectId) =>
    bugs.filter((b) => b.projectId === projectId).length;

  const handleClick = () => {
    navigate('/test')
  }

  return (
    <table className="project-table">
      <thead>
        <tr>
          <th>Nume proiect</th>
          <th>Commit link</th>
          <th>Owner</th>
          <th>Echipă</th>
          <th>Nr. bug-uri</th>
        </tr>
      </thead>
      <tbody>
        {projectList.map((p) => (
          <tr key={p.id} >
            <td>{p.title}</td>
            <td>
              <a href={p.commit_link} target="_blank" rel="noreferrer">
                {p.commit_link}
              </a>
            </td>
            <td>{projects.email || "—"}</td>
            <td>{p.team?.join(", ") || "—"}</td>
            <td>{getBugCountForProject(p.id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
