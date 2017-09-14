const Redis = require('ioredis')

/**
 * Creates a new ioredis object from the given environment variables.
 *
 * @param  {Object}   env   The application's environment variables
 * @return {Redis}          An ioredis object
 */
module.exports = (env) => new Redis({
  host: env.REDIS_HOST || '127.0.0.1',
  port: env.REDIS_PORT || 6379,
  password: env.REDIS_PASSWORD || null
})
