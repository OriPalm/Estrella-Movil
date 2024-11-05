import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseconfig';
import { doc, getDoc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditarTurno() {
  const route = useRoute();
  const navigation = useNavigation();
  const { turnoId } = route.params;

  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaTurno, setFechaTurno] = useState('');
  const [horaTurno, setHoraTurno] = useState(new Date());
  const [servicio, setServicio] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const cargarTurno = async () => {
      try {
        const docRef = doc(firestore, 'turnos', turnoId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombreCliente(data.nombreCliente);
          setFechaTurno(data.fechaTurno);
          setHoraTurno(new Date(`1970-01-01T${data.horaTurno}:00`));
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

  const actualizarTurno = async () => {
    const turnoExistente = await verificarTurnoExistente();
    if (turnoExistente) {
      Alert.alert('Error', 'Ya hay un turno programado para esta fecha y hora. Por favor selecciona otra.');
      return; 
    }

    try {
      const docRef = doc(firestore, 'turnos', turnoId);
      await updateDoc(docRef, {
        nombreCliente,
        fechaTurno,
        horaTurno: horaTurno.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        servicio,
      });
      Alert.alert('Éxito', 'Turno actualizado exitosamente');
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar el turno:", error);
      Alert.alert('Error', 'Hubo un problema al actualizar el turno');
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

      <Text>Hora del Turno:</Text>
      <TouchableOpacity style={styles.botonRojo} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.botonTexto}>Seleccionar Hora</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={horaTurno}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}
      <Text>Hora seleccionada: {horaTurno.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>

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
  botonRojo: {
    backgroundColor: '#ff5555',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
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