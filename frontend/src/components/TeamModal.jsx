import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function TeamModal({ onClose }) {
  const { user, setUser } = useContext(AuthContext);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [creating, setCreating] = useState(false);
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/teams/my", { withCredentials: true });
        setTeam(res.data);
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const handleCreate = async () => {
    if (!teamName.trim()) return alert("Team name is required.");
    setCreating(true);
    try {
      const res = await axios.post("http://localhost:3000/teams", { name: teamName, description: teamDesc }, { withCredentials: true });
      // Refresh user info so teamId is set in context
      const userRes = await axios.get("http://localhost:3000/users/me", { withCredentials: true });
      if (userRes.data && setUser) setUser(userRes.data);
      // Refresh team data to get full team with Users
      const teamRes = await axios.get("http://localhost:3000/teams/my", { withCredentials: true });
      setTeam(teamRes.data);
      alert("Team created!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating team.");
    } finally {
      setCreating(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return alert("Email is required.");
    setInviting(true);
    try {
      await axios.post("http://localhost:3000/teams/invite", { email: inviteEmail }, { withCredentials: true });
      alert("User invited!");
      setInviteEmail("");
      // Refresh team members
      const res = await axios.get("http://localhost:3000/teams/my", { withCredentials: true });
      setTeam(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error inviting user.");
    } finally {
      setInviting(false);
    }
  };

  if (loading) return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p>Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Team Management</h2>

        {!team || !team.id ? (
          <div>
            <p>You are not in a team yet.</p>
            <input
              type="text"
              placeholder="Team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={teamDesc}
              onChange={(e) => setTeamDesc(e.target.value)}
              style={{ marginTop: "0.5rem" }}
            />
            <button className="btn primary" onClick={handleCreate} disabled={creating} style={{ marginTop: "0.5rem" }}>
              {creating ? "Creating..." : "Create Team"}
            </button>
          </div>
        ) : (
          <div>
            <h3>{team.name}</h3>
            <p className="muted">{team.description || "No description."}</p>

            <h4 style={{ marginTop: "1rem" }}>Members</h4>
            {team.Users && team.Users.length > 0 ? (
              <ul>
                {team.Users.map((u) => (
                  <li key={u.id}>{u.email} ({u.role})</li>
                ))}
              </ul>
            ) : (
              <p>No members.</p>
            )}

            <h4 style={{ marginTop: "1rem" }}>Invite MP</h4>
            <input
              type="email"
              placeholder="User email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <button className="btn primary" onClick={handleInvite} disabled={inviting} style={{ marginLeft: "0.5rem" }}>
              {inviting ? "Inviting..." : "Invite"}
            </button>
          </div>
        )}

        <button className="btn ghost" onClick={onClose} style={{ marginTop: "1rem" }}>Close</button>
      </div>
    </div>
  );
}
