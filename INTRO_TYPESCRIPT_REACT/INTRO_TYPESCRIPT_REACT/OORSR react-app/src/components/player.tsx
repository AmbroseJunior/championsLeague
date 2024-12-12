import React from "react";

interface PlayerData {
  id: number;
  name: string;
  age: number;
  position: string;
  isInjured: boolean;
}

interface PlayerProps {
  player: PlayerData;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  onSave: (updatedPlayer: PlayerData) => void;
}

const Player: React.FC<PlayerProps> = ({ player, onEdit, onDelete, isEditing, onSave }) => {
  if (isEditing) {
    return (
      <div className={`player ${player.isInjured ? 'injured' : ''}`}>
        <form onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = {
            ...player,
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            age: parseInt((form.elements.namedItem('age') as HTMLInputElement).value),
            position: (form.elements.namedItem('position') as HTMLInputElement).value,
            isInjured: (form.elements.namedItem('isInjured') as HTMLInputElement).checked
          };
          onSave(formData);
        }}>
          {/* Add form fields here */}
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`player ${player.isInjured ? 'injured' : ''}`}>
      <h3>{player.name}</h3>
      <p>Age: {player.age}</p>
      <p>Position: {player.position}</p>
      <p>Status: {player.isInjured ? 'Injured' : 'Active'}</p>
      <div className="player-actions">
        <button onClick={() => onEdit(player.id)}>Edit</button>
        <button onClick={() => onDelete(player.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Player;
