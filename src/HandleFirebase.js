import * as firebase from 'firebase';
import Store from './Store'
const firebaseConfig = {
    apiKey: "AIzaSyBuUG3ksrLRuXyjcLhOpM0deV0Cow9YXng",
    authDomain: "mapas-7c0d0.firebaseapp.com",
    databaseURL: "https://mapas-7c0d0.firebaseio.com",
    projectId: "mapas-7c0d0",
    storageBucket: "mapas-7c0d0.appspot.com",
    messagingSenderId: "439976486711"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default null;

export function Auth(email, password){
	firebaseApp.auth().signInWithEmailAndPassword(email, password).then(success=>{
		console.log("exito");
		Store.dispatch({
			type: 'USER_ACTIVE',
			data: {validate: true, user: email}
		});
	}).catch(error=>console.log("error handlefirebase"));
}
export function SetCoords(time, long, lat, user) {
	firebaseApp.database().ref('Path').push({time,long,lat,user})
}