import React from 'react';
import { useParams } from 'react-router-dom';

const Footer: React.FC = () => {
  const { teamID } = useParams<{ teamID: string }>();
  const isLiverpool = teamID === 'liverpool';
  const isBarcelona = teamID === 'barcelona';
  

 return (
    <div className="footer">
      <p>&copy; 2024 {isLiverpool? 'Liverpool FC': isBarcelona? 'Barcelona FC' : ''}</p>
      <p>All rights reserved</p>
    </div>
  );
};  
export default Footer;
