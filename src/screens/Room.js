import React, { Component } from 'react';
import { View, Text, AsyncStorage, FlatList, StyleSheet, Dimensions } from 'react-native';
import * as actionsRooms from '../redux/actions/actionRooms'
import { Icon, Header, Fab, Container, Content } from 'native-base';
import * as actionsOrders from '../redux/actions/actionOrders'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import AddRoom from '../components/ModalAddRoom';
import UpdateRoom from '../components/ModalUpdateRoom'
import moment from 'moment'
const { height, width } = Dimensions.get('window')

console.disableYellowBox = true

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      nameRoom: ''
    };
  }

  goAddRoom() {
    this.setState({
      modal: false,
      modalVisible: true
    })
  }

  // showRoom = async (idRoom) => {
  //   const token = await AsyncStorage.getItem('user-token')
  //   await this.props.getDataOrders(token, idRoom)
  //   const dataOrders = this.props.ordersData.orders
  //   console.log(dataOrders.customers.name)
  // }

  openModal = () => {
    this.setState({ modal: true })
    this.setState({ modalVisible: true })
  }

  updatemodal = (param) => {
    this.setState({ nameRoom: param })
    this.setState({ modal: true })
    this.setState({ modalVisible: true })
  }

  closeModal = (visible) => {
    this.setState({ modalVisible: visible });
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getDataRooms(token)
    await this.props.getDataOrders(token)
    let orders = this.props.ordersData.orders
    let array = []
    orders.forEach(item => {
      array.push({
        id: item.id,
        room_id: item.room_id,
        order_end_time: moment(item.order_end_time).diff(moment(), 'seconds')
      })
    })
    this.props.ordersData.orders = array
    console.log(this.props.ordersData.orders);
  }

  render() {
    const dataRooms = this.props.roomsData.rooms.data
    return (
      <Container>
        <Content>
          <View style={{ flex: 1 }}>
            <Header style={{ alignItems: 'center', backgroundColor: '#fdcb6e' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Room</Text>
            </Header>
            <View>
              <Modal isVisible={this.state.modalVisible}
                animationIn='fadeInUp'
                animationOut='fadeOutDown'
                animationInTiming={100}
                animationOutTiming={100}>
                <View style={styles.modal}>
                  {
                    this.state.modal ?
                      <UpdateRoom data={this.state.nameRoom} function={() => this.closeModal(false)}></UpdateRoom>
                      :
                      <AddRoom function={() => this.closeModal(false)}></AddRoom>
                  }
                </View>
              </Modal>
              <FlatList
                data={dataRooms}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                renderItem={({ item }) => {
                  <Text>{item.name}</Text>
                  {
                    if (!item.available) {
                      return (
                        <TouchableOpacity
                          style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#6ab04c', margin: 10, margin: 5, height: height / 5, width: width * 0.3 }}
                          onPress={() => { this.updatemodal(item) }}
                        >
                          <Text style={{ fontSize: 20 }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }
                  }
                }
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
          onPress={() => this.goAddRoom()}
        >
          <Icon name='add' style={{ color: 'white', padding: 10 }}></Icon>
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    roomsData: state.rooms, // reducers/index.js
    ordersData: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataRooms: (token) => dispatch(actionsRooms.getRooms(token)),
    getDataOrders: (token, idRoom) => dispatch(actionsOrders.getOrders(token, idRoom))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
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
    height: Dimensions.get('window').height * 0.7,
    width: Dimensions.get('window').width * 0.9,
  }
})