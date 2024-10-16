import { Text, StyleSheet, View, ScrollView, Image, Pressable, onPressFunction } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'; // Importar navegación


export default function Perfil() {
    
    const navigation = useNavigation(); // Usar el hook para la navegación

    const onPressFunction = () => {
      // Aquí puedes añadir la lógica de cierre de sesión, como limpiar tokens o estado de usuario
      navigation.navigate('Login'); // Vuelve a la pantalla de inicio de sesión
    };
    return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
          <Image
            source={{
                uri: 'https://i.ibb.co/KWCbDzM/logo-Estrella-color.png',
            }}
            style={styles.image}
            />
          <Text style={styles.nombre}>Estrella</Text>
          <Text style={styles.email}>estrellaestilista@gmail.com</Text>
          <Pressable onPress={onPressFunction} style={styles.boton}>
            <Text style={styles.cerrarsesion}>Cerrar Sesión</Text>
            <Text style={styles.icono}>{'>'}</Text>
          </Pressable>
      </View>
    </ScrollView>

    );
  }


const styles = StyleSheet.create({
  image: {
    width: 290,
    height: 150,
  },

  nombre: {
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 18,
  },

  email: {
    color: 'grey',
    marginTop: 5,

  },

  scrollView: {
    backgroundColor: 'white',
    height: 830,
  },

  container: {
    display: 'flex',
    alignItems: 'center',
  },

  cerrarsesion: {
    fontSize: 16,
  },

  icono: {
    color: 'grey',
    fontSize: 18,
  },

  boton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 38},
  })