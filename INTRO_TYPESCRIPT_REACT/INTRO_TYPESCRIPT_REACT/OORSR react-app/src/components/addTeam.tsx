import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const AddTeam: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName) {
      try {
        // Fetch existing teams to calculate the next id
        const response = await axios.get('http://localhost:3000/teams');
        const existingTeams = response.data;
        const nextId = existingTeams.length > 0 ? (Math.max(...existingTeams.map((team: { id: number }) => Number(team.id))) + 1).toString() : "1";
  
        // Create the new team
        const newTeam = {
          id: nextId, // Store id as a string
          name: teamName,
          players: [], // Initialize with an empty players array
        };
  
        // POST the new team to json-server
        await axios.post('http://localhost:3000/teams', newTeam);
  
        // Sync with localStorage
        const updatedTeams = [...existingTeams, newTeam];
        localStorage.setItem('teams', JSON.stringify(updatedTeams));
  
        navigate('/');
      } catch (error) {
        console.error('Error adding team:', error);
      }
    }
  };


  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="teamName" className="form-label" color='#ebeef3'>Team Name</label>
          <input
            type="text"
            id="teamName"
            className="form-control"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Team</button>
      </form>
    </div>
    <div className="mt-2">
      <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
    </div>
  );  
  </>
  );
};

export default AddTeam;
