var express = require('express');
var router = express.Router();

let goals = [];

router.get('/getGoals', function (req, res) {
  res.status(200).json(goals);
});

router.post('/addGoal', function (req, res) {
  const { name, description, dueDate } = req.body;

  if (!name || !description || !dueDate) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  let timestamp = Date.now() + Math.random();
  req.body.id = timestamp.toString();
  goals.push(req.body);

  res.status(200).json({ mensaje: 'Meta agregada correctamente', goals });
});

router.delete('/removeGoal/:id', function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const initialLength = goals.length;
  goals = goals.filter(goal => goal.id !== id);

  if (goals.length === initialLength) {
    return res.status(400).json({ error: 'No se encontró la meta para eliminar' });
  }

  res.status(200).json({ mensaje: 'Meta eliminada correctamente', goals });
});

module.exports = router;
