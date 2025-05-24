const validator = require('../helpers/validate');

const saveBug = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    severity: 'required|string',
    priority: 'required|string',
    status: 'required|string',
    assignedDeveloper: 'required|email',
    reporter: 'required|email'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = { saveBug };