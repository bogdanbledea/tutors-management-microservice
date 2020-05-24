import React from 'react';
import './App.css';
import Tutors from './components/Tutors/Tutors';

export type Tutor = {
  idTutor: number,
  name: string,
  professionalDegree: string,
  officeName: string,
  hireDate: string,
  dateOfBirth: string,
  email: string,
  phoneNumber: string,
  departamentName: string
}

function App() {
  return (
    <div className="App">
      <Tutors />
    </div>
  );
}

export default App;
