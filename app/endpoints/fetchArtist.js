/**
 * Creates a fetchArtist function.
 *
 * @param  {Object}   artists   A service that finds artist information by mbid
 * @return {Function}           A function that gets an artist by the given mbid and
 *                              returns a json response containing the artist's basic
 *                              information, description and a list of their albums
 */
 module.exports = (artists) => async (req, res) => {
  try {
    const artist = await artists.find(req.params.mbid)

    res.json(artist)
  } catch (e) {
    console.log(e) // Might want to move this to a centralized logging service in the future
    res.status(404).json({ status: 404, message: 'Not found' })
  }
}
