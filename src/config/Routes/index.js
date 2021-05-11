import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from '../../components/pages/Dashboard/index';
import Register from '../../components/pages/Register'
import Login from'../../components/pages/Login' ;

const Routes = () => {
  return (
    <Router>
      <Switch>
      <Route path="/register">
          <Register />
        </Route>
        
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Login />
        </Route>
        
       
      </Switch>
    </Router>
  );
};

export default Routes;