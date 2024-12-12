import React, { useState } from 'react';


interface AddPlayerProps {
  onAddPlayer: (player: { name: string; position: string; age: number; isInjured: boolean }) => void;
}

const AddPlayer: React.FC<AddPlayerProps> = ({ onAddPlayer }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [age, setAge] = useState<number>(0);
  const [isInjured, setIsInjured] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlayer({ name, position, age, isInjured });
    setName('');
    setPosition('');
    setAge(0);
    setIsInjured(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value) || 0)}
          required
        />
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="isInjured"
            checked={isInjured}
            onChange={(e) => setIsInjured(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isInjured">
            Is Injured
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Add Player</button>
    </form>
  );
};

export default AddPlayer;