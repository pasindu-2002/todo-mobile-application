import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function TaskItem({ task, deleteTask, markTaskCompleted, editTask }) {
  const handleDelete = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteTask(taskId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => markTaskCompleted(task.id)}>
        <Text style={task.completed ? styles.completed : styles.pending}>{task.text}</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={editTask}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(task.id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  pending: {
    fontSize: 18,
  },
  completed: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  edit: {
    marginRight: 10,
    color: '#2196F3',
  },
  delete: {
    color: 'red',
  },
});
