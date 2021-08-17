var express = require("express");
var router = express.Router();
var passport = require("passport");
var {
   getAllUsers,
   createUser,
   login,
   updatePlayerStats,
   getUserByID
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

router.get(
   "/get-user/:id",
   getUserByID
)

//put router.get for logout
router.get("/logout", function (req, res) {
   res.clearCookie('jwt-cookie');

   res.send("Logged out!")

})

module.exports = router;

