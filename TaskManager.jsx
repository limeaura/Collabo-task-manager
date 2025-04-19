import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskChat from './TaskChat'; 

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignee, setAssignee] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [comments, setComments] = useState({}); 

  const handleAddTask = () => {
    if (!taskInput.trim() || !assignee || !deadline) return;

    const newTask = { taskInput, deadline, priority, assignee };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
      toast.success("Task updated successfully!");
    } else {
      setTasks([...tasks, newTask]);
      toast.success("Task added successfully!");
    }

    setTaskInput('');
    setDeadline('');
    setPriority('Medium');
    setAssignee('');
  };

  const handleEdit = (index) => {
    const task = tasks[index];
    setTaskInput(task.taskInput);
    setDeadline(task.deadline);
    setPriority(task.priority);
    setAssignee(task.assignee);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);

    const updatedComments = { ...comments };
    delete updatedComments[index];
    setComments(updatedComments);

    toast.success("Task deleted successfully!");
  };

  const handleAddComment = (taskIndex, comment) => {
    const updatedComments = {
      ...comments,
      [taskIndex]: [...(comments[taskIndex] || []), comment],
    };
    setComments(updatedComments);
  };

  return (
    <div className="container">
      <h3 className="my-4 text-center">Task Manager</h3>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mb-3">
        <input
          className="form-control mb-2"
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
        />

        <input
          className="form-control mb-2"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          className="form-control mb-3"
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Assignee"
        />

        <button className="btn btn-primary w-100" onClick={handleAddTask}>
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item mb-3">
            <div className="d-flex justify-content-between">
              <div>
                <strong>{task.taskInput}</strong><br />
                <small>Deadline: {task.deadline}</small><br />
                <small>Priority: {task.priority}</small><br />
                <small>Assignee: {task.assignee}</small>
              </div>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>

            <TaskChat
              taskTitle={task.taskInput}
              comments={comments[index] || []}
              onAddComment={(comment) => handleAddComment(index, comment)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
