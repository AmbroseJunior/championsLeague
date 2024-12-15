import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Team {
  id: number;
  name: string;
}

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  isInjured: boolean;
  teamid: string;

}

const TeamList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState('');

  // Fetch teams from json-server
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/teams');
        const fetchedTeams = response.data;

        // Synchronize with localStorage
        const storedTeams = localStorage.getItem('teams');
        if (!storedTeams) {
          localStorage.setItem('teams', JSON.stringify(fetchedTeams));
        }

        // Set state with either fetched or localStorage data
        setTeams(fetchedTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
        alert('Failed to fetch teams. Please try again.');
      }
    };

    fetchTeams();
  }, []);


  // Handle editing the team name
  const handleEditTeamName = (teamId: number, newName: string) => {
    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, name: newName } : team
    );
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    setEditingTeamId(null); // Exit edit mode
  };

  // Handle deleting a team
  const handleDeleteTeam = async (teamId: string | number) => {
    try {
      // DELETE the team from the /teams endpoint
      await axios.delete(`http://localhost:3000/teams/${teamId}`);
  
      // DELETE all players associated with this team from /players
      const response = await axios.get('http://localhost:3000/players');
      const playersToDelete = response.data.filter((player: Player) => player.teamid === String(teamId));
  
      for (const player of playersToDelete) {
        await axios.delete(`http://localhost:3000/players/${player.id}`);
      }
  
      // Update state and localStorage
      const updatedTeams = teams.filter((team: Team) => team.id !== Number(teamId));
      setTeams(updatedTeams);
      localStorage.setItem('teams', JSON.stringify(updatedTeams));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };
  
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="fw-bold" style={{ color: '#ebeef3' }}>Teams</h2>
            <Link to="/add-team" className="btn btn-primary">Add New Team</Link>
          </div>
          <div className="list-group">
            {teams.map(team => (
              <div 
                key={team.id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                {editingTeamId === team.id ? (
                  <>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="form-control"
                      style={{ maxWidth: '70%' }}
                    />
                    <div>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleEditTeamName(team.id, editedName)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingTeamId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to={`/team/${team.id}`} className="flex-grow-1">
                      {team.name}
                    </Link>
                    <div>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => {
                          setEditingTeamId(team.id);
                          setEditedName(team.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteTeam(team.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamList;
