import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddProjectModal from "../components/AddProjectModal";
import ProjectTable from "../components/ProjectTable";
import ProjectsListForTester from "../components/ProjectsListForTester";
import BugListForMP from "../components/BugListForMP";



export default function Home() {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  if (!user) {
    return <h2>Creeaza un cont sau autentifica-te pentru a vedea proiectele</h2>;
  }

  if (user.role === "MP") {
  return (
    <>
      <h2>Proiectele mele</h2>
      <ProjectTable />

      <button className="add-btn" onClick={() => setShowModal(true)}>
        Adauga un proiect
      </button>

      {showModal && <AddProjectModal onClose={() => setShowModal(false)} />}

      {/* AICI BUG-URILE PROIECTELOR MELE */}
      <BugListForMP />
    </>
  );
}


  if (user.role === "TST") {
    return (
      <>
        <h2>Nu faci parte dintr-o echipa</h2>
        <ProjectsListForTester />
      </>
    );
  }
}
