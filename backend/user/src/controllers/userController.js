const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");

const JWT_SECRET="shashi"
const JWT_EXPIRES_IN="1h"

const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name:name, email:email, phone:phone, password: hashedPassword, role:role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token:token, userDto: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req,res) =>{
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);

  try {
    const userRecord = await User.findById(objectId)
    res.status(200).json(userRecord);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }

}

module.exports = { register, login,getUser };
