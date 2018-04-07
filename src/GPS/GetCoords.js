import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  BackHandler,
  View,
  Alert,
  Image
} from 'react-native';
import { SetCoords, signOut } from './../HandleFirebase';
import Store from './../Store'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';


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
      direccion: 'Geocodificando...',
      userActive: false
    }
    
       
  }
  componentWillMount(){
    navigator.geolocation.watchPosition(
      position=>{this.setState({time:position.timestamp, long: position.coords.longitude, lat:position.coords.latitude});
      },
      error=>{alert("Error GPS no detectado")},
      {distanceFilter:5}
      );
    if (Store.getState().userReducer.data.validate) {
    setInterval(()=>{
      let tiempo = new Date();
      if (this.state.long !== '-') {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.lat+','+this.state.long+'&location_type=ROOFTOP&result_type=street_address&key=AIzaSyA_pR17KAqw8D8nGQGSl31X0LosEtwpvUg')
        .then(response => response.json())
        .then(json => {console.log(json.results[0].formatted_address); this.setState({direccion:json.results[0].formatted_address}) });
        SetCoords(tiempo.getTime(),this.state.long, this.state.lat,Store.getState().userReducer.data.user, Store.getState().userReducer.data.validate,Store.getState().userReducer.data.userId );
      }
    }, 5000);
    }
  }

  exitAppFunc(){
    signOut(Store.getState().userReducer.data.userId);
    navigator.geolocation.stopObserving();
  }
  render() {
    return (

        <Container>
        <Header>
          <Left>
            <Button iconLeft small transparent onPress={()=>{this.exitAppFunc(); this.props.history.goBack()/*return BackHandler.exitApp();*/}}>
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