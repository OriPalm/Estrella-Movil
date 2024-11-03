import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

export default function AgregarTurnos() {
  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaTurno, setFechaTurno] = useState('');
  const [horaTurno, setHoraTurno] = useState('');
  const [servicio, setServicio] = useState('');
  const navigation = useNavigation();

  const agregarTurno = async () => {
    if (!nombreCliente || !fechaTurno || !horaTurno || !servicio) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      await addDoc(collection(firestore, 'turnos'), {
        nombreCliente,
        fechaTurno,
        horaTurno,
        servicio,
      });
      Alert.alert('Éxito', 'Turno agregado exitosamente');
      navigation.goBack();
    } catch (error) {
      console.error("Error al agregar turno:", error);
      Alert.alert('Error', 'Hubo un problema al agregar el turno');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Turno</Text>
      
      <Text>Nombre del Cliente:</Text>
      <TextInput
        value={nombreCliente}
        onChangeText={setNombreCliente}
        placeholder="Nombre del Cliente"
        style={styles.input}
      />
      
      <Text>Fecha del Turno (YYYY-MM-DD):</Text>
      <TextInput
        value={fechaTurno}
        onChangeText={setFechaTurno}
        placeholder="Fecha del Turno"
        style={styles.input}
      />
      
      <Text>Hora del Turno (HH:mm):</Text>
      <TextInput
        value={horaTurno}
        onChangeText={setHoraTurno}
        placeholder="Hora del Turno"
        style={styles.input}
      />
      
      <Text>Servicio:</Text>
      <TextInput
        value={servicio}
        onChangeText={setServicio}
        placeholder="Servicio"
        style={styles.input}
      />
      
      <TouchableOpacity style={styles.botonRojo} onPress={agregarTurno}>
        <Text style={styles.botonTexto}>Agregar Turno</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  botonRojo: {
    backgroundColor: '#ff5555', // Color rojo para el botón
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

