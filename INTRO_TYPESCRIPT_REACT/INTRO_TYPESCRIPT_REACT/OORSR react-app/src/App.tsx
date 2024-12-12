import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import backgroundImage from './assets/cup.jpg';
import AddTeam from './components/addTeam';
import Body from './components/body';
import Footer from './components/footer';
import TeamList from './components/teamList';

const App: React.FC = () => {
const greetings = 'Welcome Champions!';
  return (
    <Router>
      <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="main-content">
          <h1 className="greetings" color='#ebeef3'>{greetings}</h1>
          <Routes>
          <Route path="/" element={<TeamList />} />
        <Route path="/add-team" element={<AddTeam />} />
        <Route path="/team/:teamID" element={<Body />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
