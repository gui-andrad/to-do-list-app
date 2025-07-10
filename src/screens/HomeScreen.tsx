import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Task } from '@/types/task';
import { TaskItem } from '@/components/TaskItem';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');

  const addTask = () => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: text.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setText('');
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Lista de Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nova tarefa..."
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <Button title="Adicionar" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
});
