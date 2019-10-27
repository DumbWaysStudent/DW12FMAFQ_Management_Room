import React, { Component } from 'react';
import { View, Text,AsyncStorage,TouchableOpacity } from 'react-native';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logout=async()=>{
    await AsyncStorage.clear()
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={{padding:10,backgroundColor:'blue'}} onPress={this.logout}>
              <Text>Logout</Text>
            </TouchableOpacity>
      </View>
    );
  }
}
