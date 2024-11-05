import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firestore } from '../firebaseconfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default function AgregarTurnos() {
  const route = useRoute();
  const navigation = useNavigation();
  const { fechaSeleccionada } = route.params || {};
  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaTurno, setFechaTurno] = useState(fechaSeleccionada || '');
  const [horaTurno, setHoraTurno] = useState(null); 
  const [servicio, setServicio] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleNombreClienteChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z\s]/g, '');
    setNombreCliente(formattedText);
  };

  const handleServicioChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z,\s]/g, '');
    setServicio(formattedText);
  };

  const verificarTurnoExistente = async () => {
    try {
      const horaFormateada = horaTurno.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const q = query(
        collection(firestore, 'turnos'),
        where('fechaTurno', '==', fechaTurno),
        where('horaTurno', '==', horaFormateada)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error al verificar turnos existentes:", error);
      return false;
    }
  };

  const agregarTurno = async () => {

    if (!horaTurno) {
      Alert.alert('Error', 'Por favor, selecciona una hora antes de agregar el turno.');
      return;
    }

    if (!nombreCliente || !fechaTurno || !servicio) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const turnoExistente = await verificarTurnoExistente();
    if (turnoExistente) {
      Alert.alert('Error', 'Ya hay un turno programado para esta fecha y hora. Por favor selecciona otra.');
      return;
    }

    try {
      await addDoc(collection(firestore, 'turnos'), {
        nombreCliente,
        fechaTurno,
        horaTurno: horaTurno.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        servicio,
      });
      Alert.alert('Éxito', 'Turno agregado exitosamente');
      navigation.goBack();
    } catch (error) {
      console.error("Error al agregar turno:", error);
      Alert.alert('Error', 'Hubo un problema al agregar el turno');
    }
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || horaTurno;
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const isValidTime =
      (hours >= 9 && hours < 12) ||
      (hours >= 15 && hours < 21) ||
      (hours === 12 && minutes === 0) || // Permite exactamente las 12:00
      (hours === 21 && minutes === 0);   // Permite exactamente las 21:00

    if (!isValidTime) {
      setShowTimePicker(false);

      Alert.alert(
        "Hora no válida",
        "Por favor, selecciona una hora dentro del horario de atención (09:00-12:00 o 15:00-21:00).",
        [
          {
            text: "OK",
            onPress: () => setShowTimePicker(true),
          }
        ]
      );

      return;
    }

    setShowTimePicker(false);
    setHoraTurno(currentTime); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Turno</Text>

      <Text>Nombre del Cliente:</Text>
      <TextInput
        value={nombreCliente}
        onChangeText={handleNombreClienteChange}
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

      <Text>Hora del Turno:</Text>
      <TouchableOpacity style={styles.botonRojo} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.botonTexto}>Seleccionar Hora</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={horaTurno || new Date()} 
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}
      
      <Text>Hora seleccionada: {horaTurno ? horaTurno.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No seleccionada'}</Text>

      <Text>Servicio:</Text>
      <TextInput
        value={servicio}
        onChangeText={handleServicioChange}
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
