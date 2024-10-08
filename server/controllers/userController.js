const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// register callback
const registerController = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    res.status(400).json({
      success: false,
      error: error.message || 'Invalid request',
    });
  }
};


module.exports = { loginController, registerController };
