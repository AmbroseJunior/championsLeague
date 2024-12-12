import React, { createContext, useState } from 'react';

interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  isInjured: boolean;
  teamId?: number;
}

export const teamsData = {
  liverpool: {
    id: 1,
    teamName: 'Liverpool FC',
    slang: "You'll Never Walk Alone!",
    players: [
      { id: 1, name: 'Salah', age: 25, position: 'Forward', isInjured: false },
      { id: 2, name: 'Mane', age: 25, position: 'Forward', isInjured: false },
      { id: 3, name: 'Fabinho', age: 25, position: 'Forward', isInjured: true },
      { id: 4, name: 'Diaz', age: 25, position: 'Forward', isInjured: false },
      { id: 5, name: 'Coutinho', age: 25, position: 'Forward', isInjured: true },
      { id: 6, name: 'Cody', age: 25, position: 'Forward', isInjured: false },
      { id: 7, name: 'Firmino', age: 25, position: 'Forward', isInjured: true },
      { id: 8, name: 'Van Dijk', age: 25, position: 'Forward', isInjured: false },
      { id: 9, name: 'Nunez', age: 25, position: 'Forward', isInjured:  true },
      { id: 10, name: 'Alexander-Arnold', age: 25, position: 'Forward', isInjured: true },
      { id: 11, name: 'Jota', age: 25, position: 'Forward', isInjured: true },
      { id: 12, name: 'Chiesa', age: 25, position: 'Forward', isInjured: true },
    ],
  },
  barcelona: {
    id: 2,
    teamName: 'Barcelona FC',
    slang: 'Campeones del mundo',
    players: [
      { id: 1, name: 'Lamine Yamal', age: 25, position: 'Forward', isInjured: false },
      { id: 2, name: 'Olmo', age: 25, position: 'Forward', isInjured: true },
      { id: 3, name: 'Raphinha', age: 25, position: 'Forward', isInjured: false },
      { id: 4, name: 'Pedri', age: 25, position: 'Forward', isInjured: false },
      { id: 5, name: 'Ansu Fati', age: 35, position: 'Forward', isInjured: false },
      { id: 6, name: 'Lewandowski', age: 35, position: 'Forward', isInjured: false },
      { id: 7, name: 'Gavi', age: 35, position: 'Forward', isInjured: true },
      { id: 8, name: 'De jong', age: 35, position: 'Forward', isInjured: false },
      { id: 9, name: 'Rafael', age: 35, position: 'Forward', isInjured: true },
    ],
  },
};

export const PlayerContext = createContext({});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('players');
    return saved ? JSON.parse(saved) : teamsData;
  });

  const deletePlayer = (id: number, teamID: number) => {
    const allPlayers = JSON.parse(localStorage.getItem('players') || '[]');
    const updated = allPlayers.filter((p: Player) => p.id !== id);
    
    localStorage.setItem('players', JSON.stringify(updated));
    
    const teamPlayers = updated.filter((p: Player) => p.teamId === teamID);
    setPlayers(teamPlayers);
  };

  return (
    <PlayerContext.Provider value={{ players, deletePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

const Menu: React.FC = () => {
  return (
    <div>
      <h1>Teams</h1>
      <h2>{teamsData.liverpool.teamName}</h2>
      <h2>{teamsData.barcelona.teamName}</h2>
    </div>
  );
};

export default Menu;
