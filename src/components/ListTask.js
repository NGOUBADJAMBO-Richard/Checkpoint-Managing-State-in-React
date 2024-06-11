// src/components/ListTask.js
import React from 'react';
import Task from './Task';

const ListTask = ({ tasks, updateTask, deleteTask, toggleComplete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};

export default ListTask;
