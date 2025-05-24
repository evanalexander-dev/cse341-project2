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

const saveProject = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    description: 'required|string',
    teamMembers: 'required|array',
    bugCount: 'required|integer',
    deadline: 'required|string',
    techStack: 'required|array',
    status: 'required|string'
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

module.exports = { saveBug, saveProject };