import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  BackHandler,
  View,
  Alert,
  Image
} from 'react-native';
import { SetCoords } from './../HandleFirebase';
import Store from './../Store'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import GPSState from 'react-native-gps-state';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning Each', 'Warnign: Failed'];
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
    GPSState.addListener((status)=>{
    switch(status){
      case GPSState.NOT_DETERMINED:
        alert('Please, allow the location, for us to do amazing things for you!');
      break;

      case GPSState.RESTRICTED:
        GPSState.openSettings();
      break;

      case GPSState.DENIED:
        alert('It`s a shame that you do not allowed us to use location :(');
      break;

      case GPSState.AUTHORIZED_ALWAYS:
        //TODO do something amazing with you app
      break;

      case GPSState.AUTHORIZED_WHENINUSE:
        //TODO do something amazing with you app
      break;
    }
  });
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
 /* componentWillUnmount(){
    GPSState.removeListener();
    navigator.geolocation.stopObserving();
    SetCoords(null, null, null, null, false, Store.getState().userReducer.data.userId);
    console.log("se desmonto");
  }*/
  exitAppFunc(){
    GPSState.removeListener();
    navigator.geolocation.stopObserving();
    SetCoords(null, null, null, null, false, Store.getState().userReducer.data.userId);
    console.log("se desmonto");
  }
  render() {
    return (

        <Container>
        <Header>
          <Left>
            <Button iconLeft small transparent onPress={()=>{this.exitAppFunc.bind(this); this.props.history.goBack()/*return BackHandler.exitApp();*/}}>
              <Icon name='close' />
            </Button>
          </Left>
          <Body>
            <Title>Nowsi</Title>
          </Body>
        </Header>
        <View style={style.wrapperTitle}>
        <Image 
            style={style.logo}
            source={require('./../img/Octocat.png')} />
            <Text>{Store.getState().userReducer.data.user}</Text>
             <Text>Ubicacion actual:</Text>
             <Text> {this.state.direccion}</Text>
             <Text> {this.state.lat}</Text>
             <Text> {this.state.long}</Text>
            </View>
       
        
      </Container>


    );
  }
}

const style = StyleSheet.create({
  wrapper:{
    backgroundColor: '#f39c12',
    flex: 1,
  },
  title:{
    color: 'white',
    fontSize: 35
  },
  wrapperTitle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    width:100,
    height: 100
  }
});