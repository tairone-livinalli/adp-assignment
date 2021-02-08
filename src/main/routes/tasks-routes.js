const mathRouter = require('../composers/tasks-router-composer')

module.exports = router => {
  router.post('/tasks', mathRouter.route)
}
