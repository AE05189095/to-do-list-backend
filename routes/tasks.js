var express = require('express');
var router = express.Router();

let tasks = [];

router.get('/getTasks', function (req, res) {
  res.status(200).json(tasks);
});

router.post('/addTask', function (req, res) {
  const { name, description, dueDate } = req.body;

  if (!name || !description || !dueDate) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  let timestamp = Date.now() + Math.random();
  req.body.id = timestamp.toString();
  tasks.push(req.body);

  res.status(200).json({ mensaje: 'Tarea agregada correctamente', tasks });
});

router.delete('/removeTask/:id', function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(400).json({ error: 'No se encontró la tarea para eliminar' });
  }

  res.status(200).json({ mensaje: 'Tarea eliminada correctamente', tasks });
});

module.exports = router;
