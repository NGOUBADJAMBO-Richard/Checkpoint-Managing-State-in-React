// src/App.js
import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import ListTask from './components/ListTask';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, isDone: !task.isDone } : task)));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') {
      return !task.isDone;
    } else if (filter === 'completed') {
      return task.isDone;
    } else {
      return true;
    }
  });

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTask addTask={addTask} />
      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>
      <ListTask
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
