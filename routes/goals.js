var express = require('express');
var router = express.Router();
const Goal = require('../models/Goals');

router.get('/getGoals', async function (req, res) {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener metas' });
  }
});

router.post('/addGoal', async function (req, res) {
  const { title, description, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  try {
    const goal = new Goal({
      title,
      description,
      dueDate,
    });
    const savedGoal = await goal.save();
    res.status(201).json({ mensaje: 'Meta agregada correctamente', goal: savedGoal });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la meta' });
  }
});

router.delete('/removeGoal/:id', async function (req, res) {
  const id = req.params.id;
  try {
    const removedGoal = await Goal.findByIdAndDelete(id);
    if (!removedGoal) {
      return res.status(404).json({ error: 'No se encontró la meta para eliminar' });
    }
    res.status(200).json({ mensaje: 'Meta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la meta' });
  }
});

module.exports = router;
