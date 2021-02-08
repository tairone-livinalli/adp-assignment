const mathRouter = require('../composers/tasks-router-composer')
const expressRouterAdapter = require('../adapters/express-router-adapter')

module.exports = router => {
  router.post('/tasks', expressRouterAdapter.adapt(mathRouter))
}
