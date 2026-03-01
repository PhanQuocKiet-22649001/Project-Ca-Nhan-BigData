const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uname: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  pass: { 
    type: String, 
    required: true 
  },
  status: { 
    type: Boolean, 
    default: true // Mặc định tạo ra là Active (true)
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', userSchema);