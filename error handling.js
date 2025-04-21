// app.js
const express = require('express');
const app = express();

app.use(express.json());

// Sample route
app.get('/tasks', (req, res) => {
    throw new Error('Something went wrong!'); // Simulating an error
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});