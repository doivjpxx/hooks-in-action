import React, { useState } from 'react';
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
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/all";
import UserPicker from "../components/Users/UserPicker";
import UserContext from "../components/Users/UserContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className="App">
          <header>
            <nav>
              <ul>
                <li>
                  <Link to="/bookings" className="btn btn-header">
                    <FaCalendarAlt/>
                    <span>Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/bookables" className="btn btn-header">
                    <FaDoorOpen/>
                    <span>Bookables</span>
                  </Link>
                </li>
                <li>
                  <Link to="/users" className="btn btn-header">
                    <FaUsers/>
                    <span>Users</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <UserPicker user={user} setUser={setUser}/>
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
    </UserContext.Provider>
  );
}

export default App;
