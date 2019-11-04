import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage, Image } from 'react-native';
import { Item, Input, Button, Icon } from 'native-base';
import * as actionsCustomer from '../redux/actions/actionCustomers'
import { connect } from 'react-redux'

class updateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      idCard: '',
      phoneNumber: '',
      image: ''
    };
  }

  componentDidMount = async () => {
    console.log(this.props)
    this.setState({
      name: this.props.data.name,
      idCard: this.props.data.id_card,
      phoneNumber: this.props.data.phone_number.toString(),
      image: this.props.data.image
    })
  }

  doUpdate = async () => {
    const params = { id: this.props.data.id, name: this.state.name, idCard: this.state.idCard, phoneNumber: this.state.phoneNumber, image: this.state.image }
    await this.props.updateDataCustomer(params)
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getCustomer(token)
    await this.props.function()
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Edit Customer</Text>
          </View>
          <View style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.name}
                onChangeText={(text) => this.setState({ name: text })}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='Customer Name'
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.idCard}
                onChangeText={(text) => this.setState({ idCard: text })}
                autoCapitalize='none'
                keyboardType='text'
                placeholder='ID Card'
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.phoneNumber}
                onChangeText={(text) => this.setState({ phoneNumber: text })}
                autoCapitalize='none'
                keyboardType='numeric'
                placeholder='Phone Number'
              />
            </Item>
            <Image source={{ uri: this.state.image }} style={styles.image} />
            <Icon name='camera' style={styles.icon} />
            <View style={styles.btnTitle}>
              <Button style={styles.btnCancel} onPress={() => this.props.function()} >
                <Text style={styles.txtCancel}>Cancel</Text>
              </Button>
              <Button
                style={styles.btnAdd}
                onPress={() => this.doUpdate()}
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
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },
  formItem: {
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120,
    alignSelf: 'center'
  },
  icon: {
    alignSelf: 'center',
    marginTop: -22,
    marginLeft: 60,
    color: 'black'
  },
  btnTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
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
});

const mapStateToProps = state => {
  return {
    customerData: state.customers, // reducers/index.js
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCustomer: (params) => dispatch(actionsCustomer.getCustomer(params)),
    updateDataCustomer: (params) => dispatch(actionsCustomer.updateCustomer(params)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(updateCustomer);