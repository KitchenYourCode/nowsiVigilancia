import * as firebase from 'firebase';
import Store from './Store'
const firebaseConfig = {
    apiKey: "AIzaSyDpsIWZtja9DNzS2yMLlIbCdIqtu9fWwD8",
    authDomain: "vigilancia-e2011.firebaseapp.com",
    databaseURL: "https://vigilancia-e2011.firebaseio.com",
    projectId: "vigilancia-e2011",
    storageBucket: "",
    messagingSenderId: "1001964929909"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default null;

function fakeState(argument) {
	return argument;
}
export function Auth(email, password){
	firebaseApp.auth().signInWithEmailAndPassword(email, password).then(success=>{
		console.log("exito");
	}).catch(error=>console.log("error handlefirebase"));

	firebase.auth().onAuthStateChanged((user) => {
	  if (user) {
	    console.log(user.uid);
	    Store.dispatch({
			type: 'USER_ACTIVE',
			data: {validate: true, user: email, userId:user.uid }
		});
	  }
	});
}
export function SetCoords(time, long, lat, user, active = false, userId ) {
	if (active) {
		firebaseApp.database().ref('Path').push({time,long,lat,user});
		firebaseApp.database().ref('Users/' + userId).set({
	    user,
	    long,
	    lat,
	    active,
	    time
	  });
	}else{
		firebaseApp.database().ref('Users/' + userId).update({
	    active
	  });
	}
}
export function configTimer() {
	firebase.database().ref('Config').on('value', (snapshot)=>{
		Store.dispatch({
			type: 'TIMER_REFRESH_COORDS',
			data: snapshot.val().setIntervalTimeCoords
		});
		console.log(snapshot.val().setIntervalTimeCoords);
	});
}