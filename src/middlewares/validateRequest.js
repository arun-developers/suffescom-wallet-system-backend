const Joi = require("joi");
module.exports.Validators = (method) => {
    let obj = {};
    switch (method) {
        case "create-user":
            obj = {
                name: Joi.string().required(),
                email: Joi.string().required()
            };
            break;
        case "add-balance":
            obj = {
                balance: Joi.number().required(),
                transactionId: Joi.string().required()
            };
            break;
        case "withdrawal":
            obj = {
                amount: Joi.number().required()
            };
            break;
        default:
            break;
    }
    return Joi.object(obj);
};
