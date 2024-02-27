const validator = require("../utils/validator");

const productSchema = async (req, res, next) => {
  const validateRule = {
    name: "required|string",
    quantity: "required",
    price: "required",
    image: "required",
  };

  await validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

module.exports = {
  productSchema,
};
