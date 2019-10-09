import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import styles from './Home.styles';
import {connect} from 'react-redux';
class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
    };
  }
  componentDidMount() {
    var xhr = new XMLHttpRequest();
    var jsonRespones = '';
    xhr.open('POST', 'http://192.168.17.2:8069/api/getbalance', true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var data = xhr.responseText;
        jsonRespones = JSON.parse(data);

        this.setState({balance: jsonRespones[6].balance});
      }
    };
    var formData = new FormData();
    formData.append('token', this.props.token);
    formData.append('cid', this.props.username);
    xhr.send(formData);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello account:{this.props.username}</Text>
        <Text>Balance:{this.state.balance}</Text>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    username: state.authentication.username,
    token: state.authentication.token,
  };
}
export default connect(
  mapStateToProps,
  null,
)(index);
