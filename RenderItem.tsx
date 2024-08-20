import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Styles';
import { Task } from './App';

interface ItemProps {
  item: Task;
  markDone: (task: Task) => void;
  deleteFunction: (task: Task) => void;
}

export default function RenderItem({
  item,
  markDone,
  deleteFunction,
}: ItemProps) {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => markDone(item)}>
        <Text style={item.done ? styles.textDone : styles.text}>
          {item.title}
        </Text>
        <Text style={item.done ? styles.textDone : styles.text}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={{ width: 100, height: 100, marginTop: 10 }} />
      )}
      {item.done && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => deleteFunction(item)}>
          <Text style={styles.whiteText}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
