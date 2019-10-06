import React, {PureComponent} from 'react';
import TabContainer from '../Tab'
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
      <TabContainer/>
    );
  }
}

export default index;
