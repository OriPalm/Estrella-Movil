import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importa los íconos de Expo

export default function Login() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para manejar la visibilidad de la contraseña

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
      <View style={styles.passwordContainer}>
        <TextInput 
          placeholder='Contraseña'
          style={styles.textinputPassword}
          secureTextEntry={!passwordVisible} // Alterna la visibilidad de la contraseña
        />
        <TouchableOpacity 
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)} // Alterna el estado de visibilidad
        >
          <Ionicons 
            name={passwordVisible ? 'eye' : 'eye-off'} // Cambia el ícono según el estado
            size={24} 
            color="gray" 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.forgotPasswordContainer}
        onPress={() => navigation.navigate('Recuperarcontra')}
      >
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
    marginTop: 80,
  },
  titulo: {
    fontSize: 50,
    color: '#000',
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
    height: 55,
    marginTop: 20,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width: '80%',
    height: 55,
    marginTop: 20,
    paddingRight: 10, // Espacio para el ícono del ojo
  },
  textinputPassword: {
    flex: 1,
    padding: 15,
    paddingStart: 20,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPasswordContainer: {
    width: '80%',
    alignSelf: 'flex-start',
    marginLeft: 45,
  },
  forgotPasswordText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 10,
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