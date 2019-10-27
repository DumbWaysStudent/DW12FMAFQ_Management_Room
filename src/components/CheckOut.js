import React, { Component } from 'react';
import { View, Text,StyleSheet,SafeAreaView,Image,TouchableOpacity,Dimensions,AsyncStorage } from 'react-native';
import { 
  Card,
  
    Icon,
    Form, 
    Item, 
    Input,
    CardItem,
    Body,
    Label,
   } from 'native-base';

export default class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
          inputUsername : '',
          inputPassword : null,
          showPassword : false
        };
      }

  render() {
    return (
        <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
          <Label>Room Name</Label>
            <Item style={styles.formItem}>
              <Input
                value={this.state.roomDetail}
                onChangeText={(text) => this.setState({ inputUsername: text })}
                autoCapitalize='none'
                keyboardType='email-address'
               />
            </Item>
            <Label>Customer</Label>
            <Item  style={styles.formItem}>
              <Input
                value={this.state.inputPassword}
                onChangeText={(text) => this.setState({ inputPassword: text })}
                secureTextEntry={true}
                keyboardType='default'
                placeholder='Input your password' />
            </Item>
            <Label>Duration</Label>
            <Item style={styles.formItem}>
              <Input
                value={this.state.inputPassword}
                onChangeText={(text) => this.setState({ inputPassword: text })}
                secureTextEntry={true}
                keyboardType='default'
                placeholder='Input your password' />
            </Item>
            <TouchableOpacity style={{padding:10,backgroundColor:'blue'}} onPress={this.authentication}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      width: Dimensions.get('window').width,
      paddingHorizontal: 20
    },
    textInfo: {
      alignItems: 'center',
      padding: 20
    },
    textInfoTop: {
      marginTop: 40,
      marginBottom: 60
    },
    title: {
      fontSize: 50
    },
    subTitle: {
      fontSize: 24,
      marginTop: 10
    },
    formItem: {
      marginBottom: 20
    },
    txtLink: {
      color: 'blue'
    }
  });