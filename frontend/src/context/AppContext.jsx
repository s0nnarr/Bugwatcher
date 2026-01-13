/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bugs, setBugs] = useState([]);

  // 🔹 MP ➜ adaugă proiect
  const addProject = (project) => {
    setProjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: project.name,
        repo: project.repo,
        owner: project.owner,
        team: project.team || [],
        testers: [],
        bugs: []
      }
    ]);
  };

  const fetchProjects = async () => {
    setLoading(true);

    const res = await axios.get("http://localhost:3000/projects/getUserProjects");
    if (res.status !== 200) {
      console.error("Failed to fetch projects");
      setLoading(false);
      return;
    }
    setProjects(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, [])

  // 🔹 TST ➜ se alătură proiectului
  const addTesterToProject = (projectId, testerEmail) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, testers: [...p.testers, testerEmail] }
          : p
      )
    );
  };

  // 🔹 TST ➜ raportează bug
  const addBug = (bug) => {
    const newBug = {
      id: Date.now(),
      projectId: bug.projectId,
      description: bug.description,
      severity: bug.severity,
      priority: bug.priority,
      commitLink: bug.commitLink,
      reporter: bug.reporter,
      status: "Open",
      assignedTo: null,
      resolveCommit: null
    };

    setBugs((prev) => [...prev, newBug]);

    setProjects((prev) =>
      prev.map((p) =>
        p.id === bug.projectId
          ? { ...p, bugs: [...p.bugs, newBug.id] }
          : p
      )
    );
  };

  // 🔹 MP ➜ își alocă bug
  const assignBug = (bugId, userEmail) => {
    setBugs((prev) =>
      prev.map((b) =>
        b.id === bugId
          ? { ...b, assignedTo: userEmail, status: "In Progress" }
          : b
      )
    );
  };

  // 🔹 MP ➜ marchează rezolvat
  const resolveBug = (bugId, commitLink) => {
    setBugs((prev) =>
      prev.map((b) =>
        b.id === bugId
          ? { ...b, status: "Resolved", resolveCommit: commitLink }
          : b
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        bugs,

        addProject,
        addTesterToProject,
        addBug,
        assignBug,
        resolveBug
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
