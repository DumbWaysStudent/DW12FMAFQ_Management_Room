import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Octicons';
import Icon1 from 'react-native-vector-icons/FontAwesome'; //eye, eye-slash
import * as actionAuthentication from '../redux/actions/actionAuthentications'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername: '',
      inputPassword: null,
      showPassword: 'input'
    };
  }
  authentication = async () => {
    await this.props.authentication(
      this.state.inputUsername,
      this.state.inputPassword
    )
    const data = this.props.authenticationLocal.user
    console.log(data)
    await AsyncStorage.multiSet([
      ['user', data.checkUser.name],
      ['user-token', data.token],
      ['image', data.checkUser.image],
      ['email', data.checkUser.email]
    ])
    this.props.navigation.navigate('Loading')
  }

  render() {
    return (
      <ImageBackground source={require('../assets/icon/hotel.jpg')} style={styles.imgBackground}>
        <SafeAreaView style={styles.imgHeader}>
          <View style={styles.container}>
            <View style={[styles.textInfo, styles.textInfoTop]}>
              <Text style={styles.title}>Login</Text>
            </View>
            <KeyboardAvoidingView behavior='position'>
              <Image source={require('../assets/icon/building.png')} style={{ width: 90, height: 90, alignSelf: 'center' }}></Image>
              <View style={styles.form}>
                <Item style={styles.formItem}>
                  <Icons name='mail' style={styles.iconMail} />
                  <Input
                    value={this.state.inputUsername}
                    onChangeText={(text) => this.setState({ inputUsername: text })}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder='Input your email' />
                </Item>
                <Item style={styles.formItem}>
                  <Icon name='lock1' style={styles.iconPassword} />
                  <Input
                    value={this.state.inputPassword}
                    onChangeText={(text) => this.setState({ inputPassword: text })}
                    secureTextEntry={true}
                    keyboardType='default'
                    placeholder='Input your password' />
                </Item>
                <TouchableOpacity style={styles.touchable} onPress={this.authentication}>
                  <Text style={styles.txtLogin}>Login</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <View style={styles.textInfo}>
              <Text style={styles.txtContent}> Don't have an account?
                <Text
                  onPress={() => this.handleSignUp()}
                  style={styles.txtLink}> Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </SafeAreaView >
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticationLocal: state.authentication // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authentication: (inputUsername, inputPassword) => dispatch(actionAuthentication.login(inputUsername, inputPassword))
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%'
  },
  imgHeader: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  container: {
    width: Dimensions.get('window').width,
  },
  textInfo: {
    alignItems: 'center',
    padding: 10,
  },
  txtContent: {
    color: '#ffffff'
  },
  title: {
    fontSize: 40,
    color: '#7ed6df',
    fontWeight: 'bold',
    fontFamily: 'joker',
    alignSelf: 'center',
    marginVertical: 20
  },
  formItem: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8
  },
  iconMail: {
    fontSize: 20,
    marginLeft: 10
  },
  iconPassword: {
    fontSize: 20,
    marginLeft: 10
  },
  touchable: {
    padding: 10,
    backgroundColor: '#7ed6df',
    marginTop: 30,
    borderRadius: 8
  },
  txtLink: {
    color: '#4b7bec'
  },
  txtLogin: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 30,
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);