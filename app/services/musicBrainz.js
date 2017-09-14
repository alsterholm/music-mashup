/**
 * Create a musicBrainz service
 *
 * @param  {Object}   client   An http client
 * @return {Object}            An object with functions used to access the MusicBrainz API
 */
module.exports = client => ({
  /**
   * Find information about an artist on MusicBrainz
   *
   * @param  {String}   mbid   The artist's mbid
   * @return {Promise}         A promise that will eventually resolve to information about
   *                           an artist
   */
  find(mbid) {
    return client.get(buildUrl(mbid))
      .then(response => response.data)
  }
})

const buildUrl = mbid =>
  `http://musicbrainz.org/ws/2/artist/${mbid}?fmt=json&inc=url-rels+release-groups`
