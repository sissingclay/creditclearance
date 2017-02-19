module.exports = (router, stormpath) => {
  const credit = require('../controllers/controller.credit')
  router
    .route('/credits/:id')
      .get(stormpath.groupsRequired(['user']), credit.get)
      .put(stormpath.groupsRequired(['user']), credit.put)
      .delete(stormpath.groupsRequired(['user']), credit.delete)
}
