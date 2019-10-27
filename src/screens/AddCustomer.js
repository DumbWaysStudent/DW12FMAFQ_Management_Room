import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Item, Input } from 'native-base';
import * as actionsCustomer from '../redux/actions/actionCustomer'
import { connect } from 'react-redux'

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      idCard: '',
      phoneNumber: ''
    };
  }

  addDataCustomerHandler = async () => {
    const token = await AsyncStorage.getItem('user-token')
    const params = { name: this.state.name, idCard: this.state.idCard, phoneNumber: this.state.phoneNumber }
    await this.props.addDataCustomers(params)
    await this.props.getDataCustomers(token)
    this.props.navigation.navigate('Customer')
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.roomDetail}
                onChangeText={(text) => this.setState({ name: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Customer Name '
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.roomDetail}
                onChangeText={(text) => this.setState({ idCard: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='ID Card'
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.roomDetail}
                onChangeText={(text) => this.setState({ phoneNumber: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Phone Number'
              />
            </Item>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue' }} onPress={this.addDataCustomerHandler}>
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