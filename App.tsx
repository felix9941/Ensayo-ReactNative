import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import styles from './Styles';
import RenderItem from './RenderItem';

/*
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
*/
export interface Task {
  title: string;
  done: boolean;
  date: Date;
}

// el TouchableOpacity es para hacer clickeable un view, text cualquier cosa
export default function App() {
  const [text, setText ] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () =>{
    const tmp = [...tasks];
    const newTask = {
      title: text,
      done: false,
      date: new Date(),
    };
    tmp.push(newTask);
    setTasks(tmp);
    setText('');
  }
  const markDone = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(el => el.title === task.title);
    const todo = tmp[index];
    todo.done = !todo.done;
    setTasks(tmp);

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
          onChangeText={(t: string) => setText(t)}
          value={text}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
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
