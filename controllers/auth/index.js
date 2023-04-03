const signup = require("./signup");
const login = require("./login");
const logout = require("./logout")
const getCurrentUser = require("./currentUser")
const updateAvatar = require("./updateAvatar")
const authVerification = require("./authVerification")
const emailVerification = require("./emailVerification")

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  authVerification,
  emailVerification
};