import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../firebaseconfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';  

export default function AgregarTurnos() {
  const route = useRoute();
  const navigation = useNavigation();
  const { fechaSeleccionada } = route.params || {};
  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaTurno, setFechaTurno] = useState(fechaSeleccionada || ''); 
  const [horaTurno, setHoraTurno] = useState(null);
  const [servicio, setServicio] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);

  useEffect(() => {
    if (fechaTurno) {
      const today = DateTime.local().startOf('day');  
      const selectedDate = DateTime.fromISO(fechaTurno).startOf('day'); 

      if (selectedDate < today) {
        setInvalidDate(true);
      } else {
        setInvalidDate(false);
      }
    }
  }, [fechaTurno]);

  const handleNombreClienteChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z\s]/g, '');
    setNombreCliente(formattedText);
  };

  const handleServicioChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z,\s]/g, '');
    setServicio(formattedText);
  };

  // Función que verifica si el horario de atención es válido (09:00-12:00 o 15:00-21:00)
  const verificarHorarioAtencion = (hora) => {
    const horaFormateada = DateTime.fromJSDate(hora).toFormat('HH:mm');
    
    // Horarios de atención
    const horaInicioMañana = DateTime.fromFormat('09:00', 'HH:mm');
    const horaFinMañana = DateTime.fromFormat('12:00', 'HH:mm');
    const horaInicioTarde = DateTime.fromFormat('15:00', 'HH:mm');
    const horaFinTarde = DateTime.fromFormat('21:00', 'HH:mm');
    
    const horaSeleccionada = DateTime.fromFormat(horaFormateada, 'HH:mm');

    if (
      (horaSeleccionada >= horaInicioMañana && horaSeleccionada <= horaFinMañana) ||
      (horaSeleccionada >= horaInicioTarde && horaSeleccionada <= horaFinTarde)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const verificarTurnoExistente = async () => {
    try {
      const horaFormateada = DateTime.fromJSDate(horaTurno).toFormat('HH:mm');  
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

    if (!horaTurno || !verificarHorarioAtencion(horaTurno)) {
      Alert.alert('Error', 'La hora seleccionada está fuera del horario de atención (09:00-12:00 o 15:00-21:00).');
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
      const horaFormateada = DateTime.fromJSDate(horaTurno).toFormat('HH:mm'); 
      await addDoc(collection(firestore, 'turnos'), {
        nombreCliente,
        fechaTurno,
        horaTurno: horaFormateada,
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
    setHoraTurno(currentTime);
    setShowTimePicker(false);
  };

  const onDayPress = (day) => {
    const selectedDate = DateTime.fromISO(day.dateString); 
    const today = DateTime.local().startOf('day');

    if (selectedDate.weekday === 7) {
      Alert.alert('Fecha inválida', 'No puedes seleccionar un domingo.');
      return;
    }

    if (selectedDate < today) {
      Alert.alert('Fecha inválida', 'No puedes seleccionar una fecha pasada.');
      return;
    }

    const formattedDate = selectedDate.toFormat('dd MM yyyy');
    setFechaTurno(formattedDate);  
    setCalendarVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Turno</Text>

      {/* Nombre del Cliente */}
      <Text>Nombre del Cliente:</Text>
      <TextInput
        value={nombreCliente}
        onChangeText={handleNombreClienteChange}
        placeholder="Nombre del Cliente"
        style={styles.input}
      />

      <Text>Fecha del Turno:</Text>
      <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.datePickerButton}>
        <Text style={styles.dateText}>{fechaTurno ? fechaTurno : 'Seleccionar fecha'}</Text>
      </TouchableOpacity>
      {invalidDate && (
        <Text style={styles.errorText}>La fecha seleccionada no puede ser anterior a la fecha actual.</Text>
      )}

      <Modal
        visible={calendarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [fechaTurno]: { selected: true, selectedColor: '#ff5555' },
              }}
              theme={{
                selectedDayBackgroundColor: '#ff5555',
                arrowColor: '#ff5555',
              }}
              locale="es"  // Localización en español
            />
          </View>
        </View>
      </Modal>

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

      <Text style={styles.horaSeleccionada}>Hora seleccionada: {horaTurno ? DateTime.fromJSDate(horaTurno).toFormat('HH:mm') : 'No seleccionada'}</Text>

      <Text>Servicio:</Text>
      <TextInput
        value={servicio}
        onChangeText={handleServicioChange}
        placeholder="Servicio"
        style={styles.input}
      />

      <TouchableOpacity style={styles.botonRojoAdd} onPress={agregarTurno}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
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
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  datePickerButton: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ff5555',
    borderRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  botonRojo: {
    backgroundColor: '#ff5555',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botonRojoAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5555',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
  },
  horaSeleccionada: {
    marginVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});