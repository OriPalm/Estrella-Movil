import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login'; // Asegúrate de que el nombre del archivo sea correcto
import Recuperarcontra from './screen/Recuperarcontra'; // Actualiza el nombre del archivo

export default function App() {
  const Stack = createStackNavigator();
  
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