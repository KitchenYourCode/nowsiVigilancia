import React, { Component } from 'react';
import GetCoords from './GetCoords'
import { View, Text } from 'react-native'

export default class Index extends Component<Props> {
	constructor(props){
		super(props);
		

	}
  render() {
    return (
		<GetCoords history={this.props.history}/>
    );
  }
}