import React, { Component } from 'react';
import { NativeRouter, Route, Link, Switch, Router } from 'react-router-native';
import createHistory from "history/createMemoryHistory";

import Splash from './Splash'
import GPS from './GPS/Index'

const history = createHistory();
const location = history.location;

export default class Rutas extends Component<Props> {
  render() {
    return (
      <Router history={history}>
          <Switch>
            <Route exact path="/" component={Splash}/>
            <Route path="/GPS" component={GPS}/>
          </Switch>
      </Router>
    );
  }
}