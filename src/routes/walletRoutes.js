const express = require("express");
const router = express.Router();
const { validateBody } = require("express-joi-validations");
const validateRequest = require("../middlewares/validateRequest");
const WalletController = require('../controllers/WalletController');
const Authentication = require('../controllers/authController');
const TransactionController = require("../controllers/TransactionController");

router.route("/wallet-balance").get(Authentication.protect, WalletController.getWalletBalance);
router.route("/add-wallet-balance")
    .post(
        Authentication.protect,
        validateBody(validateRequest.Validators("add-balance")),
        WalletController.AddWalletBalance
    );
router.route("/transactions").get(Authentication.protect, TransactionController.getAllTransaction);

module.exports = router;