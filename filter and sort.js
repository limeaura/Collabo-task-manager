// TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('/api/tasks'); // Adjust the API endpoint as needed
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredTasks = tasks.filter(task => {
        return task.title.toLowerCase().includes(filter.toLowerCase()) || 
               task.priority.toLowerCase().includes(filter.toLowerCase());
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.deadline) - new Date(b.deadline);
        } else {
            return new Date(b.deadline) - new Date(a.deadline);
        }
    });

    return (
        <div>
            <h1>Task List</h1>
            <input
                type="text"
                placeholder="Filter by title or priority"
                value={filter}
                onChange={handleFilterChange}
            />
            <select value={sortOrder} onChange={handleSortChange}>
                <option value="asc">Sort by Deadline (Ascending)</option>
                <option value="desc">Sort by Deadline (Descending)</option>
            </select>
            <ul>
                {sortedTasks.map(task => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        <p>Priority: {task.priority}</p>
                        <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;