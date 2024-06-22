import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Tasks from './Components/Tasks';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Tasks" element={<Tasks/>}/>

        </Routes>

      </Router>
    </div>
  );
}

export default App;
