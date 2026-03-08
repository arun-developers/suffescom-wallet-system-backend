const express = require("express");
const { validateBody } = require("express-joi-validations");
const validateRequest = require("../middlewares/validateRequest");
const router = express.Router();
const UsersController = require('../controllers/userController');
router.route("/create-user").post(
    validateBody(validateRequest.Validators("create-user")),
    UsersController.createUser
);

module.exports = router;