var express = require("express");
var router = express.Router();
var passport = require("passport");
var {
   getAllUsers,
   createUser,
   login,
   updatePlayerStats
} = require("./controller/userController");

router.get("/", function(req, res, next) {
   res.send("respond with a resource");
});

router.get("/get-all-users", getAllUsers)

router.post("/create-user", createUser);
router.post("/login", login);
router.put(
   "/update-player-stats",
   passport.authenticate("jwt-user", {
      session: false
   }),
   updatePlayerStats
);

//put router.get for logout


module.exports = router;

