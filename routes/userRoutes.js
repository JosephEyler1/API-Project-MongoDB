const router = require('express').Router();
const {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../controllers/userController');

// Routes for users
router.route('/').get(getUsers).post(createUser);
router.route('/:username').get(getUserByUsername).put(updateUser).delete(deleteUser);

// Routes for managing friends by username
router.route('/:username/friends/:friendUsername').post(addFriend).delete(removeFriend);

module.exports = router;
