const User = require("../models/user.model");
const Address = require("../models/address.model");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({ message: "User created", user });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const address = await Address.create(req.body);
    await User.findByIdAndUpdate(userId, { $push: { addresses: address._id } });
    res.status(201).send({ message: "Address added", address });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const users = await User.find().populate("addresses");
    const totalUsers = users.length;
    const totalAddresses = users.reduce((acc, user) => acc + user.addresses.length, 0);
    const userSummaries = users.map((u) => ({
      name: u.name,
      addressCount: u.addresses.length,
    }));
    res.send({ totalUsers, totalAddresses, userSummaries });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("addresses");
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    // Remove from address collection
    await Address.findByIdAndDelete(addressId);

    // Pull from user's address list
    await User.findByIdAndUpdate(userId, {
      $pull: { addresses: addressId },
    });

    res.send({ message: "Address deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};