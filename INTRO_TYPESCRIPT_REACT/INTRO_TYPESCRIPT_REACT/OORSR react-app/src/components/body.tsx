import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddPlayer from './addplayerForm';

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  isInjured: boolean;
  teamid: string;

}

interface Team {
  id: number;
  name: string;
  players: Player[];
}

const Body: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [teamName, setTeamName] = useState('');
  const { teamID } = useParams(); 
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  // Fetch the team and player data when the component loads
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/teams/${teamID}`);
        const team: Team = response.data;
  
        // Ensure the team ID is coerced to a string for consistent comparisons
        if (String(team.id) === String(teamID)) {
          setTeamName(team.name || 'Unknown Team');
          setPlayers(team.players || []);
        }
  
        // Sync players with localStorage
        const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
        const updatedTeams = storedTeams.map((storedTeam: Team) =>
          String(storedTeam.id) === String(teamID) ? team : storedTeam
        );
        localStorage.setItem('teams', JSON.stringify(updatedTeams));
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };
  
    fetchTeamData();
  }, [teamID]);
  

  useEffect(() => {
    setPlayerCount(players.length); // Update player count whenever players change
  }, [players]);

  const handleAddPlayer = async (newPlayer: { name: string; position: string; age: number; isInjured: boolean }) => {
    try {
      // Step 1: Fetch existing players to calculate the next id
      const response = await axios.get('http://localhost:3000/players');
      const existingPlayers = response.data;
  
      // Calculate the next id based on the array length
      const nextId = existingPlayers.length > 0 ? existingPlayers.length + 1 : 1;
  
      // Step 2: Create the new player object
      const player: Player = {
        id: nextId, // Use the calculated id
        ...newPlayer,
        teamid: String(teamID), // Ensure the player is linked to the correct team
      };
  
      // Step 3: POST the new player to the global /players endpoint
      await axios.post('http://localhost:3000/players', player);
  
      // Step 4: Fetch the current team data
      const teamResponse = await axios.get(`http://localhost:3000/teams/${teamID}`);
      const team: Team = teamResponse.data;
  
      // Step 5: Update the team's players array
      const updatedTeam = {
        ...team,
        players: [...team.players, player],
      };
  
      // PUT the updated team back to json-server
      await axios.put(`http://localhost:3000/teams/${teamID}`, updatedTeam);
  
      // Step 6: Update state and localStorage
      setPlayers(updatedTeam.players);
      setPlayerCount(updatedTeam.players.length);
  
      const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
      const updatedTeams = storedTeams.map((storedTeam: Team) =>
        String(storedTeam.id) === String(teamID) ? updatedTeam : storedTeam
      );
      localStorage.setItem('teams', JSON.stringify(updatedTeams));
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };
  
  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
  };

  const handleSaveEdit = async (player: Player) => {
    try {
      // Update the player's data in the local team
      const updatedPlayers = players.map(p => (p.id === player.id ? player : p));

      // PUT the updated team back to json-server
      const response = await axios.get(`http://localhost:3000/teams/${teamID}`);
      const team: Team = response.data;

      const updatedTeam = {
        ...team,
        players: updatedPlayers,
      };

      await axios.put(`http://localhost:3000/teams/${teamID}`, updatedTeam);

      // Update state and localStorage
      setPlayers(updatedPlayers);

      const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
      const updatedTeams = storedTeams.map((storedTeam: Team) =>
        storedTeam.id === team.id ? updatedTeam : storedTeam
      );
      localStorage.setItem('teams', JSON.stringify(updatedTeams));

      setEditingPlayer(null);
    } catch (error) {
      console.error('Error saving player edits:', error);
    }
  };

  const handleDelete = async (playerId: number) => {
    try {
      console.log('Attempting to delete player with ID:', playerId);
  
      // DELETE the player from the /players endpoint
      await axios.delete(`http://localhost:3000/players/${playerId}`);
      console.log('Player deleted from /players');
  
      // Fetch the current team from /teams/:teamID
      const teamResponse = await axios.get(`http://localhost:3000/teams/${teamID}`);
      const team: Team = teamResponse.data;
  
      // Remove the player from the team's players array
      const updatedPlayers = team.players.filter(p => p.id !== playerId);
  
      const updatedTeam = {
        ...team,
        players: updatedPlayers,
      };
  
      // PUT the updated team back to /teams/:teamID
      await axios.put(`http://localhost:3000/teams/${teamID}`, updatedTeam);
      console.log('Player removed from team and updated on /teams/:teamID');

      
      // Update state and localStorage
      setPlayers(updatedPlayers);
      setPlayerCount(updatedPlayers.length);
  
      const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
      const updatedTeams = storedTeams.map((storedTeam: Team) =>
        String(storedTeam.id) === String(teamID) ? updatedTeam : storedTeam
      );
      localStorage.setItem('teams', JSON.stringify(updatedTeams));
  
      console.log('Player successfully deleted and state updated');
    } catch (error) {
      console.error('Error deleting player:', error);
  
      // Error handling
      if (axios.isAxiosError(error)) {
        alert(`Failed to delete the player: ${error.response?.data || error.message}`);
      } else {
        alert('An unknown error occurred. Please try again.');
      }
    }
  };
  
  const gobacktoTeam = () => {
    window.location.href = '/';
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h2 className="mb-0 fw-bold">{teamName}</h2>
              <span className="badge bg-light text-primary">Players: {playerCount}</span>
            </div>

            <div className="card-body">
              <h3 className="card-title">Add New Player</h3>
              <AddPlayer onAddPlayer={handleAddPlayer} />

              <h3 className="card-title mt-4">Player List</h3>
              <button className="btn btn-primary mb-3" onClick={gobacktoTeam}>
                Go Back to Teams
              </button>
              <div className="list-group">
                {players.map(player => (
                  <div
                    key={player.id}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                      player.isInjured ? 'text-danger' : 'text-success'
                    }`}
                  >
                    {editingPlayer?.id === player.id ? (
                      <div className="w-100">
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editingPlayer.name}
                          onChange={e => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editingPlayer.position}
                          onChange={e => setEditingPlayer({ ...editingPlayer, position: e.target.value })}
                        />
                        <input
                          type="number"
                          className="form-control mb-2"
                          value={editingPlayer.age}
                          onChange={e =>
                            setEditingPlayer({ ...editingPlayer, age: parseInt(e.target.value) || 0 })
                          }
                        />
                        <div className="form-check mb-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={editingPlayer.isInjured}
                            onChange={e =>
                              setEditingPlayer({ ...editingPlayer, isInjured: e.target.checked })
                            }
                          />
                          <label className="form-check-label">Is Injured</label>
                        </div>
                        <div>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleSaveEdit(editingPlayer)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingPlayer(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <strong>{player.name}</strong>
                          <br />
                          <div className="ms-3">
                            {player.position} • Age: {player.age}
                            {player.isInjured && <span className="ms-2">(Injured)</span>}
                          </div>
                        </div>
                        <div>
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => handleEdit(player)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(player.id)}
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
      </div>
    </div>
  );
};

export default Body;
