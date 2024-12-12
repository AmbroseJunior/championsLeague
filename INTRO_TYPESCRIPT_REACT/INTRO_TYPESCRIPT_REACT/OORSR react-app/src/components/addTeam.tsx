import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTeam: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName) {
      const existingTeams = JSON.parse(localStorage.getItem('teams') || '[]');
      const newTeam = {
        id: Date.now(),
        name: teamName
      };
      const updatedTeams = [...existingTeams, newTeam];
      localStorage.setItem('teams', JSON.stringify(updatedTeams));
      navigate('/');
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
