// src/components/Task.js
import React, { useState } from 'react';

const Task = ({ task, updateTask, deleteTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (!newDescription.trim()) {
      setError('Description is required.');
      return;
    }
    updateTask(task.id, { description: newDescription });
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewDescription(task.description);
    setError('');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <li className={`task-item ${task.isDone ? 'completed' : ''}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={handleUpdate} className="edit">Save</button>
          <button onClick={handleCancel} className="delete">Cancel</button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => toggleComplete(task.id)}
          />
          <span className="task-description">{task.description}</span>
          <button onClick={handleEdit} className="edit">Edit</button>
          <button onClick={handleDelete} className="delete">Delete</button>
        </div>
      )}
    </li>
  );
};

export default Task;
