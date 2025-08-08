const User = require("../models/user.model");
// const Profile = require("../models/profile.model");

// Add User
exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).send({ message: "User created", user });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Add Profile
exports.addProfile = async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

    // Check if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).send({ error: "User not found" });
    }

    // Ensure only one profile per user
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res.status(400).send({ error: "Profile already exists for this user" });
    }

    const profile = await Profile.create({ bio, socialMediaLinks, user });
    res.status(201).send({ message: "Profile created", profile });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Get all profiles with user info
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.send(profiles);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};