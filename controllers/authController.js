const bcrypt = require("bcryptjs");

const User = require('../models/userModel');

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      // req.body
      username,
      password: hashpassword,
    });
    req.session.user = newUser;
    res
      .status(201)
      .json({
        status: 'success',
        data: {
          user: newUser,
        }

      });

  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        error
      });
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {

    const user = await User.findOne({ username });

    console.log('user: ', user);

    if (!user) {
      return res
        .status(403)
        .json({
          status: 'fail',
          message: 'user not found',
        })
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      req.session.user = user;
      res.json({
        status: 'success'
      })
    } else {
      return res
        .status(403)
        .json({
          status: 'fail',
          message: 'wrong password',
        })
    }

  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        error
      });
  }
}