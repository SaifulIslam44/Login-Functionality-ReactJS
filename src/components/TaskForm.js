import React, { useState } from 'react';

const TaskForm = ({ onCreateTask, teamMembers }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [assignedTo, setAssignedTo] = useState(''); // New state for task assignment

  const handleCreateTask = () => {
    // Create a task object with the provided data
    const task = {
      title,
      description,
      dueDate,
      priority,
      assignedTo, // Include the assignedTo value in the task object
    };

    // Pass the task data to the parent component to handle
    onCreateTask(task);

    // Reset the form fields
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('low');
    setAssignedTo('');
  };

  return (
    <div className="task-form">
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <label htmlFor="priority">Priority:</label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label htmlFor="assignedTo">Assign To:</label>
      <input
        type="text"
        id="assignedTo"
        placeholder="Username"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default TaskForm;
