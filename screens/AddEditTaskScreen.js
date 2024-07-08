import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

export default function AddEditTaskScreen({ route, navigation }) {
  const { tasks, setTasks, taskToEdit } = route.params || {};
  const [taskText, setTaskText] = useState(taskToEdit ? taskToEdit.text : '');

  const saveTask = async () => {
    if (taskText.trim() === '') {
      Toast.show('Task description cannot be empty', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }

    let updatedTasks;
    if (taskToEdit) {
      updatedTasks = tasks.map(task => {
        if (task.id === taskToEdit.id) {
          task.text = taskText;
        }
        return task;
      });
    } else {
      const newTask = { id: Date.now(), text: taskText, completed: false };
      updatedTasks = [...tasks, newTask];
    }

    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={taskText}
        onChangeText={setTaskText}
        placeholder="Enter task description"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  saveButton: {
    height: 50,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
