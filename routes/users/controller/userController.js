const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require ("jwt-decode");
const User = require("../model/User");
const dbErrorHelper = require('../lib/dbErrorHelper');

// using for testing
async function getAllUsers(req, res) {
   try {
      let allUsers = await User.find({});
      res.json({
         payload: allUsers
      });
   } catch (e) {
      res.status(500).json({
         message: dbErrorHelper(e),
      })
   }
};

//successfully creates a new user
async function createUser(req, res) {
   try {
      let createdUser = new User({
         email: req.body.email,
         password: req.body.password,
         username: req.body.username,
      })

      let genSalt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(createdUser.password, genSalt);

      createdUser.password = hashedPassword;

      await createdUser.save();

      res.json({
         message: "user created",
      })

   } catch(e) {
      res.status(500).json({
         message: dbErrorHelper(e),
      })
   }
}

//successfully logs in a user
async function login(req, res) {
   try {
      let foundUser = await User.findOne({
         email: req.body.email
      });

      if (!foundUser) {
         throw Error("User not found, please sign up!")
      }

      let comparedPassword = await bcrypt.compare(
         req.body.password, 
         foundUser.password
      )

      if (!comparedPassword) {
         throw Error("Check email and/or password");
      }

      let jwtToken = jwt.sign(
         {
            username: foundUser.username,
            email: foundUser.email,
         },
         process.env.JWT_USER_SECRET_KEY
      );
      // think of this as we are "SETTING" jwt-cookie that we will later "GET" in the frontend file
      res.cookie("jwt-cookie", jwtToken, {
         expires: new Date(Date.now() + 3600000),
         httpOnly: false,
         secure: false,
      })
      // the last parameter above sets the expiration of the cookie token
      
      res.json({
         user: {
            email: foundUser.email,
            username: foundUser.username,
         } 
      })
      
   } catch(e) {
      res.status(500).json({
         message: dbErrorHelper(e),
      })
   }

}

//successfully updates player stats, TODO: make private with jwt
async function updatePlayerStats(req, res) {
   try {
      let updatedUser = await User.findOneAndUpdate(
         {email: req.body.email}, 
         req.body,
         {new: true },
      )

      res.json({
         payload: updatedUser,
      })

   } catch(e) {
      res.status(500).json({
         message: dbErrorHelper(e),
         e,
      })
   }
}

//TODO: create the logout function that will work by deleting the jwt-cookie

module.exports = {
   getAllUsers,
   createUser,
   login,
   updatePlayerStats,
}