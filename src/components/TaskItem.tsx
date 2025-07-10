import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '@/types/task';
import { Feather } from '@expo/vector-icons';

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <Feather
          name={task.completed ? 'check-circle' : 'circle'}
          size={24}
          color={task.completed ? '#4caf50' : '#aaa'}
        />
      </TouchableOpacity>
      <Text style={[styles.text, task.completed && styles.completed]}>
        {task.title}
      </Text>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Feather name="trash" size={20} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    marginVertical: 6,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});
