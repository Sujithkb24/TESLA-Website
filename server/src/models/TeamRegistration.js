const mongoose = require('mongoose');

// Updated member schema with new branches
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required'],
    trim: true,
    minlength: [2, 'Member name must be at least 2 characters'] // Fixed from 4 to 2
  },
  year: {
    type: Number,
    required: [true, 'Member year is required'],
    enum: [1, 2, 3, 4], // Fixed enum message
    message: 'Year must be 1, 2, 3, or 4'
  },
  branch: {
    type: String,
    required: [true, 'Member branch is required'],
    enum: ['CSE', 'ISE', 'ECE', 'EIE', 'IP', 'MECH', 'CIVIL', 'EEE'], // Updated branches
    message: 'Branch must be one of the supported options'
  }
});

// Updated main schema with TEAM NAME and consistent leader branches
const teamRegistrationSchema = new mongoose.Schema(
  {
    // NEW: Team Name Field (First field)
    teamName: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
      minlength: [2, 'Team name must be at least 2 characters'],
      maxlength: [50, 'Team name cannot exceed 50 characters']
    },

    // Team Leader Details
    leaderName: {
      type: String,
      required: [true, 'Team leader name is required'],
      trim: true,
      minlength: [2, 'Leader name must be at least 2 characters']
    },
    leaderEmail: {
      type: String,
      required: [true, 'Leader email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    leaderPhone: {
      type: String,
      required: [true, 'Leader phone is required'],
      match: [/^[0-9]{10}$/, 'Phone number must be exactly 10 digits']
    },
    leaderBranch: {
      type: String,
      required: [true, 'Leader branch is required'], 
      message: 'Branch must be one of the supported options'
    },
    leaderYear: {
      type: Number,
      required: [true, 'Leader year is required'],
      enum: [1, 2, 3, 4],
      message: 'Year must be 1, 2, 3, or 4'
    },

    // Team Members
    member1: {
      type: memberSchema,
      required: [true, 'Member 1 details are required']
    },
    member2: {
      type: memberSchema,
      required: [true, 'Member 2 details are required']
    },
    member3: {
      type: memberSchema,
      required: false  // Optional member
    },

    // Domain & Project Details
    domain: {
      type: String,
      required: [true, 'Domain is required'],
      
      message: 'Domain must be one of the supported options'
    },
    pptLink: {
      type: String,
      required: [true, 'PPT link is required'],
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please provide a valid URL'
      ]
    },

    // Metadata
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Create and export model
const TeamRegistration = mongoose.model('TeamRegistration', teamRegistrationSchema);

module.exports = TeamRegistration;
