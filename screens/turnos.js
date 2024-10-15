import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
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
  // Función para obtener el día actual
  const obtenerDiaActual = () => {
    const hoy = new Date();
    // Simulamos que estamos en octubre 2024
    if (hoy.getMonth() === 9) { // Octubre es el mes 9 (JavaScript cuenta meses desde 0)
      return hoy.getDate().toString(); // Devolvemos el día del mes en formato string
    }
    // Si no es octubre, seleccionamos un día por defecto (por ejemplo, 10)
    return '10';
  };

  // Estado para el día seleccionado, inicializado con el día actual
  const [diaSeleccionado, setDiaSeleccionado] = useState('');

  // Efecto para seleccionar el día actual al montar el componente
  useEffect(() => {
    const diaHoy = obtenerDiaActual();
    setDiaSeleccionado(diaHoy); // Configuramos el estado con el día actual
  }, []);

  // Función para manejar el cambio de día
  const cambiarDia = (nuevoDia) => {
    setDiaSeleccionado(nuevoDia);
  };

  // Obtener los turnos para el día seleccionado
  const turnosDelDia = turnosPorDia[diaSeleccionado] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendario - Octubre 2024</Text>
      
      {/* Calendario de días */}
      <View style={styles.calendarContainer}>
        <TouchableOpacity style={styles.botonNuevoTurno}>
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text style={styles.botonTexto}>Nuevo Turno</Text>
        </TouchableOpacity>

        {/* Días de la semana */}
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

        {/* Números de los días */}
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

      {/* Lista de turnos o mensaje de no turnos */}
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
    borderRadius: 20, // Bordes redondeados para el contenedor principal
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // Sombra en Android
  },
  turnoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horaContainer: {
    backgroundColor: '#ff5555', // Fondo de la hora
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15, // Bordes redondeados
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, // Espaciado entre hora y texto
  },
  hora: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1, // Para ocupar el espacio restante
  },
  cliente: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicio: {
    fontSize: 14,
    color: '#777',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estado: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    padding: 5,
    borderRadius: 5,
  },
  confirmado: {
    backgroundColor: '#d4f8e8',
    color: '#32a852',
  },
  pendiente: {
    backgroundColor: '#f8f1d4',
    color: '#d4a832',
  },
  botonNuevoTurno: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5555',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  botonTexto: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icono: {
    marginLeft: 10,
  },
  noTurnosTexto: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});

export default Turnos;
