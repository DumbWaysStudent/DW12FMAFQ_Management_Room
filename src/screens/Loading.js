import React, { Component } from 'react'
import { Text, View, AsyncStorage, Image } from 'react-native'
import { Content, Spinner, Container, Header, } from 'native-base'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class Loading extends Component {
  componentDidMount() {
    const { navigation } = this.props
    this.focusListener = navigation.addListener('didFocus', async () => {
      const token = await AsyncStorage.getItem('user-token')
      if (token != null) {
        this.props.navigation.navigate('Room')
      } else {
        this.props.navigation.navigate('Login')
      }
    })
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
        <Image source={require('../assets/icon/loading.gif')} style={{ width: 300, height: 300, marginTop: 100 }} />
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    // authenticationLocal: state.authentication // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Loading));