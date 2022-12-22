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
    height: '70%',
  },
  register: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '95%',
  },
  textbox: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 15,
  },
  registerbox: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 15,
  },
  button: {
    padding: 20,
    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  loginHeader: {
    fontSize: 35,
    marginBottom: 30,
    textAlign:'center',
    color: 'black',
    fontWeight: 'bold'
  },
  linkToRegister: {
    padding: 15,
    textAlign: 'center',
    borderTopWidth: 0.5,
    marginTop: 10
  },
  labels: {
    color: 'black',
    fontWeight: 'bold'
  }
});

export { loginStyle }