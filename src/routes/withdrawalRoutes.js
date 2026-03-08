const express = require("express");
const router = express.Router();
const { validateBody } = require("express-joi-validations");
const validateRequest = require("../middlewares/validateRequest");
const WithdrawalController = require('../controllers/withdrawalController');
const Authentication = require('../controllers/authController');

router.route("/withdrawal-wallet-balance")
    .post(
        Authentication.protect,
        validateBody(validateRequest.Validators("withdrawal")),
        WithdrawalController.withdrawWalletBalance
    );

module.exports = router;