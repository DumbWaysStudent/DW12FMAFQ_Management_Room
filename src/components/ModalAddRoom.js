import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import { Item, Input, Button } from 'native-base';
import * as actionsRooms from '../redux/actions/actionRooms'
import { connect } from 'react-redux'

class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
      isError: false
    };
  }

  addDataRoomHandler = async () => {
    const token = await AsyncStorage.getItem('user-token')
    if (this.state.room === '') {
      this.setState({ isError: true })
    } else {
      await this.props.addDataRooms(this.state.room)
      await this.props.getDataRooms(token)
      await this.props.function()
      this.setState({ isError: false })
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Add Room</Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ fontSize: 20 }}>Room Name</Text>
          </View>
          <View style={styles.form}>
            <Item regular
              error={this.state.isError}
              style={styles.formItem}>
              <Input
                value={this.state.room}
                onChangeText={(text) => this.setState({ room: text })}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='Name Room'
              />
            </Item>
            <View style={styles.btnTitle}>
              <Button style={styles.btnCancel} onPress={() => this.props.function()} >
                <Text style={styles.txtCancel}>Cancel</Text>
              </Button>
              <Button
                style={styles.btnAdd}
                onPress={this.addDataRoomHandler}
              >
                <Text style={styles.txtAdd}>Save</Text>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingRight: 10
  },
  formItem: {
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
  },
  btnTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnCancel: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 120
  },
  btnAdd: {
    padding: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 120
  },
  txtCancel: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold'
  },
  txtAdd: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
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