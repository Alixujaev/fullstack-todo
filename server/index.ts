import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import Todos from './models/Todos';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todos.find();
    res.send(todos);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch todos' });
  }
});

app.post('/todo', async (req, res) => {  
  try {
    const todo = await Todos.create({
      id: uuidv4(),
      title: req.body.title,
      completed: false
    });
    res.send(todo);  
  } catch (error) {
    res.status(500).send({ error: 'Failed to create todo' });
  }
})

app.delete('/delete/:id', async (req, res) => {
  try {
    const todo = await Todos.findByIdAndDelete(req.params.id);
    res.send(todo);
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete todo' });
  }
})

app.put('/complete/:id', async (req, res) => {
  try {
    const todo = await Todos.findByIdAndUpdate(req.params.id, {
      completed: req.body.completed
    }, { new: true });
    res.send(todo);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update todo' });
  }
})


const connectToDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const init = async () => {
  await connectToDB();
  startServer();
};

init();
