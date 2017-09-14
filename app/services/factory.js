const musicBrainzFactory = require('./musicBrainz')
const coverArtFactory = require('./coverArt')
const wikipediaFactory = require('./wikipedia')

/**
 * Create services used to access various API:s
 *
 * @param  {Object}   client  An http client
 * @return {Object}           An object containing different services
 */
module.exports = client => ({
  musicBrainz: musicBrainzFactory(client),
  coverArt: coverArtFactory(client),
  wikipedia: wikipediaFactory(client),
})
