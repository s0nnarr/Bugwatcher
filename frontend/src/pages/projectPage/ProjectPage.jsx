import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

import './projectPage.css';

export const ProjectPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bugs, setBugs] = useState([]);
    

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:3000/projects/${id}`, { withCredentials: true });
                console.log("Fetched project:", res.data);
                if (res.status !== 200) {
                    console.error("Failed to fetch project");
                    setLoading(false);
                    return;
                }
                setProject(res.data);
                if (res.data.owner_type === "USER") {
                  const owner = await axios.get(`http://localhost:3000/users/${res.data.owner_id}`, { withCredentials: true });
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [id]);

    if (loading) {
        return <div>Loading project...</div>;
    }
    if (!project) {
        return <div>Project not found.</div>;
    }
    
     return (
    <div className="project-page-container">
      <header className="project-header">
        <h1>{project.title}</h1>
        <p>{project.description || "Fără descriere..."}</p>
        <p>
          <strong>Owner: </strong> {project.email || "—"}
        </p>
        <p>
          <strong>Repository: </strong>{" "}
          <a href={project.commit_link} target="_blank" rel="noreferrer">
            {project.commit_link}
          </a>
        </p>
        <p>
          <strong>Echipă:</strong> {project.team?.map((m) => m.email).join(", ") || "—"}
        </p>
      </header>

      <section className="project-bugs">
        <h2>Bug-uri ({bugs.length})</h2>
        {bugs.length === 0 ? (
          <p>Nu există bug-uri raportate pentru acest proiect.</p>
        ) : (
          <table className="bug-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descriere</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Reporter</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.description}</td>
                  <td>{b.severity}</td>
                  <td>{b.status}</td>
                  <td>{b.reporter?.email || "—"}</td>
                  <td>{b.assignedTo?.email || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};
