import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts} from 'expo-font'

export default function Login() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.image}
        resizeMode="contain" 
      />
      <Text style={styles.titulo}>Bienvenido!</Text>
      <TextInput 
        placeholder='Correo Electrónico'
        style={styles.textinput}
      />
      <TextInput 
        placeholder='Contraseña'
        style={styles.textinput}
        secureTextEntry
      />

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Iniciar Sesión')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  image: {
    width: 420, 
    height: 150, 
    marginBottom: 80,
  },
  titulo: {
    fontSize: 50,  // Tamaño ajustado
    color: '#000', // Color ajustado
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 45,
    alignSelf: 'flex-start',

  },
  textinput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    paddingStart: 20,
    width: '80%',
    height: 55,  // Tamaño ajustado
    marginTop: 20,
    borderRadius: 10,  // Radio ajustado
  },
  forgotPasswordContainer: {
    width: '80%',  // Asegura que el ancho sea igual al de los inputs
    alignSelf: 'flex-start',  // Alinea el texto hacia la izquierda
    marginLeft: 45,  // Ajusta el margen para alinearlo con el título
  },
  forgotPasswordText: {
    color: '#FF0000',  // Rojo
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
    
  },
  button: {
    backgroundColor: '#ed3241',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});