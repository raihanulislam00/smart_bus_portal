# Smart Bus Portal - Passenger Category 3 Implementation

## Overview
This implementation provides a complete database-integrated passenger management system following the Category 3 requirements. The system uses PostgreSQL with TypeORM for data persistence.

## Schema Implementation

### Passenger Entity
The `Passenger` entity implements the following schema criteria:

- **id**: Auto-generated primary key with `@BeforeInsert` hook for custom logic
- **username**: VARCHAR(100), unique constraint
- **fullName**: VARCHAR(150)
- **isActive**: BOOLEAN, defaults to false
- Additional optional fields: mail, phone, address, gender, password, photoPath

### BeforeInsert Hook
The `@BeforeInsert` hook in the entity performs custom validation before database insertion:
- Validates that username is provided
- Validates that fullName is provided
- Logs custom ID generation logic

## API Endpoints

### Core Operations (Category 3 Requirements)

#### 1. Create a User
- **POST** `/passenger`
- **Body**: 
```json
{
  "username": "john_doe",
  "fullName": "John Doe",
  "isActive": false,
  "mail": "john@example.com",
  "phone": "01234567890",
  "gender": "male",
  "address": "123 Main St"
}
```

#### 2. Retrieve Users by Full Name Substring
- **GET** `/passenger/search/fullname?substring=John`
- Returns all passengers whose full name contains the specified substring

#### 3. Retrieve User by Username
- **GET** `/passenger/username/john_doe`
- Returns a single passenger with the specified username

#### 4. Remove User by Username
- **DELETE** `/passenger/username/john_doe`
- Removes the passenger with the specified username

### Additional Endpoints

#### Get All Users
- **GET** `/passenger/all`
- Returns all passengers ordered by creation date

#### Get User by ID
- **GET** `/passenger/:id`
- Returns a passenger by their ID

#### Update User
- **PUT** `/passenger/:id`
- Updates a passenger's information

#### Remove User by ID
- **DELETE** `/passenger/:id`
- Removes a passenger by ID

#### Photo Upload
- **POST** `/passenger/upload/:id`
- Upload a photo for a passenger

#### Get Photo
- **GET** `/passenger/photo/:filename`
- Retrieve uploaded photos

### Legacy Endpoints (Backward Compatibility)
- **GET** `/passenger/user/:name`
- **GET** `/passenger/query?name=value`

## Database Configuration

The application uses PostgreSQL with the following connection settings:
- Host: localhost
- Port: 5432
- Username: postgres
- Password: 12345678
- Database: passenger

## Features

### Validation
- Username uniqueness enforcement
- Input validation using class-validator decorators
- Custom validation messages
- Required field validation

### Error Handling
- Custom exceptions for not found scenarios
- Conflict detection for duplicate usernames
- Comprehensive error messages

### TypeORM Integration
- Entity relationships and mappings
- Repository pattern implementation
- Database synchronization
- Query builder usage with Like operator for substring search

## File Structure

```
src/
├── passenger/
│   ├── entities/
│   │   └── passenger.entities.ts       # Database entity with @BeforeInsert hook
│   ├── dto/
│   │   ├── createPassenger.dto.ts      # Create validation DTO
│   │   └── updatePassenger.dto.ts      # Update validation DTO
│   ├── interfaces/
│   │   └── passenger.interface.ts      # TypeScript interface
│   ├── pipes/
│   │   └── passenger-exist.pipe.ts     # Custom validation pipe
│   ├── passenger.controller.ts         # HTTP endpoints controller
│   ├── passenger.service.ts            # Business logic service
│   └── passenger.module.ts             # NestJS module configuration
```

## Service Methods

### Core Operations
- `create(createPassengerDto)`: Creates a new passenger
- `findByFullNameSubstring(substring)`: Searches by full name substring
- `findByUsername(username)`: Finds passenger by username
- `removeByUsername(username)`: Removes passenger by username

### Additional Methods
- `findAll()`: Get all passengers
- `findById(id)`: Find by ID
- `update(id, updateDto)`: Update passenger
- `updatePhotoPath(id, filename)`: Update photo path

## Running the Application

1. Start PostgreSQL database
2. Install dependencies: `npm install`
3. Run in development mode: `npm run start:dev`
4. The application will be available at `http://localhost:3000`

## Testing the Implementation

### Create a User
```bash
curl -X POST http://localhost:3000/passenger \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "fullName": "Test User Name",
    "isActive": true
  }'
```

### Search by Full Name Substring
```bash
curl "http://localhost:3000/passenger/search/fullname?substring=Test"
```

### Get User by Username
```bash
curl http://localhost:3000/passenger/username/testuser
```

### Delete User by Username
```bash
curl -X DELETE http://localhost:3000/passenger/username/testuser
```

## Key Implementation Notes

1. **Database Integration**: Full PostgreSQL integration with TypeORM
2. **Schema Compliance**: Exact implementation of Category 3 requirements
3. **BeforeInsert Hook**: Custom logic before database insertion
4. **Unique Constraints**: Username uniqueness enforced at database level
5. **Substring Search**: Efficient database query using TypeORM's Like operator
6. **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
7. **Validation**: Input validation with detailed error messages
8. **TypeScript**: Full type safety throughout the application
