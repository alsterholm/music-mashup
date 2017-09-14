require('dotenv').config()

const express = require('express')
const axios = require('axios')

const redisFactory = require('./cache/redisFactory')
const fetchArtistFactory = require('./endpoints/fetchArtist')
const createServices = require('./services/factory')
const artistsFactory = require('./services/artists')

const redis = redisFactory(process.env)

const { musicBrainz, coverArt, wikipedia } = createServices(axios)
const artistsService = artistsFactory(redis, musicBrainz, coverArt, wikipedia)
const fetchArtist = fetchArtistFactory(artistsService)

const app = express()

app.get('/artists/:mbid', fetchArtist)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App running on port ${port}`))
