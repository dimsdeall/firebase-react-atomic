import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
import Login from '../Login'
import Register from '../Register'
import {Provider} from 'react-redux'
import './App.css'
import {store} from '../../../config/redux'

function App() {

  return (
    <Provider store={store}>
    <Router>
      <div>
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
    </Provider>
  );
}

export default App;
