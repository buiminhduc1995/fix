import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screen/Login';
import HomeScreen from '../screen/HomeScreen'
const AppNavigator = createStackNavigator({
  Login: {screen: Login},
  HomeScreen: {screen: HomeScreen},
});
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
