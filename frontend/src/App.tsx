import React from 'react';
import './App.css';
import axios from 'axios';
import Tutors from './components/Tutors/Tutors';

function App() {
  const access_key = process.env.REACT_APP_API_KEY;
  axios.get(`/tutors?access_token=${access_key}`)
  .then(res => {
    // console.log(res);
  })
  return (
    <div className="App">
      <Tutors />
    </div>
  );
}

export default App;
