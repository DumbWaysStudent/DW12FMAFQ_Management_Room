import { createAppContainer } from 'react-navigation'
import Home from './src/screens/Home';
import { createBottomTabNavigator } from 'react-navigation-tabs';
const MainApp = createBottomTabNavigator(
  {
    Home: { screen: Home },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);
export default createAppContainer(MainApp)