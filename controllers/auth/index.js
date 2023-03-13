const signup = require("./signup");
const login = require("./login");
const logout = require("./logout")
const getCurrentUser = require("./currentUser")
const updateAvatar = require("./updateAvatar")

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateAvatar
};