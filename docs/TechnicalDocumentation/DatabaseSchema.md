# Database Schema Design

## HercuHealth Database Structure

### Overview

- The database is designed to efficiently store and manage user data, workout programs, and exercise details.
- MongoDB’s flexible schema is utilized to accommodate the varying structures of data.

### Collections

- **Users**: Stores user information, including authentication details.
- **Workouts**: Contains details of individual workouts.
- **Programs**: Holds information about workout programs.

### Relationships

- Users can have multiple Programs.
- Each Program can contain multiple Workouts.
- Workouts consist of various Exercises with customizable parameters.

### Security

- Sensitive data like passwords are hashed.
- Access controls implemented to ensure data privacy.

## Conclusion

The database schema is structured to support the dynamic and flexible nature of user-generated workout content, ensuring data integrity and efficient access.
