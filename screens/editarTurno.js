import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseconfig';
import { doc, getDoc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';  // Importamos Calendar
import { DateTime } from 'luxon';  // Importamos Luxon

export default function EditarTurno() {
  const route = useRoute();
  const navigation = useNavigation();
  const { turnoId } = route.params;
  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaTurno, setFechaTurno] = useState('');
  const [horaTurno, setHoraTurno] = useState(DateTime.local());  
  const [servicio, setServicio] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false); 
  const [isEditable, setIsEditable] = useState(true); 

  useEffect(() => {
    const cargarTurno = async () => {
      try {
        const docRef = doc(firestore, 'turnos', turnoId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const turnoFecha = DateTime.fromISO(data.fechaTurno); 


          if (turnoFecha < DateTime.local()) {
            setIsEditable(false); 
            Alert.alert('Turno Pasado', 'Este turno ya ha pasado, solo puedes editar el servicio y el nombre del cliente.');
          }

          setNombreCliente(data.nombreCliente);
          setFechaTurno(data.fechaTurno);
          setHoraTurno(DateTime.fromISO(`1970-01-01T${data.horaTurno}:00`)); // Usamos Luxon para la hora
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
      const horaFormateada = horaTurno.toFormat('HH:mm'); 
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


  const verificarHorarioAtencion = (hora) => {
    const horaFormat = hora.toFormat('HH:mm');
    return (
      (horaFormat >= '09:00' && horaFormat <= '12:00') || 
      (horaFormat >= '15:00' && horaFormat <= '21:00')
    );
  };

  // Actualizar turno
  const actualizarTurno = async () => {
    if (isEditable && (fechaTurno || horaTurno)) {
      const turnoExistente = await verificarTurnoExistente();
      if (turnoExistente) {
        Alert.alert('Error', 'Ya hay un turno programado para esta fecha y hora. Por favor selecciona otra.');
        return;
      }

      if (!verificarHorarioAtencion(horaTurno)) {
        Alert.alert('Error', 'La hora seleccionada está fuera del horario de atención (09:00-12:00 o 15:00-21:00).');
        return;
      }
    }

    try {
      const docRef = doc(firestore, 'turnos', turnoId);
      await updateDoc(docRef, {
        nombreCliente,
        servicio,
        ...(isEditable && {
          fechaTurno,
          horaTurno: horaTurno.toFormat('HH:mm'),  
        }),
      });
      Alert.alert('Éxito', 'Turno actualizado exitosamente');
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar el turno:", error);
      Alert.alert('Error', 'Hubo un problema al actualizar el turno');
    }
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || horaTurno.toJSDate();
    setShowTimePicker(false);

    const newHora = DateTime.fromJSDate(currentTime);
    setHoraTurno(newHora);
  };


  const onDayPress = (day) => {
    const selectedDate = DateTime.fromISO(day.dateString);  
    const today = DateTime.local(); 


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
      <Text style={styles.title}>Editar Turno</Text>

      <Text>Nombre del Cliente:</Text>
      <TextInput
        value={nombreCliente}
        onChangeText={setNombreCliente}
        placeholder="Nombre del Cliente"
        style={styles.input}
      />

<Text>Fecha del Turno:</Text>
<TouchableOpacity 
  onPress={() => setCalendarVisible(true)}  
    style={styles.datePickerButton} 
  disabled={!isEditable}  
>
  <Text style={styles.dateText}>{fechaTurno ? fechaTurno : 'Seleccionar fecha'}</Text>
</TouchableOpacity>

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
            />
          </View>
        </View>
      </Modal>


<Text>Hora del Turno:</Text>
<TouchableOpacity 
  style={styles.botonRojo} 
  onPress={() => setShowTimePicker(true)} 
  disabled={!isEditable}  
>
  <Text style={styles.botonTexto}>Seleccionar Hora</Text>
</TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={horaTurno.toJSDate()} 
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}
      <Text>Hora seleccionada: {horaTurno.toFormat('HH:mm')}</Text>

      {/* Servicio */}
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
  datePickerButton: {
    backgroundColor: '#ff5555',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  dateText: {
    color: '#fff',
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
