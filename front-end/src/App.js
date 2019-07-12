import React from 'react';
import './App.css';

import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <div className="container">
        <h1>Test Aplication</h1>
        <div className="row">
            <div className="col-md-6">
                <Login/>
            </div>
            <div className="col-md-6">
                <Signup/>
            </div>
        </div>
    </div>
  );
}

export default App;
