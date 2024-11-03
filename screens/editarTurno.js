// editarTurno.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditarTurno() {
  const route = useRoute();
  const navigation = useNavigation();
  const { turnoId } = route.params;

  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaTurno, setFechaTurno] = useState('');
  const [horaTurno, setHoraTurno] = useState('');
  const [servicio, setServicio] = useState('');

  useEffect(() => {
    const cargarTurno = async () => {
      try {
        const docRef = doc(firestore, 'turnos', turnoId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombreCliente(data.nombreCliente);
          setFechaTurno(data.fechaTurno);
          setHoraTurno(data.horaTurno);
          setServicio(data.servicio);
        } else {
          Alert.alert('Error', 'No se encontró el turno.');
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error al cargar el turno:", error);
      }
    };

    cargarTurno();
  }, [turnoId]);

  const actualizarTurno = async () => {
    try {
      const docRef = doc(firestore, 'turnos', turnoId);
      await updateDoc(docRef, {
        nombreCliente,
        fechaTurno,
        horaTurno,
        servicio,
      });
      Alert.alert('Éxito', 'Turno actualizado exitosamente');
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar el turno:", error);
      Alert.alert('Error', 'Hubo un problema al actualizar el turno');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Turno</Text>

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

      <TouchableOpacity style={styles.botonActualizar} onPress={actualizarTurno}>
        <Text style={styles.botonTexto}>Guardar Cambios</Text>
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
  botonActualizar: {
    backgroundColor: '#ff5555',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
