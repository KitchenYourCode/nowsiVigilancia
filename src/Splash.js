import React, { Component } from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView  } from 'react-native';

import Login from './login/Login.js';

export default class Splash extends Component{
		render(){
			return(
				<KeyboardAvoidingView behavior="padding"  style={style.wrapper}>
					<View style={style.wrapperTitle}>
						<Image 
						style={style.logo}
						source={require('./img/Octocat.png')} />
						<Text>Nowsi</Text>
					</View>
					<Login history={this.props.history}/>
					<View style={style.wrapperFooterTitle}>
						<Text style={style.footerTitle}>Power by Nowsi</Text>
					</View>
				</KeyboardAvoidingView>
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
	footerTitle:{
		color: 'white',
		fontWeight: '200',
		paddingBottom: 20,
		opacity: 0.5,
		alignItems: 'center'
	},
	wrapperTitle:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	wrapperFooterTitle:{
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo:{
		width:100,
		height: 100
	}
});