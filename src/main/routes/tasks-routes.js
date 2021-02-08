const MathRouterComposer = require('../composers/tasks-router-composer')
const { adapt } = require('../adapters/express-router-adapter')

module.exports = router => {
  router.post('/tasks', adapt(MathRouterComposer.compose()))
}
