const router = require('express').Router();
const bugsController = require('../controllers/bugs');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', bugsController.getAll);
router.get('/:id', bugsController.getOne);
router.post('/', isAuthenticated, validation.saveBug, bugsController.create);
router.put('/:id', isAuthenticated, validation.saveBug, bugsController.update);
router.delete('/:id', isAuthenticated, bugsController.delete);

module.exports = router;