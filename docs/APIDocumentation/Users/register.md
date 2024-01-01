# `/register` Endpoint

## Overview

The `/register` endpoint is responsible for registering a new user in the application. It integrates with the Passage authentication middleware for user authentication and uses the `User` model for database operations.

## HTTP Method: `POST`

## Endpoint

`/register`

## Middleware

- `passageAuthMiddleware`: Validates the authentication token and provides user details. The user information is then accessible in the `res.user` object.

## Request

- **Body**: The request does not require any body parameters as the user details are obtained from the Passage authentication middleware.
- **Headers**: Cookie header needs to be supplied with the psg_auth_token.

## Response

### Success (201 - Created)

- **Body**: `message: User registered successfully`
- When the user registration is successful, the server responds with a status code of 201 and a success message.

### Error (500 - Internal Server Error)

- **Body**: `Server error: {error}`
- If there is any server-side error (e.g., database operation failure), the server responds with a status code of 500 and an error message.

## Implementation Details

The endpoint performs the following steps:

1. The `passageAuthMiddleware` processes the incoming request and sets `res.user` with the authenticated user's details.
2. A new `User` instance is created using the email and Passage ID from `res.user`.
3. The `User` instance is saved to the database.
4. If the operation is successful, a 201 status code is sent back to the client.
5. In case of any exceptions during processing, a 500 status code is returned.

## Error Handling

- The endpoint catches and handles any exceptions during the user registration process.
- All server-side errors result in a 500 status code, abstracting the underlying issue from the client for security reasons.

## Usage Example

This endpoint is typically called during the user registration flow after the user has been authenticated via Passage.

```javascript
// Example POST request to /register endpoint
fetch("/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Cookie: "psg_auth_token={psg_auth_token}",
  },
})
  .then((response) => response.text())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```
