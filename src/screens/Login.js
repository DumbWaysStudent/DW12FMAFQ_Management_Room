import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Item, Input } from 'native-base';
import * as actionAuthentication from '../redux/actions/actionsAuthentication'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername: '',
      inputPassword: null,
      showPassword: false
    };
  }

  authentication = async () => {
    console.log(this.state.inputPassword)
    console.log(this.state.inputUsername)
    await this.props.authentication(
      this.state.inputUsername,
      this.state.inputPassword
    )
    const data = this.props.authenticationLocal.user.token
    console.log(data)
    await AsyncStorage.setItem('user-token', data)
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <ImageBackground source={{ uri: 'https://i1.wp.com/www.heibogor.com/wp-content/uploads/2019/06/royal-safari-garden.jpg?fit=1280%2C906&ssl=1' }} style={{ width: '100%', height: 200 }}>
            <View style={[styles.textInfo, styles.textInfoTop]}>
              <Text style={styles.title}>SigIn with your account</Text>
            </View>
          </ImageBackground>
          <KeyboardAvoidingView behavior='position'>
            <View style={styles.form}>
              <Item rounded style={styles.formItem}>
                <Input
                  value={this.state.inputUsername}
                  onChangeText={(text) => this.setState({ inputUsername: text })}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  placeholder='Input your email' />
              </Item>
              <Item rounded style={styles.formItem}>
                <Input
                  value={this.state.inputPassword}
                  onChangeText={(text) => this.setState({ inputPassword: text })}
                  secureTextEntry={true}
                  keyboardType='default'
                  placeholder='Input your password' />
              </Item>
              {/* <Button
            title={"Let's Get Started"}
            onHandleButton={() => this.authentication()} /> */}
              <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', marginTop: 30, borderRadius: 8 }} onPress={this.authentication}>
                <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.textInfo}>
            <Text> Don't have an account?
            <Text
                onPress={() => this.handleSignUp()}
                style={styles.txtLink}> Sign Up </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView >
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
  container: {
    // flex: 1,
    width: Dimensions.get('window').width,
  },
  textInfo: {
    alignItems: 'center',
    padding: 10
  },
  textInfoTop: {
    marginTop: 10,
    marginBottom: 60
  },
  title: {
    fontSize: 25,
    color: '#e58e26',
    fontWeight: 'bold',
    marginRight: 120
  },
  formItem: {
    marginBottom: 20
  },
  txtLink: {
    color: 'blue'
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 30
  }

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);