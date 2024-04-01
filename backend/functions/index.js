const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../models");
const { cryptPassword, comparePassword } = require("./helpers");
const { QueryTypes } = require("sequelize");

exports.register = async (req, res) => {
  const request = req.body;
  const user = await User.findOne({
    where: {
      email: request.email,
    },
  });

  const response = {};

  if (!user) {
    request.password = await cryptPassword(request.password);
    let user = await User.create(request);
    let token = jwt.sign(user.toJSON(), "This!sPuzzleGam3S3cret", {
      expiresIn: "11h",
    });
    
    response.user = user;
    response.token = token;
    response.message = "User created";
    response.status = "success";
  } else {
    response.message = "Please login";
    response.status = "failure";
  }
  res.json(response);
};

exports.login = async (req, res) => {
  const request = req.body;
  const user = await User.findOne({
    where: {
      email: request.email,
    },
  });

  const response = {};

  if (user) {
    if (comparePassword(request.password, user.password)) {
      let token = jwt.sign(user.toJSON(), "This!sPuzzleGam3S3cret", {
        expiresIn: "11h",
      });
      response.user = user;
      response.token = token;
      response.message = "Login Successfully";
      response.status = "success";
    } else {
      response.message = "Invalid Credentials";
      response.status = "failure";
    }
  } else {
    response.message = "Please register first";
    response.status = "failure";
  }
  res.json(response);
};

exports.addScore = async (req, res) => {
  const user_id = req.body.user_id;

  const user = await User.findOne({
    where: {
      id: user_id,
    },
  });

  if (user) {
    let scores = user.scores ? parseInt(user.scores) + 10 : 10;
    await sequelize.query(
      `update users set scores = :scores where id = :user_id`,
      {
        replacements: {
          scores: scores,
          user_id: user_id,
        },
        type: QueryTypes.UPDATE,
      }
    );
  }
  res.json({ status: "success" });
};
