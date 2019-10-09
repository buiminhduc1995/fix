import React, {PureComponent} from 'react';
import {} from 'react-native';
import AppContainer from './navigation';
import {Provider} from 'react-redux';
import store from './redux/store';
class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default index;
