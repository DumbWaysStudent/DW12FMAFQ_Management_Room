import React, { Component } from 'react';
import { View, Text, AsyncStorage, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as actionsCustomers from '../redux/actions/actionCustomer'
import { Icon } from 'native-base';
import { connect } from 'react-redux'
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cardId: '',
      phoneNumber: ''
    };
  }
  gotoUpdateCustomer = (idCustomer) => {
    this.props.navigation.navigate('UpdateCustomer', idCustomer)
    console.log(idCustomer)
  }
  goAddCustomer = () => {
    this.props.navigation.navigate('AddCustomer')
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getCustomer(token)
    await this.props.customersData.customers
    console.log(this.props.customersData.customers)
  }

  render() {
    return (
      <View style={{ padding: 10, flex: 1 }}>
        <FlatList
          data={this.props.customersData.customers}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => this.gotoUpdateCustomer(item.id)}
              style={{ marginBottom: 5, borderColor: 'grey', borderWidth: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text>Name : </Text>
                <Text>{item.name}</Text>
              </View>
              <View style={{ flexDirection: 'row', }}>
                <Text>Card ID : </Text>
                <Text>{item.id_card}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>Phone Number : </Text>
                <Text>{item.phone_number}</Text>
              </View>
            </TouchableOpacity>
          }
        />
        <TouchableOpacity style={styles.buttonAdd}
          onPress={this.goAddCustomer}>
          <Icon name='add' style={{ color: 'white', padding: 10 }}></Icon>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    customersData: state.customers, // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCustomer: (token) => dispatch(actionsCustomers.getCustomer(token)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);
const styles = StyleSheet.create({
  buttonAdd: {
    borderRadius: 30,
    alignItems: 'center',
    width: 50,
    backgroundColor: 'orange',
    margin: 20,
    alignSelf: 'flex-end'
  },
})