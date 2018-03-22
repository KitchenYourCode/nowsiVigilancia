import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Button
} from 'react-native';
import { SetCoords } from './../HandleFirebase';
import Store from './../Store'
type Props = {};

export default class GetCoords extends Component<Props> {
  constructor(props){
    super(props);
    
    Store.subscribe(()=>{
      /*this.setState({
        data: Store.getState().userReducer.data,
        timeRefresh: Store.getState().timerRefreshCoordsReducer.data.timer
      });*/
    });
    this.state = {
      time: '-',
      long: '-',
      lat: '-',
      data: {validate: false, user: '-'}
    }
       
  }
  componentWillMount(){
    console.log(Store.getState());
    navigator.geolocation.watchPosition(
      position=>{this.setState({time:position.timestamp, long: position.coords.longitude, lat:position.coords.latitude});
      },
      error=>{alert("error")},
      {distanceFilter:5}
      );

    setInterval(()=>{
      let tiempo = new Date();
      if (this.state.long !== '-') {
        SetCoords(tiempo.getTime(),this.state.long, this.state.lat,Store.getState().userReducer.data.user, true,Store.getState().userReducer.data.userId );
      }
    }, 5000);
    
  }
  componentWillUnmount(){
    navigator.geolocation.stopObserving();
    SetCoords(null, null, null, null, false, Store.getState().userReducer.data.userId);
    console.log("se desmonto");
  }
  render() {
    return (
      <View>
        <Text>Tiempo: {this.state.time}</Text>
        <Text>Longitud: {this.state.long}</Text>
        <Text>Latitud: {this.state.lat}</Text>
        <Text>User: {Store.getState().userReducer.data.user}</Text>
      </View>
    );
  }
}
