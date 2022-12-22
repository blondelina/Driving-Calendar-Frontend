import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { loginStyle } from '../styles/LoginStyles'


const InputField : React.FC<Props> = ({label, icon, inputType, keyboardType, fieldLabel, fieldFunction}) => {
  return (
    <View style={loginStyle.textbox}>
      {icon}
      {inputType == 'password' ? (
      <TextInput
        blurOnSubmit={false}
        keyboardType={keyboardType}
        placeholder={label}
        style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }}
        secureTextEntry>
      </TextInput>
      ) : (
      <TextInput
        blurOnSubmit={false}
        keyboardType={keyboardType}
        placeholder={label}
        style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5 }}>
      </TextInput>
      )}
      <TouchableOpacity onPress={() => {{fieldFunction}}} >
        <Text style={{ color: '#795F80' }}>{fieldLabel}</Text>
      </TouchableOpacity>
    </View>
  )
}