const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a report title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Please select the incident type'],
    enum: [
      'Harassment',
      'Cyberstalking',
      'Exclusion',
      'Outing',
      'Impersonation',
      'Trolling',
      'Other'
    ]
  },
  description: {
    type: String,
    required: [true, 'Please add a description of the incident']
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
