const router = require('express').Router();
const projectsController = require('../controllers/projects');
const validation = require('../middleware/validate');

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getOne);
router.post('/',  validation.saveProject, projectsController.create);
router.put('/:id', validation.saveProject, projectsController.update);
router.delete('/:id', projectsController.delete);

module.exports = router;