import {
  DatePickerAndroid,
  StyleSheet
} from 'react-native';

const loginStyle = StyleSheet.create({
  login: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '85%',
  },
  textbox: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    padding: 10,
    textAlign: 'left',
    margin: 10,
    width: 200
  },
  button:{
    padding: 10
  },
  loginHeader:{
    fontSize: 35,
    padding: 50,
    color: 'black',
    fontWeight: 'bold'
  },
  linkToRegister:{
    padding: 15,
    textAlign: 'center',
    borderTopWidth: 0.5,
    marginTop: 10
  },
  rolesDropdown:{
    padding: 10,
    margin: 10,
    width: 200
  },
  labels:{
    color: 'black',
    fontWeight: 'bold'
  }
});

export { loginStyle }