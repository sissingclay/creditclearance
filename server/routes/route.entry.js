module.exports = (router, stormpath) => {
  require('./route.credits')(router, stormpath)
  require('./route.credit')(router, stormpath)
}
