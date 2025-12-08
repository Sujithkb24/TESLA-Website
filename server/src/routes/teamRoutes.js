const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// POST: Create new team registration
router.post('/register', teamController.createTeam);

// GET: Get all teams
router.get('/', teamController.getAllTeams);

// GET: Get team by ID
router.get('/:id', teamController.getTeamById);

// PUT: Update team
router.put('/:id', teamController.updateTeam);

// DELETE: Delete team
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
