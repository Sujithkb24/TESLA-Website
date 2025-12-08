const TeamRegistration = require('../models/TeamRegistration');

exports.createTeam = async (req, res) => {
  try {
    
    const {
      leaderName,
      leaderEmail,
      leaderPhone,
      leaderBranch,
      leaderYear,
      member1,
      member2,
      member3,
      domain,
      pptLink
    } = req.body;

   
    if (
      !leaderName ||
      !leaderEmail ||
      !leaderPhone ||
      !leaderBranch ||
      !leaderYear ||
      !member1 ||
      !member2 ||
      !domain ||
      !pptLink
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    
    const newTeam = new TeamRegistration({
      leaderName: leaderName.trim(),
      leaderEmail: leaderEmail.trim(),
      leaderPhone: leaderPhone.trim(),
      leaderBranch,
      leaderYear,
      member1,
      member2,
      member3: member3 || null, // Optional
      domain,
      pptLink: pptLink.trim()
    });

   
    const savedTeam = await newTeam.save();

    res.status(201).json({
      success: true,
      message: 'Team registered successfully!',
      data: savedTeam
    });
  } catch (error) {
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map(err => err.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    
    res.status(500).json({
      success: false,
      message: 'Error registering team',
      error: error.message
    });
  }
};


exports.getAllTeams = async (req, res) => {
  try {
    const teams = await TeamRegistration.find();

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error.message
    });
  }
};


exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await TeamRegistration.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    res.status(200).json({
      success: true,
      data: team
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message
    });
  }
};


exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;

   
    const updatedTeam = await TeamRegistration.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true 
      }
    );

    if (!updatedTeam) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team updated successfully',
      data: updatedTeam
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map(err => err.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating team',
      error: error.message
    });
  }
};


exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeam = await TeamRegistration.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team deleted successfully',
      data: deletedTeam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team',
      error: error.message
    });
  }
};
