import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
import Login from '../Login'
import Register from '../Register'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
