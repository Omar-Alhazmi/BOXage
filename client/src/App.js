import React, {Component}from 'react';
import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './toggleHandler';
export default class App extends Component {
 
render() {
  return (
    <Router>
    <Switch>
      <Route path='/' component={Home} exact />
    </Switch>
    </Router>

  )
}
};
