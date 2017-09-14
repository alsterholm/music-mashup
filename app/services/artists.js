const _ = require('lodash')
const transformArtist = require('../transformers/artist')

/**
 * Creates an artist service used to find information about artists and their albums
 *
 * @param  {Redis}    redis         An ioredis object
 * @param  {Object}   musicBrainz   A musicBrainz service
 * @param  {Object}   coverArt      A coverArt service
 * @param  {Object}   wikipedia     A wikipedia service
 * @return {Object}                 An object containing functions to find information
 *                                  about artists
 */
module.exports = (redis, musicBrainz, coverArt, wikipedia) => ({
  /**
   * Find information about an artist
   *
   * @param  {String}   mbid  The artist's mbid
   * @return {Promise}        A promise that will eventually resolve to an object
   *                          containing information about an artist and their albums
   */
  async find(mbid) {
    const cached = await redis.get(createCacheKey(mbid))

    if (cached) {
      return JSON.parse(cached)
    }

    const artistInformation = await musicBrainz.find(mbid)

    const albumInfo = artistInformation['release-groups']
      .filter(releaseGroup => releaseGroup['primary-type'] === 'Album')
      .map(({ id, title }) => ({ id, title }))

    const albumCovers = await coverArt.findMany(albumInfo)

    const albums = combineAlbumInformation(albumInfo, albumCovers)

    const wikipediaUrl  = _.find(artistInformation.relations, r => r.type === 'wikipedia')
                           .url.resource
    // We extract the page name from the url
    const wikipediaName = _.replace(wikipediaUrl, 'https://en.wikipedia.org/wiki/', '')
    const description = await wikipedia.getDescription(wikipediaName)

    // We pass the results from the services into a transformer that formats
    // the data into something that we can return to the consumers of our api
    const result = transformArtist(mbid, artistInformation, description, albums)

    // Cache the result in order to reduce the number of calls to the external api:s
    redis.set(createCacheKey(mbid), JSON.stringify(result), 'ex', 60 * 24 * 7) // 1 week

    return result
  }
})

const createCacheKey = key => `musicservice:${key}`

const combineAlbumInformation = (info, covers) => covers.map(({ id, image }) => ({
  id, image, title: _.find(info, album => album.id === id).title
}))
