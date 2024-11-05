import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseconfig';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Calendar } from 'react-native-calendars';

const screenWidth = Dimensions.get('window').width;

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [turnosFiltrados, setTurnosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false); 
  const [turnoAEliminar, setTurnoAEliminar] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const navigation = useNavigation();

// conectar la app con la bd para pedir los turnos
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'turnos'), (snapshot) => {
      const turnosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTurnos(turnosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

// Filtrar y ordenar los turnos por hora para la fecha seleccionada
  useEffect(() => {
    const turnosDelDia = turnos
      .filter(turno => turno.fechaTurno === fechaSeleccionada)
      .sort((a, b) => a.horaTurno.localeCompare(b.horaTurno)); // Ordenar por horaTurno

    setTurnosFiltrados(turnosDelDia);
  }, [fechaSeleccionada, turnos]);

// eliminar y confirmar turno
  const confirmarEliminacion = (id) => {
    setTurnoAEliminar(id);
    setModalVisible(true);
  };

  const eliminarTurno = async () => {
    try {
      await deleteDoc(doc(firestore, 'turnos', turnoAEliminar));
      setTurnoAEliminar(null);
      setModalVisible(false);
    } catch (error) {
      console.error("Error al eliminar turno:", error);
    }
  };

  // pantalla turnos
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendario de Turnos</Text>

      {/* Día y Fecha Seleccionada */}
      <View style={styles.fechaContainer}>
        <Text style={styles.fechaLabel}>Día:</Text>
        <TouchableOpacity onPress={() => setCalendarVisible(true)}>
          <Text style={styles.fechaTexto}>{fechaSeleccionada}</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de Nuevo Turno */}
      <TouchableOpacity
        style={styles.botonRojo}
        onPress={() => navigation.navigate('AgregarTurno', { fechaSeleccionada })}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.botonTexto}>Nuevo Turno</Text>
      </TouchableOpacity>

      {/* Calendario Modal */}
      <Modal
        visible={calendarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Calendar
              onDayPress={(day) => {
                setFechaSeleccionada(day.dateString);
                setCalendarVisible(false);
              }}
              markedDates={{
                [fechaSeleccionada]: { selected: true, selectedColor: '#ff5555' },
              }}
              theme={{
                selectedDayBackgroundColor: '#ff5555',
                arrowColor: '#ff5555',
              }}
            />
          </View>
        </View>
      </Modal>

      {loading ? (
        <Text>Cargando turnos...</Text>
      ) : (
        <FlatList
          data={turnosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.turnoContainer}>
              <View style={styles.turnoContent}>
                <View style={styles.horaContainer}>
                  <Text style={styles.hora}>{item.horaTurno}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cliente}>{item.nombreCliente}</Text>
                  <Text style={styles.servicio}>{item.servicio}</Text>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate('EditarTurno', { turnoId: item.id })}>
                    <Ionicons name="create-outline" size={24} color="#ff5555" style={styles.icono} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => confirmarEliminacion(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="#ff5555" style={styles.icono} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noTurnos}>No hay turnos para esta fecha.</Text>}
        />
      )}

      {/* Modal para Confirmación de Eliminación */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Eliminación</Text>
            <Text style={styles.modalText}>¿Estás seguro de que deseas eliminar este turno?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.botonCancelar} onPress={() => setModalVisible(false)}>
                <Text style={styles.botonTextoCancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonRojo} onPress={eliminarTurno}>
                <Text style={styles.botonTexto}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  fechaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  fechaLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  fechaTexto: {
    fontSize: 18,
    color: '#ff5555',
    textDecorationLine: 'underline',
  },
  botonRojo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5555',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  turnoContainer: {
    width: screenWidth - 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  turnoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horaContainer: {
    flex: 1,
  },
  hora: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 2,
  },
  cliente: {
    fontSize: 16,
  },
  servicio: {
    fontSize: 14,
    color: '#777',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icono: {
    marginHorizontal: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botonCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 20,
  },
  botonTextoCancelar: {
    color: 'black',
    fontSize: 16,
  },
  noTurnos: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Turnos;
