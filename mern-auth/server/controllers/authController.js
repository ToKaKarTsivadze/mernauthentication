const User = require('../models/user');
const { hashPassword, comparePasswords } = require('../helpers/auth');
const { json } = require('express');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
  res.json('test is working');
};

//register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //chech if name was entered
    if (!name) {
      return res.json({
        error: 'name is required',
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error:
          'password is required and it should be al teast 6 characters long',
      });
    }
    //check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: ' this user is already registered',
      });
    }

    hashedPassword = await hashPassword(password);
    //create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.json({
        error: 'no user found',
      });
    }
    //check if password match
    const match = await comparePasswords(password, user.password);
    if (match) {
      // res.json('passwords match');
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(user);
        }
      );
    } else {
      return res.json({
        error: "password don't match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        throw err;
        res.json(user);
      } else {
        res.json(user);
      }
    });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
