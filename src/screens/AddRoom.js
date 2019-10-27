import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Item, Input } from 'native-base';
import * as actionsRooms from '../redux/actions/actionsRooms'
import { connect } from 'react-redux'

class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
    };
  }

  addDataRoomHandler = async () => {
    const token = await AsyncStorage.getItem('user-token')
    await this.props.addDataRooms(this.state.room)
    await this.props.getDataRooms(token)
    console.log(this.props.roomsData)
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.roomDetail}
                onChangeText={(text) => this.setState({ room: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Name Room'
              />
            </Item>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue' }} onPress={this.addDataRoomHandler}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
const mapStateToProps = state => {
  return {
    roomsData: state.rooms, // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addDataRooms: (params) => dispatch(actionsRooms.addRooms(params)),
    getDataRooms: (token) => dispatch(actionsRooms.getRooms(token)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRoom);