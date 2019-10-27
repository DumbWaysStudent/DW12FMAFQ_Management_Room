import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Item, Input, Label } from 'native-base';

export default class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername: '',
      inputPassword: null,
      showPassword: false
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
            <Item style={styles.formItem}>
              <Input
                value={this.state.inputPassword}
                onChangeText={(text) => this.setState({ inputPassword: text })}
                secureTextEntry={true}
                keyboardType='default'
                placeholder='Input your customer' />
            </Item>
            <Label>Duration</Label>
            <Item style={styles.formItem}>
              <Input
                value={this.state.inputPassword}
                onChangeText={(text) => this.setState({ inputPassword: text })}
                secureTextEntry={true}
                keyboardType='default'
                placeholder='Input your duration' />
            </Item>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue' }} onPress={this.authentication}>
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