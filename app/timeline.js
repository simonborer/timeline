const mongoose = require('mongoose');

const timeline = new mongoose.Schema({
  name: {
    type: String
  },

  done: {
    type: Boolean
  }
},

  {
    collection: 'timeline'
  }
)

module.exports = mongoose.model('Timeline', timeline)

