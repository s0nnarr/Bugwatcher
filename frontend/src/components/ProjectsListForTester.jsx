import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import AddBugModal from "./AddBugModal";

export default function ProjectsListForTester() {
  const { projects, addTesterToProject } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  if (projects.length === 0) {
    return <p>Nu exista proiecte momentan.</p>;
  }

  const handleJoin = (projectId) => {
    addTesterToProject(projectId, user.email);
    alert("Te-ai alaturat proiectului ca tester.");
  };

  return (
    <div className="tester-projects">
      {projects.map((p) => (
        <div key={p.id} className="tester-card">
          <h3>{p.name}</h3>
          <p>Repo: {p.repo}</p>

          <button onClick={() => handleJoin(p.id)}>
            Alatura-te ca tester
          </button>

          <button onClick={() => setSelectedProjectId(p.id)}>
            Raporteaza bug
          </button>
        </div>
      ))}

      {selectedProjectId && (
        <AddBugModal
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  );
}
