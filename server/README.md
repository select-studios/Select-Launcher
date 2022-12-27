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
- `REFRESH_TOKEN_SECRET` - Any random (but secure) string that you choose to protect the refresh methods once it is running.
- `ACCESS_TOKEN_LIFE` - The time that the access token will last.
- `REFRESH_TOKEN_LIFE` - The time that the refresh token will last.
- `MONGO_URI` - Your database's connection URI string.

## Usage

! Note: The base URL for the account system is `http://localhost:PORT/api/accounts/`

### `Register` Route (POST)

Send a request to the `api/accounts/register` route with the following body:

```json
{
    "email": "" (required),
    "username": "" (required),
    "password": "" (required)
}
```

If successful, you should get a `201` status code along with the user details. It includes the email, username, password (hashed) and also your unique user ID.

### `Login` Route (POST)

Send a request to the `api/accounts/login` route with the following body:

```json
{
    "email": "" (required || !required),
    "username": "" (required || !required),
    "password": "" (required)
    // Note: You can either use email or username to login
}
```

If successful, you should get a `201` status code along with the user details. It includes the email, username, password (hashed), your unique user ID and also a JWT (don't share it with anyone). It also saves a cookie on your browser with the token for a duration of 1 hour.

### `Refresh` Route (POST)

When you login, you get an access token which has a validity of 1 hour. After that, you will either have to logout and login again. Instead of this, just use the refresh route to get a new access token. This route is `api/accounts/refresh` with the authorization header set to `Bearer <refreshToken>`.

### `Logout` Route (DELETE)

If you have a valid JWT, you can send a request to the `api/accounts/logout` route to logout with the authorization header set to `Bearer <jwt (your latest accessToken)>`.

If successful, you should get a `204` status code.

### `Account` Route (POST, protected)

If you have logged in and received a status code of `201` on the attempt, send a request to the `api/accounts/account` route with the authorization header set to `Bearer <jwt>`.

You should get a `201` status code along with the user details. It includes the email, username, password (hashed), your unique user ID and also a JWT (don't share it with anyone).

### Example Workflow

https://user-images.githubusercontent.com/71206933/197714418-11965169-2f80-4fb7-8c90-36d03c4e699a.mp4
