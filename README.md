# Champions League App

This repository hosts a Champions League app built with a **Vite React.js frontend** and a **JSON server backend**. The app allows users to create teams and players data, manage them with full CRUD functionality, and ensures data consistency between the frontend and backend.

---

## Features

- **Teams Management**: Create, read, update, and delete teams.
- **Players Management**: Add players to specific teams, update player details, and remove players.
- **Backend Integration**: All operations reflect in the backend using a JSON server with localhost storage.
- **Responsive Frontend**: Built with React.js to deliver a smooth and interactive user experience.

---

## Prerequisites

Ensure you have the following installed on your system:

1. **Node.js** (version 14 or later)
2. **npm** or **pnpm**
3. **Vite** (for the React.js frontend)

---

## Getting Started

### 1. Clone the Repository

```bash
# Clone this repository
git clone <repository-url>
cd 
championsLeague

```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

## Project Structure

```
    championsLeague/
├── frontend/       # React.js frontend
├── backend/        # JSON server backend
└── README.md       # Documentation
```

### Frontend (React.js)

Located in the `frontend/` folder. This directory includes the Vite React.js app.

### Backend (JSON Server)

Located in the `backend/` folder. This directory contains the JSON server setup with a local `db.json` file to store data persistently.

---

## Running the Application

### 1. Start the Backend (JSON Server)

```bash
cd backend
npx json-server --watch team.json --port 3000
```

- **JSON Server URL**: `http://localhost:3000`

### 2. Start the Frontend (Vite React.js)

```bash
cd frontend
npm run dev
```

- **Frontend URL**: `http://localhost:5173`

---

## Backend Configuration

The `team.json` file acts as the database for the application. Below is an example structure:

```json
{
  "teams": [
    {
      "id": 1,
      "name": "Team A",
      "players": [
        { "id": 1, "name": "Player 1", "position": "Forward", "teamid": 1 },
        { "id": 2, "name": "Player 2", "position": "Midfielder", "teamid": 1 }
      ]
    },
    {
      "id": 2,
      "name": "Team B",
      "players": []
      
    }
  ]
}
```

---

## CRUD Operations

### Teams

- **Create**: Add a new team.
- **Read**: View the list of all teams.
- **Update**: Edit team details.
- **Delete**: Remove a team.

### Players

- **Create**: Add a new player to a team.
- **Read**: View players under a specific team.
- **Update**: Edit player details.
- **Delete**: Remove a player from a team.

---

## API Endpoints

### Teams

- `GET /teams`: Fetch all teams.
- `POST /teams`: Create a new team.
- `PUT /teams/:id`: Update a team.
- `DELETE /teams/:id`: Delete a team.

### Players

- `GET /teams/:teamId/players`: Fetch players under a team.
- `POST /teams/:teamId/players`: Add a player to a team.
- `PUT /teams/:teamId/players/:playerId`: Update a player's details.
- `DELETE /teams/:teamId/players/:playerId`: Remove a player.

---

## Development Notes

1. **Cross-Origin Requests**: Ensure CORS is enabled in the development environment if accessing the JSON server from a different host/port.
2. **Persistent Data**: All data changes are stored in `db.json`.
3. **Environment Variables**: Use a `.env` file in the frontend to manage backend URLs.

---

## Troubleshooting

### Common Issues

- **JSON Server Not Found**: Ensure `json-server` is installed globally or use `npx`.
- **Port Conflicts**: Check if another application is using ports `5000` or `5173`.
- **CORS Errors**: Use a proxy or adjust CORS settings to allow communication between frontend and backend.

---

## Contribution

Feel free to contribute to this project by submitting issues or pull requests. Ensure your code follows best practices and includes necessary tests/documentation.

---

## License

This project does not currently have a specified license. If you intend to use, modify, or distribute this project, please contact the repository owner for permissions.

## Acknowledgments

Vite for the fast React.js development environment.

JSON Server for simplifying backend setup.

The open-source community for tools and libraries.



