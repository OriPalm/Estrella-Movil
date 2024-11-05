import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Perfil from './screens/perfil';
import Login from './screens/login';
import Recuperarcontra from './screens/Recuperarcontra';
import Turnos from './screens/turnos';
import Ionicons from '@expo/vector-icons/Ionicons';
import AgregarTurnos from './screens/agregarTurnos';
import EditarTurno from './screens/editarTurno';

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

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
          tabBarActiveTintColor: '#ff5555', // Color rojo para el ícono activo
          tabBarInactiveTintColor: 'gray',   // Color gris para el ícono inactivo
        })}
      >
        <Tab.Screen name="Turnos" component={Turnos} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    );
  }

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Recuperarcontra" component={Recuperarcontra} />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{
            title: 'Perfil',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen name="Turnos" component={Turnos} />
        <Stack.Screen name="AgregarTurno" component={AgregarTurnos} />
        <Stack.Screen name="EditarTurno" component={EditarTurno} />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
