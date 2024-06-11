// src/TodoForm.js
import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setError('Task cannot be empty.');
      return;
    }
    const newTodo = {
      id: Date.now(),
      task,
      completed: false
    };
    addTodo(newTodo);
    setTask('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default TodoForm;
