import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Item, Input } from 'native-base';
import * as actionsCustomer from './../redux/actions/actionCustomer'
import { connect } from 'react-redux'
class updateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      idCard: '',
      phoneNumber: ''
    };
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('user-token')
    const param = this.props.navigation.state.params
    await this.props.getDataCustomer(param, token)
    const dataCustomer = await this.props.customerData.detailCustomer
    this.setState({
      id: param,
      name: dataCustomer.name,
      idCard: dataCustomer.id_card,
      phoneNumber: dataCustomer.phone_number.toString()
    })
  }

  doUpdate = async () => {
    const params = { id: this.state.id, name: this.state.name, idCard: this.state.idCard, phoneNumber: this.state.phoneNumber }
    await this.props.updateDataCustomer(params)
    const token = await AsyncStorage.getItem('user-token')
    const param = this.props.navigation.state.params
    console.log(param)
    await this.props.getDataCustomer(param, token)
    console.log(this.props.customerData)
    this.props.navigation.navigate('Customer')
  }

  render() {

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.name}
                onChangeText={(text) => this.setState({ name: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Customer Name '
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.idCard}
                onChangeText={(text) => this.setState({ idCard: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='ID Card'
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.phoneNumber}
                onChangeText={(text) => this.setState({ phoneNumber: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Phone Number'
              />
            </Item>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue' }} onPress={this.doUpdate}>
              <Text>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    customerData: state.customers, // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateDataCustomer: (params) => dispatch(actionsCustomer.updateCustomer(params)),
    getDataCustomer: (params, token) => dispatch(actionsCustomer.detailCustomer(params, token)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(updateCustomer);