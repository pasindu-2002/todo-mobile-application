import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import Toast from 'react-native-root-toast';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    Toast.show('Task deleted', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  const markTaskCompleted = async (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) task.completed = !task.completed;
      return task;
    });
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    Toast.show('Task status updated', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text>No tasks available</Text>
      ) : (
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              deleteTask={deleteTask}
              markTaskCompleted={markTaskCompleted}
              editTask={() => navigation.navigate('AddEditTask', { taskToEdit: item, tasks, setTasks })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditTask', { tasks, setTasks })}
      >
        <Text style={styles.addButtonText}>+</Text>
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
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
});
