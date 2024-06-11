// src/components/AddTask.js
import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }
    addTask({ id: Date.now(), description, isDone: false });
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button type="submit">Add Task</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AddTask;
