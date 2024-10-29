import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Perfil from './screens/perfil';
import Login from './screens/login'; // Asegúrate de que el nombre del archivo sea correcto
import Recuperarcontra from './screens/Recuperarcontra'; // Actualiza el nombre del archivo
import turnos from './screens/turnos';
import agregarTurnos from './screens/agregarTurnos';
import Ionicons from '@expo/vector-icons/Ionicons'; // Importa iconos para las pestañas

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // Configura la navegación por pestañas
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Turnos') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Turnos" component={turnos} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    );
  }

  function MyStack() {
    return (
      <Stack.Navigator>
         <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Recuperarcontra"
          component={Recuperarcontra} // Asegúrate de que el nombre del componente sea correcto
        />
        <Stack.Screen
         name='Perfil'
         component={Perfil}
         options={{
          title: 'Perfil',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold',
          },
      
         }} />

        <Stack.Screen
          name="Turnos"
          component={turnos}
                />
        <Stack.Screen
          name="AgregarTurno"
          component={agregarTurnos}      
              />
        <Stack.Screen
        name="HomeTabs"
        component={HomeTabs} // Cambiar aquí a HomeTabs
        options={{ headerShown: false }} // Oculta el encabezado si deseas una vista más limpia
            />
      </Stack.Navigator>
    );
  }


  return (
    <NavigationContainer>
      <MyStack />
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}