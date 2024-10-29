import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons

const screenWidth = Dimensions.get('window').width; // Ancho de la pantalla

// Datos de los turnos por día
const turnosPorDia = {
  '10': [
    { id: '1', hora: '09:00', cliente: 'Luciana Molina', servicio: 'Color, Alisado', estado: 'Confirmado' },
    { id: '2', hora: '11:00', cliente: 'Micaela Daiana Laime', servicio: 'Balayage', estado: 'Confirmado' },
    { id: '3', hora: '16:00', cliente: 'Oriana Palmero', servicio: 'Corte, Nutrición', estado: 'Confirmado' },
  ],
  '11': [],
  '12': [
    { id: '4', hora: '17:30', cliente: 'Aixa Camila Ibarra', servicio: 'Alisado', estado: 'Pendiente' },
  ],
  '13': [
    { id: '5', hora: '18:30', cliente: 'Sasha Martinez', servicio: 'Shock de Keratina', estado: 'Pendiente' },
    { id: '6', hora: '20:00', cliente: 'Martha Ordoñez', servicio: 'Extensiones', estado: 'Pendiente' },
  ],
};

const Turnos = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoTurno, setNuevoTurno] = useState({ hora: '', cliente: '', servicio: '' });

  const obtenerDiaActual = () => {
    const hoy = new Date();
    if (hoy.getMonth() === 9) {
      return hoy.getDate().toString();
    }
    return '10';
  };

  useEffect(() => {
    const diaHoy = obtenerDiaActual();
    setDiaSeleccionado(diaHoy);
  }, []);

  const cambiarDia = (nuevoDia) => {
    setDiaSeleccionado(nuevoDia);
  };

  const turnosDelDia = turnosPorDia[diaSeleccionado] || [];

  const agregarNuevoTurno = () => {
    if (nuevoTurno.hora && nuevoTurno.cliente && nuevoTurno.servicio) {
      const nuevoId = (turnosDelDia.length + 1).toString();
      turnosPorDia[diaSeleccionado].push({
        id: nuevoId,
        hora: nuevoTurno.hora,
        cliente: nuevoTurno.cliente,
        servicio: nuevoTurno.servicio,
        estado: 'Pendiente',
      });
      setNuevoTurno({ hora: '', cliente: '', servicio: '' });
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendario - Octubre 2024</Text>

      <View style={styles.calendarContainer}>
        <TouchableOpacity style={styles.botonNuevoTurno} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text style={styles.botonTexto}>Nuevo Turno</Text>
        </TouchableOpacity>

        <View style={styles.daysContainer}>
          <TouchableOpacity onPress={() => cambiarDia('10')}>
            <Text style={diaSeleccionado === '10' ? styles.dayActive : styles.dayInactive}>JUE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cambiarDia('11')}>
            <Text style={diaSeleccionado === '11' ? styles.dayActive : styles.dayInactive}>VIE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cambiarDia('12')}>
            <Text style={diaSeleccionado === '12' ? styles.dayActive : styles.dayInactive}>SAB</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cambiarDia('13')}>
            <Text style={diaSeleccionado === '13' ? styles.dayActive : styles.dayInactive}>DOM</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => cambiarDia('10')}>
            <Text style={diaSeleccionado === '10' ? styles.dateActive : styles.dateInactive}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cambiarDia('11')}>
            <Text style={diaSeleccionado === '11' ? styles.dateActive : styles.dateInactive}>11</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cambiarDia('12')}>
            <Text style={diaSeleccionado === '12' ? styles.dateActive : styles.dateInactive}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cambiarDia('13')}>
            <Text style={diaSeleccionado === '13' ? styles.dateActive : styles.dateInactive}>13</Text>
          </TouchableOpacity>
        </View>
      </View>

      {turnosDelDia.length > 0 ? (
        <FlatList
          data={turnosDelDia}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.turnoContainer}>
              <View style={styles.turnoContent}>
                <View style={styles.horaContainer}>
                  <Text style={styles.hora}>{item.hora}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cliente}>{item.cliente}</Text>
                  <Text style={styles.servicio}>{item.servicio}</Text>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity>
                    <Ionicons name="create-outline" size={24} color="orange" style={styles.icono} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="trash-outline" size={24} color="red" style={styles.icono} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noTurnosTexto}>No hay turnos para este día</Text>
      )}

      {/* Modal - agregar nuevo turno */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Agregar Nuevo Turno</Text>
            <TextInput
              style={styles.input}
              placeholder="Hora"
              value={nuevoTurno.hora}
              onChangeText={(text) => setNuevoTurno({ ...nuevoTurno, hora: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Cliente"
              value={nuevoTurno.cliente}
              onChangeText={(text) => setNuevoTurno({ ...nuevoTurno, cliente: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Servicio"
              value={nuevoTurno.servicio}
              onChangeText={(text) => setNuevoTurno({ ...nuevoTurno, servicio: text })}
            />
            <Button title="Agregar" onPress={agregarNuevoTurno} />
            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
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
  calendarContainer: {
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayInactive: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  dayActive: {
    fontSize: 16,
    color: 'white',
    backgroundColor: '#ff5555',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateInactive: {
    fontSize: 24,
    color: '#777',
    textAlign: 'center',
  },
  dateActive: {
    fontSize: 24,
    color: 'white',
    backgroundColor: '#ff5555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    textAlign: 'center',
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
  botonNuevoTurno: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5555',
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  noTurnosTexto: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
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
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
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
});

export default Turnos;
