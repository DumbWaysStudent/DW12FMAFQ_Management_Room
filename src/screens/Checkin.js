import React, { Component } from 'react';
import { View, Text, AsyncStorage, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Header, Container, Content } from 'native-base';
import * as actionsOrders from '../redux/actions/actionOrders'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import moment from 'moment'
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
const { height, width } = Dimensions.get('window')

console.disableYellowBox = true

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameRoom: '',
      modalVisible: false,
      checkin: '',
      data: '',
    };
  }

  showRoom = async () => {
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getDataOrders(token)
    const dataOrders = this.props.ordersData.orders
    console.log(dataOrders.customers.name)
  }

  checkout = (param) => {
    this.setState({
      data: param,
      modal: true,
      modalVisible: true,
      checkin: 'checkout',
    })
  }

  checkin = (param) => {
    this.setState({
      data: param,
      modal: true,
      modalVisible: true,
      checkin: 'checkin',
    })
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getDataOrders(token)
    this.interval = await setInterval(async () => {
      this.refreshData()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async refreshData() {
    const data = this.props.ordersData.orders
    for (let i = 0; i < data.length; i++) {
      if (data[i].order[0] !== undefined) {
        console.log(moment(data[i].order[0].order_end_time).diff(moment(), 's'));
        if (moment(data[i].order[0].order_end_time).diff(moment(), 's') <= 0) {
          await this.checkOut(data[i].order[0].id)
        }
      }
    }
  }

  checkOut = async (id) => {
    const token = await AsyncStorage.getItem('user-token')
    const param = {
      id,  //idorder
      token,
      data: {
        is_booked: false,
      }
    }
    await this.props.checkoutDataOrder(param)
    await this.props.getDataOrders(param)
    // await this.props.function()
  }
  render() {
    const dataRooms = this.props.ordersData.orders
    let now = new moment()
    console.log('rooms', dataRooms)
    return (
      <Container>
        <Content>
          <View style={{ flex: 1 }}>
            <Header style={{ alignItems: 'center', backgroundColor: '#fdcb6e' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Checkin</Text>
            </Header>
            <View>
              <Modal isVisible={this.state.modalVisible}
                animationIn='fadeInUp'
                animationOut='fadeOutDown'
                animationInTiming={100}
                animationOutTiming={100}>
                <View style={styles.modal}>
                  {
                    this.state.checkin !== 'checkout' ?
                      <CheckIn data={this.state.data} function={() => this.closeModal(false)}></CheckIn>
                      :
                      <CheckOut data={this.state.data} function={() => this.closeModal(false)}></CheckOut>
                  }
                </View>
              </Modal>
              <FlatList
                data={dataRooms}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                renderItem={({ item, index }) => {
                  <Text>{item.name}</Text>
                  {
                    if (item.order.length <= 0) {
                      return (
                        <TouchableOpacity
                          style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#6ab04c', margin: 10, margin: 5, height: height / 5, width: width * 0.3 }}
                          onPress={() => { this.checkin(item) }}
                        >
                          <Text style={{ fontSize: 20 }}>{item.name}</Text>
                          <Text>available</Text>
                        </TouchableOpacity>
                      )
                    }
                    else {
                      return (
                        <TouchableOpacity
                          style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey', margin: 10, margin: 5, height: height / 5, width: width * 0.3 }}
                          onPress={() => { this.checkout(item) }}>
                          <Text style={{ fontSize: 20 }}>{item.name}</Text>
                          <Text>{item.order[0] ? `${new moment(item.order[0].order_end_time).diff(now, 's')}` : ''}</Text>
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
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ordersData: state.orders,
    orderCheckOutData: state.orderCheckOut
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataOrders: (token) => dispatch(actionsOrders.getCheckin(token)),
    checkoutDataOrder: (param) => dispatch(actionsOrders.checkoutOrder(param))
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