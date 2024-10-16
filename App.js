import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Perfil from './screens/perfil';

export default function App() {

  const Stack = createStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator>
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
    </NavigationContainer>
      
  );
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
