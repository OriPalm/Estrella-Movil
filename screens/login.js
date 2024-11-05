import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

export default function Login() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

// Limpiar campos cuando se vuelve a la pantalla de Login
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    setEmail('');
    setPassword('');
  });
  return unsubscribe;
}, [navigation]);

  const logueo = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Iniciando sesión', 'Accediendo...');
      navigation.navigate('HomeTabs');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.image}
            resizeMode="contain" 
          />
          <Text style={styles.titulo}>¡Bienvenido!</Text>
          <TextInput 
            placeholder='Correo Electrónico'
            style={styles.textinput} 
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
          />
          <View style={styles.passwordContainer}>
            <TextInput 
              placeholder='Contraseña'
              style={styles.textinputPassword}
              secureTextEntry={!passwordVisible}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons 
                name={passwordVisible ? 'eye' : 'eye-off'} 
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

          <TouchableOpacity style={styles.button} onPress={logueo}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <StatusBar style='auto' />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 350, 
    height: 200, 
    marginBottom: 50,
  },
  titulo: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    width: '100%',
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
    width: '100%',
    height: 55,
    marginTop: 20,
  },
  textinputPassword: {
    flex: 1,
    padding: 15,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#ed3241',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 90,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
