const express = require('express');
const { getTasks, createTask } = require('../controller/taskController');
const router = express.Router();

// Route to fetch all tasks
router.get('/tasks', getTasks);

// Route to create a new task
router.post('/tasks', createTask);

module.exports = router;
