const router = require('express').Router();
const bugsController = require('../controllers/bugs');
const validation = require('../middleware/validate');

router.get('/', bugsController.getAll);
router.get('/:id', bugsController.getOne);
router.post('/',  validation.saveBug, bugsController.create);
router.put('/:id', validation.saveBug, bugsController.update);
router.delete('/:id', bugsController.delete);

module.exports = router;