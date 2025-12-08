/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  // Lista tuturor proiectelor
  const [projects, setProjects] = useState([]);

  // Lista globală a bug-urilor
  const [bugs, setBugs] = useState([]);

  // ============================
  // MP ➜ Adaugă proiect
  // ============================
  const addProject = (project) => {
    setProjects(prev => [
      ...prev,
      {
        id: Date.now(),
        name: project.name,
        repo: project.repo,
        owner: project.owner,
        team: project.team || [],
        testers: [],      // TST se va adăuga aici
        bugs: []          // lista de ID-uri de bug-uri
      }
    ]);
  };

  // ============================
  // TST ➜ Se alătură unui proiect
  // ============================
  const addTesterToProject = (projectId, testerEmail) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === projectId
          ? { ...p, testers: [...p.testers, testerEmail] }
          : p
      )
    );
  };

  // ============================
  // MP sau TST ➜ Adaugă bug în proiect
  // ============================
  const addBug = (bug) => {
    const newBug = {
      id: Date.now(),
      title: bug.title,
      severity: bug.severity,
      priority: bug.priority,
      description: bug.description,
      commitLink: bug.commitLink,
      projectId: bug.projectId,
      status: "Open",
      assignedTo: null
    };

    // Adaugăm bug-ul în lista globală
    setBugs(prev => [...prev, newBug]);

    // Și îl adăugăm în proiectul corespunzător
    setProjects(prev =>
      prev.map(p =>
        p.id === bug.projectId
          ? { ...p, bugs: [...p.bugs, newBug.id] }
          : p
      )
    );
  };

  // ============================
  // MP ➜ Își alocă un bug
  // ============================
  const assignBug = (bugId, userEmail) => {
    setBugs(prev =>
      prev.map(b =>
        b.id === bugId
          ? { ...b, assignedTo: userEmail, status: "In Progress" }
          : b
      )
    );
  };

  // ============================
  // MP ➜ Marchează bug ca rezolvat
  // ============================
  const resolveBug = (bugId, commitLink) => {
    setBugs(prev =>
      prev.map(b =>
        b.id === bugId
          ? { ...b, status: "Resolved", resolveCommit: commitLink }
          : b
      )
    );
  };

  return (
    <AppContext.Provider value={{
      projects,
      addProject,
      addTesterToProject,

      bugs,
      addBug,
      assignBug,
      resolveBug
    }}>
      {children}
    </AppContext.Provider>
  );
};
