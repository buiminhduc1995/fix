/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';
import styles from './Login.styles';
import {connect} from 'react-redux';
import {saveAuthentication} from '../../redux/action/';
class index extends PureComponent {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  persistData() {
    let username = this.state.username;
    let password = this.state.password;
    AsyncStorage.setItem('username', username);
    AsyncStorage.setItem('password', password);
  }
  check() {
    AsyncStorage.getItem('username').then(username => {
      this.setState({username: username});
    });
    AsyncStorage.getItem('password').then(password => {
      this.setState({password: password});
    });
  }
  componentDidMount() {
    this.check();
  }
  login = () => {
    var xhr = new XMLHttpRequest();
    var jsonResponse = '';
    xhr.open('POST', 'http://192.168.17.2:8069/api/authentication', true);
    xhr.setRequestHeader('Content-type', 'multipart/form-data');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var data = xhr.responseText;
        jsonResponse = JSON.parse(data);
        if (jsonResponse.token !== 'undefined') {
          this.persistData();
          this.props.saveAuthentication(jsonResponse.name, jsonResponse.token);
          this.props.navigation.navigate('HomeScreen');
        } else {
          Alert.alert(
            'Thông báo',
            'Vui lòng kiểm tra lại tên đăng nhập và mật khẩu',
          );
        }
      }
    };
    var formData = new FormData();
    formData.append('login', this.state.username);
    formData.append('pw', this.state.password);
    xhr.send(formData);
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Text>LOGIN</Text>
        <View
          style={{
            height: 50,
            width: '60%',
            backgroundColor: 'red',
            borderRadius: 5,
          }}>
          <TextInput
            placeholder="Username"
            value={this.state.username}
            onChangeText={txt => this.setState({username: txt})}
          />
        </View>
        <View
          style={{
            height: 50,
            width: '60%',
            backgroundColor: 'red',
            borderRadius: 5,
            marginTop: 10,
          }}>
          <TextInput
            placeholder="Password"
            value={this.state.password}
            onChangeText={txt => this.setState({password: txt})}
          />
        </View>

        <TouchableOpacity onPress={() => this.login()}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = {
  saveAuthentication,
};

export default connect(
  null,
  mapDispatchToProps,
)(index);
