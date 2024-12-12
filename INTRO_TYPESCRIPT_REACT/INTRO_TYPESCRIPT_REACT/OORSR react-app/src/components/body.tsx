import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddPlayer from './addplayerForm';

interface Player {
  id: number;
  name: string;
  position: string;
  teamId: string | number;
  age: number;
  isInjured: boolean;
}

const Body: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [teamName, setTeamName] = useState('');
  const { teamID } = useParams();
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  useEffect(() => {
    // Debug: Log the teamID and stored teams
    console.log('Current teamID:', teamID);
    
    const storedTeams = localStorage.getItem('teams');
    console.log('Stored teams:', storedTeams);
    
    if (storedTeams) {
      const teams = JSON.parse(storedTeams);
      console.log('Parsed teams:', teams);
      const team = teams.find((t: any) => t.id.toString() === teamID);
      console.log('Found team:', team);
      setTeamName(team?.name);
    } else {
      setTeamName(`Team ${teamID}`);  
    }
    
    // Load players from localStorage and filter by team
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers);
      // Only show players for current team
      const teamPlayers = parsedPlayers.filter((p: Player) => p.teamId === teamID);
      setPlayers(teamPlayers);
      setPlayerCount(teamPlayers.length);
    }
  }, [teamID]);

  useEffect(() => {
    setPlayerCount(players.length);
  }, [players]);

  const handleAddPlayer = (newPlayer: { name: string, position: string, age: number, isInjured: boolean }) => {
    const player: Player = {
      id: Date.now(),
      ...newPlayer,
      teamId: teamID || ''
    };

    // Get all existing players
    const existingPlayers = JSON.parse(localStorage.getItem('players') || '[]');
    const updatedPlayers = [...existingPlayers, player];
    
    // Update localStorage with all players
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    
    // Update state with only this team's players
    setPlayers(prev => [...prev, player]);
  };

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
  };

  const handleDelete = (playerId: number) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      const updatedPlayers = players.filter(p => p.id !== playerId);
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
    }
  };

  const handleSaveEdit = (player: Player) => {
    const updatedPlayers = players.map(p => 
      p.id === player.id ? player : p
    );
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    setEditingPlayer(null);
  };

  const gobacktoTeam = () => {
    const path = '/';
    window.location.href = path;
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h2 className="mb-0 fw-bold" style={{ color: '#fff' }}>
                {teamName}
              </h2>
              <span className="badge bg-light text-primary">
                Players: {playerCount}
              </span>
            </div>
            
            <div className="card-body">
              <h3 className="card-title">Add New Player</h3>
              <AddPlayer onAddPlayer={handleAddPlayer} />
              
              <h3 className="card-title mt-4">Player List</h3>
              <button className="btn btn-primary mb-3" onClick={gobacktoTeam}>Go Back to Teams</button>
              <div className="list-group">
                {players.map(player => (
                  <div 
                    key={player.id}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${player.isInjured ? 'text-danger' : 'text-success'}`}
                  >
                    {editingPlayer?.id === player.id ? (
                      <div className="w-100">
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editingPlayer.name}
                          onChange={(e) => setEditingPlayer({...editingPlayer, name: e.target.value})}
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editingPlayer.position}
                          onChange={(e) => setEditingPlayer({...editingPlayer, position: e.target.value})}
                        />
                        <input
                          type="number"
                          className="form-control mb-2"
                          value={editingPlayer.age}
                          onChange={(e) => setEditingPlayer({...editingPlayer, age: parseInt(e.target.value) || 0})}
                        />
                        <div className="form-check mb-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={editingPlayer.isInjured}
                            onChange={(e) => setEditingPlayer({...editingPlayer, isInjured: e.target.checked})}
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
