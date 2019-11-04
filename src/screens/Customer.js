import React, { Component } from 'react';
import { View, Text, AsyncStorage, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import * as actionsCustomers from '../redux/actions/actionCustomers'
import { Icon, Header, Fab, Container, Content, Item, Input } from 'native-base';
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import UpdateCustomer from '../components/UpdateCustomer'
import AddCustomer from '../components/ModalAddCustomer'
const { height, width } = Dimensions.get('window')

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cardId: '',
      phoneNumber: '',
      image: '',
      modalVisible: false
    };
  }

  goAddCustomer() {
    this.setState({
      modal: false,
      modalVisible: true
    })
  }

  openModal = () => {
    this.setState({ modal: true })
    this.setState({ modalVisible: true })
  }

  modalUpdate = (param) => {
    this.setState({ nameCustomer: param })
    this.setState({ modal: true })
    this.setState({ modalVisible: true })
  }

  closeModal = (visible) => {
    this.setState({ modalVisible: visible });
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getCustomer(token)
    await this.props.customersData.customers
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Header style={styles.header}>
          <Text style={styles.txtCustomer}>Customer</Text>
        </Header>
        <Content>
          <View style={{ flex: 1 }}>
            <View style={{ margin: 10 }}>
              <Item rounded regular>
                <Input
                  placeholder="Pencarian"
                  value={this.state.name}
                  onChangeText={search =>
                    this.setState({ name: search.toLowerCase() })
                  }
                />
                <Icon active name="search" />
              </Item>
            </View>
            <Modal isVisible={this.state.modalVisible}
              animationIn='fadeInUp'
              animationOut='fadeOutDown'
              animationInTiming={100}
              animationOutTiming={100}>
              <View style={styles.modal}>
                {
                  this.state.modal ?
                    <UpdateCustomer data={this.state.nameCustomer} function={() => this.closeModal(false)}></UpdateCustomer>
                    :
                    <AddCustomer function={() => this.closeModal(false)}></AddCustomer>
                }
              </View>
            </Modal>
            <View style={{ padding: 10 }}>
              <FlatList
                data={this.props.customersData.customers.filter(item =>
                  item.name.toLowerCase().includes(this.state.name),
                )}
                renderItem={({ item }) =>
                  <TouchableOpacity
                    onPress={() => { this.modalUpdate(item) }}
                    style={styles.touchable}>
                    <View>
                      <Image
                        source={{ uri: item.image }} style={styles.image} />
                    </View>
                    <View style={{ marginTop: 5 }}>
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
                    </View>
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: 'orange' }}
          position="bottomRight"
          onPress={() => this.goAddCustomer()}
        >
          <Icon name='add' style={styles.fab}></Icon>
        </Fab>
      </Container>
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
  header: {
    alignItems: 'center',
    backgroundColor: '#fdcb6e'
  },
  txtCustomer: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  touchable: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 2,
    backgroundColor: '#c7ecee'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginRight: 20
  },
  buttonAdd: {
    borderRadius: 30,
    alignItems: 'center',
    width: 50,
    backgroundColor: 'orange',
    margin: 20,
    alignSelf: 'flex-end'
  },
  modal: {
    backgroundColor: '#fff',
    paddingRight: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height * 0.8,
    width: Dimensions.get('window').width * 0.9,
  },
  fab: {
    color: 'white',
    padding: 10
  }
})