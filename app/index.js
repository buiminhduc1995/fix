import React, {PureComponent} from 'react';
import AppContainer from './navigation';
import store from '../app/redux/store';
import {Provider} from 'react-redux';
class index extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default index;
