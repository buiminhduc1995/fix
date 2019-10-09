/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  FlatList,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import Contacts from 'react-native-contacts';
import AntDesign from 'react-native-vector-icons/AntDesign';
class ModalPhoneNumber extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      listPhone: [],
      listPhoneSelected: [],
      searchText: '',
      status: false,
    };
  }
  componentDidMount = () => {
    if (Platform.OS === 'Android') {
      try {
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Starterkit App Contacts Permission',
            message: 'Starterkit App needs access to your contacts',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Contacts.getAll((err, contacts) => {
            if (err) {
              console.log(err);
            } else {
              this.setState({listPhone: contacts.sort()});
            }
            console.log(contacts);
          });
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      Contacts.getAll((err, contacts) => {
        if (err) {
          console.log(err);
        }
        this.setState({listPhone: contacts.sort()});
        console.log(contacts);
      });
    }
    Contacts.getAll((err, contacts) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({listPhone: contacts.sort()});
      }
    });
  };
  toggleModal(visible) {
    this.setState({modalVisible: visible});
  }
  renderButton = (txt, backgroundColor, borderColor, onPress) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: '50%',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor,
          borderWidth: 1,
          borderColor,
        }}>
        <Text>{txt}</Text>
      </TouchableOpacity>
    );
  };
  AddNumber = value => {
    value.flag = true;
    this.setState({
      listPhoneSelected: new Set([
        ...this.state.listPhoneSelected,
        {phone: value.phoneNumbers[0].number},
      ]),
      status: true,
    });
  };
  DeteleNumber = value => {
    value.flag = false;
    const newProductSelected = Array.from(this.state.listPhoneSelected).filter(
      (product: any) => {
        if (value.phoneNumbers[0].number !== product.phone) return true;
      },
    );
    this.setState({listPhoneSelected: newProductSelected});
  };
  ok = () => {
    this.props.listNumberPhoneSelected(Array.from(this.state.listPhoneSelected));
    this.setState({modalVisible: !this.state.modalVisible});
  };
  setSearchText(event) {
    searchText = event.nativeEvent.text;
    this.setState({
      searchText,
    });
  }

  render() {
    let {searchText, listPhone} = this.state;
    let listPhoneFilter = listPhone.filter(item => {
      return item.givenName
        .toLowerCase()
        .match(searchText.trim().toLowerCase());
    });
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.modalVisible}>
        <View style={styles.container}>
          <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
            <TextInput
              placeholder="Search PhoneNumber"
              value={this.state.name}
              onChange={this.setSearchText.bind(this)}
            />
            <FlatList
              data={listPhoneFilter}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 40,
                    width: 240,
                    borderRadius: 5,
                    backgroundColor: 'violet',
                    marginBottom:5
                  }}
                  onPress={() =>
                    !item.flag ? this.AddNumber(item) : this.DeteleNumber(item)
                  }>
                  <Text>{item.displayName}</Text>
                  <Text>{item.phoneNumbers[0].number}</Text>
                  {!item.flag ? (
                    <View />
                  ) : (
                    <AntDesign name="check" size={30} color="black" />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.containerButton}>
            {this.renderButton('OK', 'red', 'blue', () => this.ok())}
            {this.renderButton('Cancel', 'violet', 'green')}
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
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
)(ModalPhoneNumber);
