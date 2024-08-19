import React from "react";
import {
View,
Text, StyleSheet, TextInput, TouchableOpacity, Dimensions
} from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: '#7dc782',
  },
  title: {
    fontSize: 50,
    color: "black",
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: '#6f6f6f',
  },
  whiteText: {
    fontSize: 16,
    color: '#FFF',
  },
  textInput: {
    borderColor: '#6f6f6f',
    borderWidth: 2,
    width: Dimensions.get("screen").width * 0.6,
    borderRadius: 15,
    paddingLeft: 15,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    width: Dimensions.get("screen").width * 0.25,
    backgroundColor: '#1b75da',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  }
})
export default function App(){
  return (
  <View style={styles.container}>
    <Text style={styles.title}>Bienvenido a Mis Tareas</Text>
    <View style={styles.inputContainer}>
      <TextInput placeholder="Agregar una nueva tarea" style={styles.textInput}/>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.whiteText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}