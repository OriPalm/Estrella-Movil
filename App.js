import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from './screens/perfil';
import Login from './screens/login'; // Asegúrate de que el nombre del archivo sea correcto
import Recuperarcontra from './screens/Recuperarcontra'; // Actualiza el nombre del archivo

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
        <Stack.Screen
         name='Perfil'
         component={Perfil}
         options={{
          title: 'Perfil',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold',
          },
      
         }} />
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