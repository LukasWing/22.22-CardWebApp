import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      <Modal show={true}>
        <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>
      </Modal>
    </div>
  );
}

export default App;
