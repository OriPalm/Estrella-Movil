import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { auth } from "../firebaseconfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const RecuperarContrasena = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation(); 

  const handleRecuperar = () => {
    if (!email) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Éxito",
          "Te hemos enviado un correo para restablecer tu contraseña.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ]
        );
      })
      .catch((error) => {
        let errorMessage = "Hubo un error. Intenta nuevamente.";
        if (error.code === "auth/invalid-email") {
          errorMessage = "El correo electrónico no es válido.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "No se encontró un usuario con ese correo.";
        }
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.ibb.co/KWCbDzM/logo-Estrella-color.png" }}
        style={styles.logo}
      />
      <Text style={styles.title}>Recuperar contraseña</Text>

      <Text style={styles.description}>
        Ingrese el mail asociado a su cuenta, se le enviará una nueva contraseña
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
        <Text style={styles.buttonText}>Recuperar contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 350,
    height: 250,
    marginBottom: 30,
    marginTop: 50,
    resizeMode: "contain", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 25,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginTop: 25,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff5555",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RecuperarContrasena;
