const { first } = require('lodash')

module.exports = client => ({
  /**
   * Find information about a wikipedia page with the given name
   *
   * @param  {String}  pageName The name of the page to get the description from
   * @return {Promise}          A promise that evenutally will resolve to an object
   *                            representing the wikipedia page
   */
  find(pageName) {
    return client.get(buildUrl(pageName))
      .then(response => response.data)
  },

  /**
   * Get the discription of a wikipedia page with the given name
   *
   * @param  {String}  pageName The name of the page to get the description from
   * @return {Promise}          A promise that eventually will resolve to the
   *                            description of the given page
   */
  getDescription(pageName) {
    return this.find(pageName)
      .then(data => first(Object.values(data.query.pages)))
      .then(page => page.extract)
  }
})

const buildUrl = pageName =>
  `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${pageName}`
