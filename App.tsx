import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const storeData = async (value: Task[]) => {
    try {
      await AsyncStorage.setItem('myreact-tasks', JSON.stringify(value));
    } catch (e) {
      
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('myreact-tasks');
      if(value !== null){
        const tasksLocal = JSON.parse(value);
        setTasks(tasksLocal);
      }
    } catch (e) {
      
    }
  }
  useEffect(()=> {
    getData();
  })

  const addTask = () =>{
    const tmp = [...tasks];
    const newTask = {
      title: text,
      done: false,
      date: new Date(),
    };
    tmp.push(newTask);
    setTasks(tmp);
    storeData(tmp);
    setText('');
  }
  const markDone = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(el => el.title === task.title);
    const todo = tmp[index];
    todo.done = !todo.done;
    setTasks(tmp);
    storeData(tmp);

  };

  const deleteFunction = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(el => el.title === task.title);
    tmp.splice(index, 1);
    setTasks(tmp);
    storeData(tmp);
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
