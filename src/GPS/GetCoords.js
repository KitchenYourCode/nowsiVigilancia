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
    });
    this.state = {
      time: '-',
      long: '-',
      lat: '-',
      data: {validate: false, user: '-'},
      direccion: '-'
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
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.lat+','+this.state.long+'&location_type=ROOFTOP&result_type=street_address&key=AIzaSyA_pR17KAqw8D8nGQGSl31X0LosEtwpvUg')
        .then(response => response.json())
        .then(json => {console.log(json.results[0].formatted_address); this.setState({direccion:json.results[0].formatted_address}) });
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
        <Text>Direccion: {this.state.direccion}</Text>
        <Text>User: {Store.getState().userReducer.data.user}</Text>
      </View>
    );
  }
}
