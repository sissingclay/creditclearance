module.exports = (router, stormpath) => {
  const credits = require('../controllers/controller.credits')
  router
    .route('/credits')
      .get(stormpath.groupsRequired(['user']), credits.get)
      .post(stormpath.groupsRequired(['user']), credits.post)
}
