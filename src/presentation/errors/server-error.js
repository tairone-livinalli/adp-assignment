module.exports = class ServerError extends Error {
  constructor () {
    super('Internal server error, please try again in a few minutes')
    this.name = 'ServerError'
  }
}
