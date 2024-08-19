import React from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import styles from './Styles';
import RenderItem from './RenderItem';

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

export interface Task {
  title: string;
  done: boolean;
  date: Date;
}

// el TouchableOpacity es para hacer clickeable un view, text cualquier cosa
export default function App() {
  const markDone = () => {
    console.log("markDone");
  };

  const deleteFunction = () => {
    console.log("delete");
  };
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
        <FlatList
          renderItem={({item}) => (
            <RenderItem
              item={item}
              deleteFunction={deleteFunction}
              markDone={markDone}
            />
          )}
          data={tasks}
        />
      </View>
    </View>
  );
}
