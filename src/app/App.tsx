import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import BookingsPage from "../pages/BookingsPage";
import BookablesPage from "../pages/BookablesPage";
import UsersPage from "../pages/UsersPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Switch>
        <Route path="/bookings">
          <BookingsPage/>
        </Route>
        <Route path="/bookables">
          <BookablesPage/>
        </Route>
        <Route path="/users">
          <UsersPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
