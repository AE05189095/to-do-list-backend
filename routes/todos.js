const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/getTodos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

router.post('/addTodo', async (req, res) => {
  const { name, description, deadline } = req.body;

  if (!name || !deadline) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  try {
    const todo = new Todo({
      name,
      description,
      deadline,
    });
    const savedTodo = await todo.save();
    res.status(201).json({ message: 'Tarea agregada correctamente', task: savedTodo });
  } catch (error) {
    console.error('Error guardando la tarea:', error);
    res.status(500).json({ error: 'Error al guardar la tarea' });
  }
});

router.delete('/removeTodo/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const removedTodo = await Todo.findByIdAndDelete(id);
    if (!removedTodo) {
      return res.status(404).json({ error: 'No se encontró la tarea para eliminar' });
    }
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

module.exports = router;