import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import AddBugModal from "./AddBugModal";

export default function ProjectsListForTester() {
  const { projects, addTesterToProject, bugs } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  if (projects.length === 0) {
    return <p>Nu exista proiecte momentan. Revino mai tarziu.</p>;
  }

  const handleJoin = (projectId) => {
    addTesterToProject(projectId, user.email);
    alert("Te-ai alaturat proiectului ca tester.");
  };

  const getBugCountForProject = (projectId) =>
    bugs.filter((b) => b.projectId === projectId).length;

  return (
    <div className="tester-project-list">
      <h3>Proiecte disponibile</h3>

      <div className="tester-project-grid">
        {projects.map((p) => {
          const isTester = p.testers?.includes(user.email);
          const bugCount = getBugCountForProject(p.id);

          return (
            <div key={p.id} className="tester-project-card">
              <h4>{p.name}</h4>
              <p><strong>Repo:</strong> {p.repo}</p>
              <p><strong>Owner:</strong> {p.owner || "—"}</p>
              <p><strong>Testeri:</strong> {p.testers?.length || 0}</p>
              <p><strong>Bug-uri:</strong> {bugCount}</p>

              {!isTester && (
                <button onClick={() => handleJoin(p.id)}>
                  Alatura-te ca tester
                </button>
              )}

              {isTester && (
                <>
                  <span className="tester-badge">Esti tester la acest proiect</span>
                  <button onClick={() => setSelectedProjectId(p.id)}>
                    Raporteaza bug
                  </button>
                </>
              )}

              {!isTester && (
                <button
                  className="secondary-btn"
                  onClick={() => alert("Mai intai alatura-te ca tester, apoi poti raporta bug-uri.")}
                >
                  Raporteaza bug
                </button>
              )}
            </div>
          );
        })}
      </div>

      {selectedProjectId && (
        <AddBugModal
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  );
}
