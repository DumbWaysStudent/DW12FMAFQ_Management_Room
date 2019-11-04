import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Item, Input, Label, Picker, Button } from 'native-base';
import * as actionsOrder from '../redux/actions/actionOrders'
import { connect } from 'react-redux'
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: '',
      customer: '',
      duration: '',
    };
    this.props.getDataOrder(this.props.data.id)
  }

  checkOut = async () => {
    const token = await AsyncStorage.getItem('user-token')
    const param = {
      id: this.props.ordersData.detailRoomOrder.order[0].id, //idorder
      token,
      data: {
        is_booked: false,
      }
    }
    await this.props.checkoutDataOrder(param)
    await this.props.getDataCheckin(param)
    await this.props.function()
  }

  selectedCustomer(customer) {
    this.setState({ customer })
  }

  render() {
    const dataOrder = this.props.ordersData.detailRoomOrder
    console.log('cus', this.props.ordersData.detailRoomOrder)
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>CheckOut</Text>
          </View>
          <Label>Room Name</Label>
          <View style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Input disabled
                value={this.props.data.name}
                onChangeText={(text) => this.setState({ name: text })}
                style={{ backgroundColor: '#84817a' }}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='Room Name '
              />
            </Item>
            <Label>Customer</Label>
            <Item rounded style={styles.formItem}>
              <Input disabled
                value={(dataOrder != false) ? dataOrder.order[0].customer.name : ''}
                style={{ backgroundColor: '#84817a' }}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='Customers '
              />
            </Item>
            <Label>Duration Left (minutes)</Label>
            <Item rounded style={styles.formItem}>
              <Input
                value={(dataOrder != false) ? dataOrder.order[0].duration.toString() : ''}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='Duration'
              />
            </Item>
            <View style={styles.btnTitle}>
              <Button style={styles.btnCancel} onPress={() => this.props.function()} >
                <Text style={styles.txtCancel}>Cancel</Text>
              </Button>
              <Button style={styles.btnAdd} onPress={() => this.checkOut()}>
                <Text style={styles.txtAdd}>Checkout</Text>
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
    ordersData: state.orders, // reducers/index.js
    orderCheckOutData: state.orderCheckOut
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataOrder: (params) => dispatch(actionsOrder.getRoomOrder(params)),
    getDataCheckin: (params) => dispatch(actionsOrder.getCheckin(params)),
    checkoutDataOrder: (param) => dispatch(actionsOrder.checkoutOrder(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOut);