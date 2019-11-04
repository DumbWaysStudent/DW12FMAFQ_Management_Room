import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Header } from 'native-base'
import actionsRooms from '../redux/actions/actionRooms'
import { connect } from 'react-redux'

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      image: ''
    };
  }

  logout = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Login')
  }

  async componentDidMount() {
    const name = await AsyncStorage.getItem('user')
    const image = await AsyncStorage.getItem('image')
    const email = await AsyncStorage.getItem('email')
    this.setState({ name, image, email })
  }
  render() {
    const { user } = this.props.loginLocal
    console.log(user)
    return (
      <View style={styles.title}>
        <Header style={styles.header}>
          <Text style={styles.txtAdmin}>Admin</Text>
        </Header>
        <View style={styles.content}>
          <Image source={{ uri: this.state.image }} style={styles.image} />
          <View style={styles.subContent}>
            <Text style={styles.txtName}>Name : {this.state.name}</Text>
            <Text style={styles.txtEmail}>Email : {this.state.email}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.btnLogout} onPress={this.logout}>
            <Text style={styles.txtLogout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginLocal: state.authentication, // reducers/index.js
  }
}

export default connect(
  mapStateToProps,
)(Setting);

const styles = StyleSheet.create({
  title: {
    flex: 1
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fdcb6e'
  },
  txtAdmin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  content: {
    padding: 10,
    marginTop: 20,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 40,
    marginHorizontal: 20,
    backgroundColor: '#c7ecee',
    flexDirection: 'row'
  },
  subContent: {
    marginTop: 20
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 20
  },
  txtName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  txtEmail: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  btnLogout: {
    padding: 10,
    backgroundColor: 'blue',
    marginTop: 30,
    width: 200,
    borderRadius: 50,
    alignSelf: 'center'
  },
  txtLogout: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})