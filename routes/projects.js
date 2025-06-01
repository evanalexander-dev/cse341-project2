const router = require('express').Router();
const projectsController = require('../controllers/projects');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getOne);
router.post('/',  isAuthenticated, validation.saveProject, projectsController.create);
router.put('/:id', isAuthenticated, validation.saveProject, projectsController.update);
router.delete('/:id', isAuthenticated, projectsController.delete);

module.exports = router;