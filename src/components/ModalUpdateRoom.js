import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import { Item, Input, Button } from 'native-base';
import * as actionsRooms from '../redux/actions/actionRooms'
import { connect } from 'react-redux'
class updateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: ''
    };
  }

  componentDidMount = async () => {
    console.log(this.props)
    this.setState({
      name: this.props.data.name,
      id: this.props.data.id
    })
  }

  doUpdate = async () => {
    const params = { id: this.props.data.id, name: this.state.name }
    console.log(params)
    await this.props.updateDataRoom(params)
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getDataRooms(token)
    await this.props.function()
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Edit Room</Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ fontSize: 20 }}>Room Name</Text>
          </View>
          <View style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.name}
                onChangeText={(text) => this.setState({ name: text })}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='Room Name'
              />
            </Item>
            <View style={styles.btnTitle}>
              <Button style={styles.btnCancel} onPress={() => this.props.function()} >
                <Text style={styles.txtCancel}>Cancel</Text>
              </Button>
              <Button style={styles.btnAdd} onPress={() => this.doUpdate()}>
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
  header: {
    fontSize: 30, 
    fontWeight: 'bold'
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
    roomData: state.rooms, // reducers/index.js
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDataRoom: (params) => dispatch(actionsRooms.updateRooms(params)),
    getDataRooms: (token) => dispatch(actionsRooms.getRooms(token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(updateRoom);