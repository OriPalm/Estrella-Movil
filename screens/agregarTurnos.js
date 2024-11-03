import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { firestore } from '../firebaseconfig'; 
import { collection, addDoc } from 'firebase/firestore';

export default function AgregarTurnos() {
  // Estados para cada campo del formulario
  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaTurno, setFechaTurno] = useState('');
  const [horaTurno, setHoraTurno] = useState('');
  const [servicio, setServicio] = useState('');

  // Función para agregar un nuevo turno a Firestore
  const agregarTurno = async () => {
    if (!nombreCliente || !fechaTurno || !horaTurno || !servicio) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      // Agregar el documento a la colección "turnos"
      await addDoc(collection(firestore, 'turnos'), {
        nombreCliente,
        fechaTurno,
        horaTurno,
        servicio,
      });
      Alert.alert('Éxito', 'Turno agregado exitosamente');
      
      // Limpiar los campos del formulario después de agregar el turno
      setNombreCliente('');
      setFechaTurno('');
      setHoraTurno('');
      setServicio('');
    } catch (error) {
      console.error("Error al agregar turno:", error);
      Alert.alert('Error', 'Hubo un problema al agregar el turno');
    }
  };

  // Interfaz del formulario
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Pantalla para Agregar Turnos</Text>
      
      <Text>Nombre del Cliente:</Text>
      <TextInput
        value={nombreCliente}
        onChangeText={setNombreCliente}
        placeholder="Nombre del Cliente"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      
      <Text>Fecha del Turno (YYYY-MM-DD):</Text>
      <TextInput
        value={fechaTurno}
        onChangeText={setFechaTurno}
        placeholder="Fecha del Turno"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      
      <Text>Hora del Turno (HH:mm):</Text>
      <TextInput
        value={horaTurno}
        onChangeText={setHoraTurno}
        placeholder="Hora del Turno"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      
      <Text>Servicio:</Text>
      <TextInput
        value={servicio}
        onChangeText={setServicio}
        placeholder="Servicio"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      
      <Button title="Agregar Turno" onPress={agregarTurno} />
    </View>
  );
}