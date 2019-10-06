import React, {PureComponent} from 'react';
import {View, Text, StatusBar} from 'react-native';
import styles from './SendSMS.styles';
class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View styles={styles.container}>
        <StatusBar hidden />
        <Text>SendSMS</Text>
      </View>
    );
  }
}

export default index;
