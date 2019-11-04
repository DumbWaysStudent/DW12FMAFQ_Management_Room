import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Item, Input, Label, Picker, Button, Icon, Form } from 'native-base';
import * as actionsOrder from '../redux/actions/actionOrders'
import * as actionsCustomer from '../redux/actions/actionCustomers'
import { connect } from 'react-redux'
import moment from 'moment';

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: '',
      customer: '',
      duration: '',
    };
  }

  componentDidMount = async () => {
    this.setState({
      roomname: this.props.data.name,
      customer: this.props.data.customer,
      duration: this.props.data.duration

    })
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getDataCustomer(token)
    const dataCustomer = this.props.customersData
    console.log(dataCustomer)
  }

  checkIn = async () => {
    const token = await AsyncStorage.getItem('user-token')
    const params = {
      token,
      data: {
        room_id: this.props.data.id,
        customer_id: this.state.customer,
        duration: this.state.duration,
        is_booked: true, is_done: false,
        order_end_time: new moment().add(this.state.duration, 'm').toJSON()
      }
    }
    console.log('room id :', params.data.room_id);

    await this.props.addCheckInorder(params)
    await this.props.getCheckin(token)
    await this.props.function()
  }

  selectedCustomer(customer) {
    this.setState({ customer })
  }

  render() {
    const dataCustomer = this.props.customersData.customers
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Checkin</Text>
          </View>
          <Label>Room Name</Label>
          <View style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Input disabled
                value={this.state.roomname}
                onChangeText={(text) => this.setState({ name: text })}
                style={{ backgroundColor: '#84817a' }}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='Room Name '
              />
            </Item>
            <Label>Customer</Label>
            <Item rounded style={styles.formItem}>
              <Form>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Choose Your Customer"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: 280 }}
                  selectedValue={this.state.customer}
                  onValueChange={(itemValue, itemIndex) =>
                    this.selectedCustomer(itemValue)
                  }
                >
                  {dataCustomer.map(item => {
                    return (<Picker.Item label={item.name} value={item.id} />)
                  })}
                </Picker>
              </Form>

              {/* <Picker
                style={{ height: 50, width: 100 }}
                selectedValue={this.state.customer}
                onValueChange={(itemValue, itemIndex) =>
                  this.selectedCustomer(itemValue)
                }
              >
                {dataCustomer.map(item => {
                  return (<Picker.Item label={item.name} value={item.id} />)
                })}
              </Picker> */}

            </Item>
            <Label>Duration Left (minutes)</Label>
            <Item rounded style={styles.formItem}>
              <Input
                onChangeText={(text) => this.setState({ duration: text })}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='Duration'
              />
            </Item>
            <View style={styles.btnTitle}>
              <Button style={styles.btnCancel} onPress={() => this.props.function()} >
                <Text style={styles.txtCancel}>Cancel</Text>
              </Button>
              <Button style={styles.btnAdd} onPress={() => this.checkIn()}>
                <Text style={styles.txtAdd}>Checkin</Text>
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
    paddingHorizontal: 20
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },
  form: {
    marginTop: 10
  },
  formItem: {
    borderWidth: 1,
    marginBottom: 10,
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
    // ordersData: state.orders, // reducers/index.js
    customersData: state.customers,
    checkInData: state.orderCheckIn

  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getDetailRoom: (params, token) => dispatch(actionsOrder.detailRooms(params, token)),
    getCheckin: (params) => dispatch(actionsOrder.getCheckin(params)),
    // updateDataOrder: (params) => dispatch(actionsOrder.updateOrders(params)),
    getDataCustomer: (token) => dispatch(actionsCustomer.getCustomer(token)),
    addCheckInorder: (token) => dispatch(actionsOrder.checkinOrder(token)),
    // getDataOrder: (token) => dispatch(actionsOrder.getOrders(token))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckIn);