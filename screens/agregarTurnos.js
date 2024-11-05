import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firestore } from '../firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

export default function AgregarTurnos() {
  const route = useRoute();
  const navigation = useNavigation();

  // Captura la fecha seleccionada de los parámetros de navegación
  const { fechaSeleccionada } = route.params || {};

  // Estados para cada campo del formulario
  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaTurno, setFechaTurno] = useState(fechaSeleccionada || ''); // Inicializar con la fecha seleccionada
  const [horaTurno, setHoraTurno] = useState('');
  const [servicio, setServicio] = useState('');

  // Función para agregar un nuevo turno a la BD
  const agregarTurno = async () => {
    // Validación para rellenar todos los campos
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
    fontSize: 24,
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
    backgroundColor: '#ff5555',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
