/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList,Image} from 'react-native';
import styles from './SendSMS.styles';
import {connect} from 'react-redux';
import ModalPhoneNumber from './ModalPhoneNumber';
import {send} from '../../image/index'
class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      listPhoneSend: [],
      content: '',
    };
  }
  showModal = () => {
    this.modalSelectedPhone.toggleModal(true);
  };
  productSelected = e => {
    this.setState({listPhoneSend: this.state.listPhoneSend.concat(e)});
  };
  addNumberInput = () => {
    if (this.state.phone.length !== 0) {
      this.setState({
        listPhoneSend: [...this.state.listPhoneSend, {phone: this.state.phone}],
      });
    } else {
      alert('Not input phonenumber');
    }
  };
  deleted = value => {
    const newProductSelected = this.state.listPhoneSend.filter(
      (product: any) => {
        if (value.phone !== product.phone) return true;
      },
    );
    this.setState({listPhoneSend: newProductSelected});
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={{borderWidth: 1, borderColor: 'black', height: 50, flex: 1}}
            placeholder="Insert phonenumber"
            onChangeText={text => this.setState({phone: text})}
            value={this.state.phone}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={{
              width: 40,
              height: 50,
              borderColor: 'green',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
            }}
            onPress={() => this.addNumberInput()}>
            <Text>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.showModal()}>
            <Text>Open Number</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.listPhoneSend}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => this.deleted(item)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
                width: 250,
                borderRadius: 5,
                backgroundColor: 'violet',
                marginBottom: 5,
              }}>
              <Text>{item.phone}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="Insert content"
            multiline
            style={{
              borderWidth: 1,
              borderColor: 'black',
              height: 50,
              width: '80%',
              flex: 1,
            }}
            value={this.state.content}
            onChangeText={text => this.setState({content: text})}
          />
          <TouchableOpacity>
            <Image source={send}style={{width:20,height:20}}/>
          </TouchableOpacity>
        </View>

        <ModalPhoneNumber
          ref={node => (this.modalSelectedPhone = node)}
          onSelectCustomer={this.onSelectCustomer}
          listNumberPhoneSelected={this.productSelected}
        />
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
  null,
  {forwardRef: true},
)(index);
