const { first } = require('lodash')

/**
 * Create a coverArt service
 *
 * @param  {Object}   client   An http client
 * @return {Object}            An object with functions used to access the Cover Art API
 */
module.exports = client => ({
  /**
   * Get the cover art urls for a list of albums
   *
   * @param  {Array}    albums  An array of objects representing albums
   * @return {Promise}          A promise that will eventually resolve to
   *                            an array of objects containing the album id
   *                            and a url to the album's cover art
   */
  findMany: (albums) => Promise.all(albums.map(({ id }) =>
    client.get(buildUrl(id))
      .then(({ data }) => ({
        id, image: first(data.images, image => image.types.includes('Front')).image
      }))
      .catch(err => {
        // We ignore the error, it seems like some albums does not have cover art
        // Might want to look into if there's a pattern in the future
      })
  ))
  // We filter out all null values, which are the cover art lookups that failed
  .then(albums => albums.filter(x => x))
})

const buildUrl = id => `http://coverartarchive.org/release-group/${id}`
