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
    this.state = {
      time: '-',
      long: '-',
      lat: '-',
      data: {validate: false, user: '-'}
    }
      Store.subscribe(()=>{
      this.setState({
        data: Store.getState().userReducer.data
      });
    }); 
  }
  componentWillMount(){
    
    navigator.geolocation.watchPosition(
      position=>{this.setState({time:position.timestamp, long: position.coords.longitude, lat:position.coords.latitude});
      SetCoords(this.state.time,this.state.long, this.state.lat,Store.getState().userReducer.data.user);
      },
      error=>{alert("error")},
      {distanceFilter:5}
      );
         
  }
  componentWillUnmount(){
    navigator.geolocation.stopObserving();
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
