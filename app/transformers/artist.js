/**
 * Transforms artist information, cover art information and artist description
 * into a single object that can be returned as a json response
 *
 * @param  {String} mbid                The artists mbid
 * @param  {Object} artistInformation   Artist information from the MusicBrainz API
 * @param  {Object} coverArtInformation Cover art information from the Cover Art API
 * @param  {Object} description         Description from wikipedia
 * @return {Object}                     An object containing the information from the parameters
 *                                      above, structured in a sensible way
 */
module.exports = (mbid, { name }, description, albums) => ({
  mbid, name, description, albums
})
