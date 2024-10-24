const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true  // Correct key is 'trim', not 'trimmed'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Validation for a valid email format
    match: [/.+@.+\..+/, 'Must match a valid email address']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'  // Reference to Thought model
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'  // Reference to User model for friend relationship
    }
  ]
}, {
  toJSON: {
    virtuals: true  // Ensure virtual fields are serialized
  },
  id: false  // Disable default 'id' field
});

// Create a virtual property 'friendCount' to retrieve the number of friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Compile the schema into a model
const User = model('User', userSchema);

module.exports = User;
