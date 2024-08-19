import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: '#7dc782',
  },
  title: {
    fontSize: 40,
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#6f6f6f',
  },
  textDone: {
    fontSize: 16,
    color: 'red',
    textDecorationLine: "line-through",
  },
  whiteText: {
    fontSize: 16,
    color: '#FFF',
  },
  textInput: {
    borderColor: '#6f6f6f',
    borderWidth: 2,
    width: Dimensions.get('screen').width * 0.6,
    borderRadius: 15,
    paddingLeft: 15,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    width: Dimensions.get('screen').width * 0.25,
    backgroundColor: '#1b75da',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  scrollContainer: {
    marginTop: 20,
  },
  itemContainer: {
    paddingVertical: 20,
    borderBottomColor: '#6f6f6f',
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  removeButton: {
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
  }
});

const tasks = [
  {
    title: 'Alimentar al perro',
    done: false,
    date: new Date(),
  },
  {
    title: 'Alimentar al gato',
    done: false,
    date: new Date(),
  },
  {
    title: 'Estudiar',
    done: true,
    date: new Date(),
  },
];

interface Task {
  title: string;
  done: boolean;
  date: Date;
}

// el TouchableOpacity es para hacer clickeable un view, text cualquier cosa
export default function App() {
  function renderItem({item}: {item: Task}) {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity>
          <Text style={item.done ? styles.textDone : styles.text}>{item.title}</Text>
          <Text style={item.done ? styles.textDone : styles.text}>{item.date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {
          item.done && (<TouchableOpacity style={styles.removeButton}>
            <Text style={styles.whiteText}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas por hacer</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Agregar una nueva tarea"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.whiteText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <FlatList renderItem={renderItem} data={tasks} />
      </View>
    </View>
  );
}
