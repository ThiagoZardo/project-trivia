import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Play from './pages/Play';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/play" component={ Play } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
