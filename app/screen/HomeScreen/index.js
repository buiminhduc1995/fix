import React, {PureComponent} from 'react';
import {} from 'react-native';
import Tab from '../Tab';
class index extends PureComponent {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Tab />;
  }
}

export default index;
