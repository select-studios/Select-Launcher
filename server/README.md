# SelectStudios API

This API is specifically designed for private-use i.e to be used by the SelectStudios team to support the frontend and provide necessary features. Public-use might be rolled out later.

In brief, this API is a RESTful API that provides the following features:

- User Authentication
- User Registration

(more to be added soon)

## Installation

To test this API, you will first need the following:

- NodeJS
- MongoDB Cluster
- Dependencies (see package.json)

! Note: You will need to provide the following environment variables in a separate `.env.` file:

- `ACCESS_TOKEN_SECRET` - Any random (but secure) string that you choose to protect the routes once it is running.
- `MONGO_URI` - Your database's connection URI string.
