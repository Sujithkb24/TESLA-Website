const TeamRegistration = require('../models/TeamRegistration');

// ✅ CREATE: Register new team (UPDATED)
exports.createTeam = async (req, res) => {
  
  try {
    const {
      teamName,        // ← NEW FIELD
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

    // ✅ Updated validation including teamName
    if (
      !teamName ||      // ← NEW CHECK
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
        message: 'Please provide all required fields (Team Name is required)'
      });
    }

    // ✅ Create new team document with teamName
    const newTeam = new TeamRegistration({
      teamName: teamName.trim(),
      leaderName: leaderName.trim(),
      leaderEmail: leaderEmail.trim(),
      leaderPhone: leaderPhone.trim(),
      leaderBranch,
      leaderYear: parseInt(leaderYear), // Ensure number type
      member1,
      member2,
      member3: member3 || null, // Optional
      domain,
      pptLink: pptLink.trim()
    });

    // ✅ Save to database
    const savedTeam = await newTeam.save();

    res.status(201).json({
      success: true,
      message: 'Team registered successfully!',
      data: savedTeam
    });
  } catch (error) {
    // ✅ Enhanced Mongoose validation error handling
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

    // ✅ General server error
    console.error('Create Team Error:', error); // Log for debugging
    res.status(500).json({
      success: false,
      message: 'Error registering team',
      error: error.message
    });
  }
};

// ✅ READ: Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await TeamRegistration.find().sort({ createdAt: -1 }); // Latest first

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams
    });
  } catch (error) {
    console.error('Get All Teams Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error.message
    });
  }
};

// ✅ READ: Get team by ID
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
    console.error('Get Team By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message
    });
  }
};

// ✅ UPDATE: Update team registration
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTeam = await TeamRegistration.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,           // Return updated document
        runValidators: true  // Run Mongoose validators
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

    console.error('Update Team Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating team',
      error: error.message
    });
  }
};

// ✅ DELETE: Delete team registration
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
      data: {
        id: deletedTeam._id,
        teamName: deletedTeam.teamName,
        message: 'Registration cancelled'
      }
    });
  } catch (error) {
    console.error('Delete Team Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting team',
      error: error.message
    });
  }
};
