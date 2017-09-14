# Music Mashup

## Description

This application is a Mashup of three API:s: [MusicBrainz](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2), [Wikipedia](https://en.wikipedia.org/w/api.php) and [Cover Art Archive](https://wiki.musicbrainz.org/Cover_Art_Archive/API).

The application is a simple [express](https://expressjs.com) app that exposes a single endpoint to fetch information about artists. The application is using Redis in order to cache responses from the API:s to reduce the amount of external calls, both to make the application faster and to avoid being rate limited.

## Requirements

Node v8.0+, Redis

## Installation

### Environment variables
Create an `.env` file in the root of the project containing the following keys:

```
PORT=3000

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```

It is possible to run the application without the .env file, and the defaults (as shown above) will be used.

### Dependencies
Run `npm install` to install the dependencies.

## Instructions
To run the application, run `npm run start`.

The application only contains one endpoint: `GET /artists/:mbid`. MBID:s can be found on [MusicBrainz](https://musicbrainz.org/).
The endpoint will return a JSON object containing information about the artist, a description and a list of albums. Each album is represented by an object containing the album's id, title and a URL to the album's cover art.

Example response for `GET localhost:3000/artists/40a10c54-06a1-46ad-9161-53e989c4ca95`:

```json
{
    "mbid": "40a10c54-06a1-46ad-9161-53e989c4ca95",
    "name": "Young Guns",
    "description": "<p><b>Young Guns</b> are an English alternative rock band from High Wycombe, Buckinghamshire. The members, working with each other in various musical interests throughout the 2000s, formally formed the band in 2008, and rose to prominence after their debut EP, <i>Mirrors</i>, earned them spots opening live shows for Bon Jovi and Guns N' Roses. Their debut album, <i>All Our Kings Are Dead</i>, on 12 July 2010. Their second album, <i>Bones</i>, was released in February 2012. Their single \"Bones\" reached no. 1 on the <i>Billboard</i> Active Rock charts in the US in May 2013. Their third album, <i>Ones and Zeros</i>, was released on 9 June 2015. The band's fourth album, <i>Echoes</i>, was released on September 16, 2016.</p>\n<p></p>",
    "albums": [
    {
        "id": "16b4cf5c-07f2-432f-a435-8d3b4fd0d85b",
        "image": "http://coverartarchive.org/release/11d2b122-f654-4a17-933f-705fd3cd3d7b/14355798671.jpg",
        "title": "Echoes"
    },
    {
        "id": "2a72a69a-f780-4071-b919-21ba19f742b6",
        "image": "http://coverartarchive.org/release/d61c04d5-8a37-419b-9ab0-05c48e64cf2d/5374518058.jpg",
        "title": "All Our Kings Are Dead"
    },
    {
        "id": "90843167-903f-4ecb-ad4f-9005504d2a83",
        "image": "http://coverartarchive.org/release/d06d1be8-edd9-41dd-87b3-0ae381dfcc24/1559610373.jpg",
        "title": "Bones"
    },
    {
        "id": "bd083fb6-b6b4-42c0-84c8-a47f706d9932",
        "image": "http://coverartarchive.org/release/1e0dd455-7fd4-4da0-ad88-65c52ecf8458/12543195022.jpg",
        "title": "Ones and Zeros"
    }
    ]
}
```
