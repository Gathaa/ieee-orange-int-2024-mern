const express = require('express')
const app =express()
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Task = require("./Models/Task")
const cors = require('cors');
const Model = require("./Models/User")
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
const MongoURI = process.env.MONGODB_URI;
console.log(MongoURI)
mongoose.connect(MongoURI)
app.post('/login', async (req, res) => {
    const User = await Model.findOne({
        Email: req.body.Email,
        Password: req.body.Password,  
    });

    if (User) {
        const token = jwt.sign({
            Email: User.Email,
            Password: User.Password,
        }, "SecretToken");

        return res.json({ status: "ok", User: token });
    } else {
        return res.json({ status: "Error Occurred. User Not Found!", User: false });
    }
});
app.get('/gettask', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });
  app.delete('/deletetask', async (req, res) => {
    const taskId = req.params.id;
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });
app.post('/addtask', async (req, res) => {
    try {
      const { name } = req.body;
      const task = new Task({ name });
      const savedTask = await task.save();
      res.json(savedTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  });
  app.put('/modifytask/:id', async (req, res) => {
    const taskId = req.params.id;
    const { name } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, { name }, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  
  app.delete('/deletetask/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });
app.post('/register', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const existingUser = await Model.findOne({ Email });
        if (existingUser) {
            return res.json({ status: "Error", message: "User already exists!" });
        }

        const newUser = new Model({ Email, Password });
        await newUser.save();

        return res.json({ status: "ok", message: "User registered successfully" });
    } catch (error) {
        return res.json({ status: "Error", message: "An error occurred during registration", error });
    }
});
const port = 4000;
app.listen(port , ()=>{
    console.log(`Server Is Running On Port ${port}`)
    console.log("Orange Server Initilized Successfully !");
});