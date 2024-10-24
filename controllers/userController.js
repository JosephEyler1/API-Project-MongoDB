const User = require('../models/User');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },

  // Get user by username instead of userId
  getUserByUsername(req, res) {
    User.findOne({ username: req.params.username })
      .populate('friends', 'username')  // Populate friends with their usernames
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found!' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },

  // Update user by username
  updateUser(req, res) {
    User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true })
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },

  // Delete user by username
  deleteUser(req, res) {
    User.findOneAndDelete({ username: req.params.username })
      .then(() => res.json({ message: 'User deleted' }))
      .catch(err => res.status(500).json(err));
  },

  // Add a friend using usernames (not IDs)
  addFriend(req, res) {
    User.findOneAndUpdate(
      { username: req.params.username },
      { $addToSet: { friends: req.params.friendUsername } },  // Add friend's username
      { new: true }
    )
    .populate('friends', 'username')  // Populate the updated friends list
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
  },

  // Remove a friend using usernames (not IDs)
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { username: req.params.username },
      { $pull: { friends: req.params.friendUsername } },  // Remove friend's username
      { new: true }
    )
    .populate('friends', 'username')  // Populate the updated friends list
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
  }
};
