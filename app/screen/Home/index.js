import React, {PureComponent} from 'react';
import {View, Text, StatusBar} from 'react-native';
import styles from './Home.styles';
class index extends PureComponent {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View styles={styles.container}>
        <StatusBar hidden />
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default index;
