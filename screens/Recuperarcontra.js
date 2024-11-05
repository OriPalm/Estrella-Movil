import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RecuperarContrasena = () => {
const [email, setEmail] = useState('');

const handleRecuperar = () => {
    // acá es para recuperar xdd 
};

return (
    <View style={styles.container}>
    <Image
        source={{ uri: 'https://i.ibb.co/KWCbDzM/logo-Estrella-color.png' }} // Logo cargado desde URL
        style={styles.logo}
    />
    <Text style={styles.title}>Recuperar contraseña</Text>

    <Text style={styles.description}>
        Ingrese el mail asociado a su cuenta, se le enviará una nueva contraseña
    </Text>

    <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
    />

    <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
        <Text style={styles.buttonText}>Recuperar contraseña</Text>
    </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
},
logo: {
    width: 350,
    height: 250,
    marginBottom: 30,
    marginTop:50,
    resizeMode: 'contain', // Asegura que la imagen se ajuste bien
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
},
description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:25,
},
input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
    marginTop:25,
},
button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ff5555',
    borderRadius: 10,
    alignItems: 'center',
},
buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
},
});

export default RecuperarContrasena; 

