import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, PermissionsAndroid, Platform } from 'react-native';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import RenderItem from './RenderItem';

export interface Task {
  title: string;
  done: boolean;
  date: Date;
  imageUri?: string;  // Nuevo campo para almacenar la URI de la imagen
}

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const storeData = async (value: Task[]) => {
    try {
      await AsyncStorage.setItem('myreact-tasks', JSON.stringify(value));
    } catch (e) {
      console.log('Error saving data', e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('myreact-tasks');
      if (value !== null) {
        const tasksLocal = JSON.parse(value);
        setTasks(tasksLocal);
      }
    } catch (e) {
      console.log('Error retrieving data', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permiso para usar la cámara',
            message: 'Esta aplicación necesita acceso a la cámara',
            buttonNeutral: 'Preguntar luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permiso de cámara otorgado');
          openCamera();
        } else {
          console.log('Permiso de cámara denegado');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      openCamera();
    }
  };

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  const addTask = () => {
    const tmp = [...tasks];
    const newTask = {
      title: text,
      done: false,
      date: new Date(),
      imageUri: imageUri,
    };
    tmp.push(newTask);
    setTasks(tmp);
    storeData(tmp);
    setText('');
    setImageUri(undefined);
  };

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
        <TouchableOpacity onPress={requestCameraPermission} style={styles.cameraButton}>
          <Text style={styles.whiteText}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.whiteText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <FlatList
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              deleteFunction={deleteFunction}
              markDone={markDone}
            />
          )}
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
