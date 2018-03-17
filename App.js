import React, { Component } from 'react';
import { View } from 'react-native'
import Rutas from './src/Rutas.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);

  }
 
  render() {
    return (
        <Rutas/>
    );
  }
}

