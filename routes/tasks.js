var express = require('express');
var router = express.Router();
const Task = require('../models/Tasks'); 
console.log('Task es:', Task);

router.get('/getTasks', async function (req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

router.post('/addTask', async function (req, res) {
  const { title, description, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  try {
    const task = new Task({
      title,
      description,
      dueDate,
    });
    const savedTask = await task.save();
    res.status(201).json({ mensaje: 'Tarea agregada correctamente', task: savedTask });
  } catch (error) {
    console.error('Error guardando tarea:', error);
    res.status(500).json({ error: 'Error al guardar la tarea' });
  }
});

router.delete('/removeTask/:id', async function (req, res) {
  const id = req.params.id;
  try {
    const removedTask = await Task.findByIdAndDelete(id);
    if (!removedTask) {
      return res.status(404).json({ error: 'No se encontró la tarea para eliminar' });
    }
    res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

module.exports = router;
