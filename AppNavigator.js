import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';

import Home from './src/screens/Home'
import AddRoom from './src/screens/AddRoom'
import Login from './src/screens/Login';
import Checkin from './src/screens/Checkin'
import Customer from './src/screens/Customer'
import Setting from './src/screens/Setting'
import AddCustomer from './src/screens/AddCustomer'
import UpdateCustomer from './src/screens/updateCustomer'

import { createBottomTabNavigator } from 'react-navigation-tabs';

const MainApp = createBottomTabNavigator(
  {
    Checkin: {
      screen: Checkin,
      navigationOptions: {
        tabBarLabel: 'Checkin',
        tabBarIcon: <Icon name="checkmark-circle" />,
        activeTintColor: '#fff',
        inactiveTintColor: '#95afc0',
      }
    },
    Room: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Room',
        tabBarIcon: <Icons name="bed" style={{ fontSize: 20 }} />,
        activeTintColor: '#fff',
        inactiveTintColor: '#95afc0',
      }
    },
    Customer: {
      screen: Customer,
      navigationOptions: {
        tabBarLabel: 'Customer',
        tabBarIcon: <Icons name="address-card" style={{ fontSize: 20 }} />,
        activeTintColor: '#fff',
        inactiveTintColor: '#95afc0',
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: <Icon name="settings" />,
        activeTintColor: '#fff',
        inactiveTintColor: '#95afc0',
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);
const AppNavigator = createStackNavigator({

  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: MainApp,
    navigationOptions: {
      header: null
    }
  },
  AddRoom: {
    screen: AddRoom,
    navigationOptions: {
      header: null
    }
  },
  AddCustomer: {
    screen: AddCustomer,
    navigationOptions: {
      header: null
    }
  },
  UpdateCustomer: {
    screen: UpdateCustomer,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(AppNavigator);
