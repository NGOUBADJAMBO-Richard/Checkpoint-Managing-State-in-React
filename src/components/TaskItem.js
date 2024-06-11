// src/components/TaskItem.js
import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newDueDate, setNewDueDate] = useState(task.dueDate);
  const [newPriority, setNewPriority] = useState(task.priority);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (!newName.trim() || !newDescription.trim()) {
      setError('Both fields are required.');
      return;
    }
    updateTask(task.id, { name: newName, description: newDescription, dueDate: newDueDate, priority: newPriority });
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(task.name);
    setNewDescription(task.description);
    setNewDueDate(task.dueDate);
    setNewPriority(task.priority);
    setError('');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <select value={newPriority} onChange={(e) => setNewPriority(Number(e.target.value))}>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
          <button onClick={handleUpdate} className="edit">Save</button>
          <button onClick={handleCancel} className="delete">Cancel</button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />
          <span className="task-name">{task.name}</span>
          <span className="task-description">{task.description}</span>
          <span className="task-dueDate">{task.dueDate}</span>
          <span className="task-priority">Priority: {task.priority}</span>
          <button onClick={handleEdit} className="edit">Edit</button>
          <button onClick={handleDelete} className="delete">Delete</button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
