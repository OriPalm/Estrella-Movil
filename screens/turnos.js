import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseconfig';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [turnoAEliminar, setTurnoAEliminar] = useState(null);
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendario de Turnos</Text>
      <TouchableOpacity
        style={styles.botonRojo}
        onPress={() => navigation.navigate('AgregarTurno')}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.botonTexto}>Nuevo Turno</Text>
      </TouchableOpacity>

      {loading ? (
        <Text>Cargando turnos...</Text>
      ) : (
        <FlatList
          data={turnos}
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
        />
      )}

      {/* Modal Personalizado para Confirmar Eliminación */}
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
    width: '80%',
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
});

export default Turnos;
