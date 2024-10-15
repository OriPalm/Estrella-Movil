import { Text, StyleSheet, View,TextInput } from 'react-native'
import React from 'react';
import { StatusBar }  from 'expo-status-bar';

export default function login() {
 
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenido! </Text>
        <TextInput 
        placeholder='Correo Electrónico'
        style={styles.textinput}
        />
        <TextInput 
        placeholder='Contraseña'
        style={styles.textinput}
        />

        <StatusBar style='auto'/>
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  },
  titulo:{
    fontSize:50,
    color:'#000',
    fontWeight:'bold',
  },
  textinput:{
    borderWidth:1,
    borderColor: 'gray',
    padding: 15,
    paddingStart:20,
    width :'80%',
    height:70,
    marginTop :20,
    borderRadius:20,

  }
});