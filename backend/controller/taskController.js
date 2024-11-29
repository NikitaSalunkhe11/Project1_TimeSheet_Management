const Task = require('../model/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { taskName, taskDescription, assignedTo, assignedDate, deadlineDate, status } = req.body;

  try {
    const newTask = new Task({
      taskName,
      taskDescription,
      assignedTo,
      assignedDate,
      deadlineDate,
      status,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};
