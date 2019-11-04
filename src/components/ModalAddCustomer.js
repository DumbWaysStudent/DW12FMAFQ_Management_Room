import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Item, Input, Button } from 'native-base';
import * as actionsCustomer from '../redux/actions/actionCustomers'
import { connect } from 'react-redux'

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      idCard: '',
      phoneNumber: '',
      isError: false
    };
  }

  addDataCustomerHandler = async () => {
    if (this.state.name === '' || this.state.phoneNumber === '' || this.state.idCard === '') {
      this.setState({ isError: true })
    } else {
      const token = await AsyncStorage.getItem('user-token')
      await this.props.addDataCustomers({ name: this.state.name, idCard: this.state.idCard, phoneNumber: this.state.phoneNumber })
      await this.props.getDataCustomers(token)
      await this.props.function()
      this.setState({ isError: false })
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>Add Customer</Text>
          </View>
          <View style={styles.form}>
            <Item rounded
              error={this.state.isError}
              style={styles.formItem}>
              <Input
                value={this.state.name}
                onChangeText={(text) => this.setState({ name: text })}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='Customer Name '
              />
            </Item>
            <Item rounded
              error={this.state.isError}
              style={styles.formItem}>
              <Input
                value={this.state.idCard}
                onChangeText={(text) => this.setState({ idCard: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='ID Card'
              />
            </Item>
            <Item rounded
              error={this.state.isError}
              style={styles.formItem}>
              <Input
                value={this.state.phoneNumber}
                onChangeText={(text) => this.setState({ phoneNumber: text })}
                autoCapitalize='none'
                keyboardType='numeric'
                placeholder='Phone Number'
              />
            </Item>
            <View style={styles.btnTitle}>
              <Button style={styles.btnCancel} onPress={() => this.props.function()} >
                <Text style={styles.txtCancel}>Cancel</Text>
              </Button>
              <Button
                style={styles.btnAdd}
                onPress={this.addDataCustomerHandler}
              >
                <Text style={styles.txtAdd}>Save</Text>
              </Button>
            </View>
            {/* <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue' }} onPress={this.addDataCustomerHandler}>
              <Text>Add</Text>
            </TouchableOpacity> */}
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
  },
  txtLink: {
    color: 'blue'
  }
});
const mapStateToProps = state => {
  return {
    customerData: state.customer, // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addDataCustomers: (params) => dispatch(actionsCustomer.addCustomer(params)),
    getDataCustomers: (token) => dispatch(actionsCustomer.getCustomer(token)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomer);