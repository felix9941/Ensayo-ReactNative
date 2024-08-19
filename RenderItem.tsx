import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {Task} from './App';

interface ItemProps {
    item: Task;
    markDone: (task: Task) => void;
    deleteFunction: () => void;
}
export default function RenderItem({item, markDone, deleteFunction}: ItemProps) {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => markDone(item)}>
        <Text style={item.done ? styles.textDone : styles.text}>
          {item.title}
        </Text>
        <Text style={item.done ? styles.textDone : styles.text}>
          {item.date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {item.done && (
        <TouchableOpacity style={styles.removeButton} onPress={deleteFunction}>
          <Text style={styles.whiteText}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
