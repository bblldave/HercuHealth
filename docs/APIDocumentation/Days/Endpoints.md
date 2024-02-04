# Day API Endpoints Documentation

## `/create` Endpoint (Day)

### Overview

The `/create` endpoint allows for the creation of a new day in the application, linked to a specific week. It uses the `Day` and `Week` models for database operations and is secured with `passageAuthMiddleware`.

### HTTP Method

`POST`

### Endpoint

`/create`

### Middleware

- `passageAuthMiddleware`: Ensures that the request is authenticated. It validates the authentication token and extracts user details.

### Request

- **Body Parameters**:
  - `week`: The ObjectId of the associated week.
  - `dayOfWeek`: The day of the week (e.g., 'Monday').
  - `workouts`: An array of ObjectId references to workouts planned for this day.
- **Headers**: Requires authentication token in the headers.

### Response

#### Success (201 - Created)

- **Body**: Contains a message "Day created successfully" and the details of the newly created day.
- Returns a JSON object with the newly created `Day` document.

#### Error (500 - Internal Server Error)

- **Body**: Returns an error message if there's a server-side issue, such as a database operation failure.

### Implementation Details

- The endpoint first creates a new `Day` document using the provided request body.
- It then updates the corresponding `Week` document to include the new `Day`.
- The new `Day` is saved in the database, and its details are returned in the response.

### Error Handling

- Catches exceptions during the process, returning a 500 status code for server-side errors.

## `/days/:dayId` Endpoints (GET, PUT, DELETE)

### Overview

These endpoints manage specific days identified by their unique ObjectId (`dayId`). They allow for retrieving, updating, and deleting a day, respectively.

### HTTP Methods

- `GET`: Retrieves a specific day.
- `PUT`: Updates a specific day.
- `DELETE`: Deletes a specific day.

### Endpoints

- GET: `/days/:dayId`
- PUT: `/days/:dayId`
- DELETE: `/days/:dayId`

### Middleware

- `passageAuthMiddleware`: Authenticates the request.

### Request (for PUT and DELETE)

- **URL Parameters**: `dayId` - the ObjectId of the day to be retrieved, updated, or deleted.
- **Body Parameters (PUT)**: Fields to update in the day document.
- **Headers**: Requires authentication token.

### Response

#### Success

- GET (200 - OK): Returns the requested day's details.
- PUT (200 - OK): Returns a message "Day updated successfully" and the updated day's details.
- DELETE (200 - OK): Returns a message "Day deleted successfully".

#### Error (404 - Not Found)

- **Body**: Returns "Day not found" if no day matches the given `dayId`.

#### Error (500 - Internal Server Error)

- **Body**: Returns an error message for server-side issues.

### Implementation Details

- GET: Fetches and returns the `Day` document matching the `dayId`.
- PUT: Updates the fields of the `Day` document matching the `dayId` with the provided data.
- DELETE: Removes the `Day` document matching the `dayId` and updates the associated `Week` to reflect this change.

### Error Handling

- Catches exceptions, returning appropriate status codes and messages for different error scenarios.
