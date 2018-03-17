import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Store from './../Store'
//onPress={()=> this.props.history.push('/GPS')
import { Auth } from './../HandleFirebase';
export default class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			data: {validate:false, user:''}
		}
	}
	componentDidMount(){
    Store.subscribe(()=>{
      this.setState({
        data: Store.getState().userReducer.data
    	});
    });    
  }
	render(){
		return(
			<View style={style.container}>
				<TextInput
				style={style.input}
				placeholder="Email"
				placeholderTextColor="rgba(000,000,000,0.3)"
				returnKeyType="next"
				keyboardType="email-address"
				onChangeText={(text) => this.setState({email:text})}

					/>
					<TextInput
				style={style.input}
				placeholder="password"
				placeholderTextColor="rgba(000,000,000,0.3)"
				secureTextEntry
				returnKeyType="go"
				onChangeText={(text) => this.setState({password:text})}

					/>	
					<TouchableOpacity onPress={()=>{ /*this.props.history.push('/GPS')*/ Auth(this.state.email, this.state.password);console.log(this.state)} } style={style.buttonContainer}>
						<Text style={style.buttonText}>
							Login
						</Text>
					</TouchableOpacity>
					{this.state.data.validate ? this.props.history.push('/GPS') : console.log("falso")}
				</View>
			);
	}
}
const style = StyleSheet.create({
	container:{
		padding: 20
	},
	input:{
		height:40,
		backgroundColor: "rgba(255,255,255,0.4)",
		marginBottom: 20,
		color: '#000',
		paddingHorizontal: 10
	},
	buttonContainer:{
		backgroundColor: "#d35400",
		paddingVertical: 15	
	},
	buttonText:{
		textAlign: 'center',
		color: '#FFFFFF',
		fontWeight: '700'
	}

})