/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert,ImageBackground} from 'react-native';
import styles from './Login.styles';
import {connect} from 'react-redux';
import {saveAuthentication} from '../../redux/action';
import {background} from '../../image/index'
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
  login = () => {
    // axios or fetch API or XMLHTTP
    var xhr = new XMLHttpRequest();
    var jsonRespones = '';
    xhr.open('POST', 'http://192.168.17.2:8069/api/authentication', true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var data = xhr.responseText;
        jsonRespones = JSON.parse(data);
        if (jsonRespones.token !== undefined) {
          this.props.saveAuthentication(
            jsonRespones.name,
            jsonRespones.token,
            this.state.username,
          );
          Alert.alert('Noti', 'Login success');
          this.props.navigation.navigate('HomeScreen')
        } else {
          Alert.alert('Noti', 'Login fail');
        }
      }
    };
    var formData = new FormData();
    formData.append('login', this.state.username);
    formData.append('pw', this.state.password);
    xhr.send(formData);
  };
  printRedux = () => {
    console.log('====================================');
    console.log(this.props.name, this.props.token, this.props.username);
    console.log('====================================');
    this.props.navigation.navigate('HomeScreen')
  };
  render() {
    return (
      <ImageBackground source={background} style={styles.container}>
        <TextInput
          style={{width: '60%', height: 40, backgroundColor: 'gray',borderRadius:5}}
          placeholder="Insert Username"
          onChangeText={text => this.setState({username: text})}
          value={this.state.username}
        />
        <TextInput
          style={{
            width: '60%',
            height: 40,
            backgroundColor: 'gray',
            marginTop: 5,
            borderRadius:5
          }}
          placeholder="Insert Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text})}
          value={this.state.password}
        />
        <TouchableOpacity onPress={() => this.login()}>
          <Text>Login</Text>
        </TouchableOpacity>
        <Text onPress={() => this.printRedux()}>Print Redux Authen</Text>
      </ImageBackground>
    );
  }
}
function mapStateToProps(state) {
  return {
    name: state.authentication.name,
    token: state.authentication.token,
    username: state.authentication.username,
  };
}
const mapDispatchToProps = {
  saveAuthentication,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
