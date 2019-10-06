import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import SendSMS from '../SendSMS';
import Home from '../Home';
const TabNavigator = createBottomTabNavigator(
  {
    Home: {screen: Home},
    SendSMS: {screen: SendSMS},
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#124c7d',
        height: 50,
      },
      labelStyle: {
        fontSize: 12,
        color: 'white',
      },
      showIcon: true,
      showLabel: true,
      inactiveTintColor: 'white',
      activeTinColor: '#1e67a6',
    },
  },
);
const TabContainer = createAppContainer(TabNavigator);

export default TabContainer;
