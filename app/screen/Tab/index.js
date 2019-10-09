import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Home from '../Home';
import SendSMS from '../SendSMS';
import {iconHome, iconMessage} from '../../image/index';
const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: <Image source={iconHome} style={{width: 20, height: 20}} />,
      },
    },
    SendSMS: {
      screen: SendSMS,
      navigationOptions: {
        tabBarIcon: <Image source={iconMessage} style={{width: 20, height: 20}} />
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      // showLabel: true,
    },
  },
);
const TabContainer = createAppContainer(TabNavigator);
export default TabContainer;
