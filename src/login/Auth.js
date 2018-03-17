import React, { Component } from 'react';
import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBuUG3ksrLRuXyjcLhOpM0deV0Cow9YXng",
    authDomain: "mapas-7c0d0.firebaseapp.com",
    databaseURL: "https://mapas-7c0d0.firebaseio.com",
    projectId: "mapas-7c0d0",
    storageBucket: "mapas-7c0d0.appspot.com",
    messagingSenderId: "439976486711"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class Auth extends Component<Props> {
	constructor(props){
		super(props);
		firebaseApp.auth().signInWithEmailAndPassword(this.props.email, this.props.password).then(success=>console.log("exito")).catch(error=>console.log("error"));
	}
}