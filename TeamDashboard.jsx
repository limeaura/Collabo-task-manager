import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeamDashboard = ({ currentUser }) => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [joinTeam, setJoinTeam] = useState('');

  const username = currentUser?.name || 'Anonymous';

  const handleCreateTeam = () => {
    if (!teamName.trim()) return;

    const newTeam = {
      name: teamName.trim(),
      createdBy: username,
      members: [username], 
    };

    setTeams(prevTeams => [...prevTeams, newTeam]);
    setTeamName('');
    toast.success("Team created successfully!");
  };

  const handleJoinTeam = () => {
    if (!joinTeam.trim()) return;

    const updatedTeams = teams.map((team) => {
      if (
        team.name.toLowerCase() === joinTeam.trim().toLowerCase() &&
        !team.members.includes(username)
      ) {
        return {
          ...team,
          members: [...team.members, username],
        };
      }
      return team;
    });

    setTeams(updatedTeams);
    setJoinTeam('');
    toast.success("Successfully joined the team!");
  };

  const createdTeams = teams.filter(team => team.createdBy === username);
  const joinedTeams = teams.filter(team => team.members.includes(username));

  return (
    <div className="container">
      <h3 className="my-4 text-center">Team Dashboard</h3>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="card p-3 mb-3 shadow-sm">
        <h5>Create a Team</h5>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleCreateTeam}>Create</button>
      </div>

      <div className="card p-3 mb-3 shadow-sm">
        <h5>Join a Team</h5>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Enter team name"
          value={joinTeam}
          onChange={(e) => setJoinTeam(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleJoinTeam}>Join</button>
      </div>

      <div className="card p-3 mb-3 shadow-sm">
        <h5>Teams You Created</h5>
        {createdTeams.length === 0 ? (
          <p className="text-muted">You haven't created any teams yet.</p>
        ) : (
          <ul className="list-group">
            {createdTeams.map((team, index) => (
              <li key={index} className="list-group-item">
                <strong>{team.name}</strong><br />
                <small><strong>Created By:</strong> {team.createdBy}</small><br />
                <small><strong>Members:</strong> {team.members.length}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card p-3 shadow-sm">
        <h5>Teams You Joined</h5>
        {joinedTeams.length === 0 ? (
          <p className="text-muted">You haven't joined any teams yet.</p>
        ) : (
          <ul className="list-group">
            {joinedTeams.map((team, index) => (
              <li key={index} className="list-group-item">
                <strong>{team.name}</strong><br />
                <small><strong>Created By:</strong> {team.createdBy}</small><br />
                <small><strong>Members:</strong> {team.members.length}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeamDashboard;
