import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Room from './src/screens/Room'
import Login from './src/screens/Login'
import Checkin from './src/screens/Checkin'
import Customer from './src/screens/Customer'
import Setting from './src/screens/Setting'
import Loading from './src/screens/Loading'

const MainApp = createMaterialBottomTabNavigator(
  {
    Checkin: {
      screen: Checkin,
      navigationOptions: {
        tabBarLabel: 'Checkin',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="checkmark-circle" style={{ color: tintColor, fontSize: 22 }} />),
      }
    },
    Room: {
      screen: Room,
      navigationOptions: {
        tabBarLabel: 'Room',
        tabBarIcon: ({ tintColor }) => (
          <Icons name="bed" style={{ color: tintColor, fontSize: 22 }} />),
      }
    },
    Customer: {
      screen: Customer,
      navigationOptions: {
        tabBarLabel: 'Customer',
        tabBarIcon: ({ tintColor }) => (
          <Icons name="address-card" style={{ color: tintColor, fontSize: 22 }} />),
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="settings" style={{ color: tintColor, fontSize: 22 }} />),
      }
    },
  },
  {
    initialRouteName: 'Room',
    activeColor: '#fff',
    inactiveColor: '#2d3436',
    barStyle: {
      backgroundColor: '#fdcb6e'
    }


  }
);
const AppNavigator = createStackNavigator({
  Loading: {
    screen: Loading,
    navigationOptions: {
      header: null,
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Room: {
    screen: MainApp,
    navigationOptions: {
      header: null
    }
  },

}, {
  initialRouteName: 'Loading',
});

export default createAppContainer(AppNavigator);
