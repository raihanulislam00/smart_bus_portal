# Smart Bus Portal API Testing Guide

## Base URL
```
http://localhost:3000
```

## Authentication

### 1. Register a New Passenger
```
POST /passenger
```
Body (JSON):
```json
{
    "username": "john_doe",
    "fullName": "John Doe",
    "password": "your_password",
    "mail": "john@example.com",
    "phone": "12345678901",
    "address": "123 Main St",
    "gender": "male"
}
```

### 2. Login
```
POST /passenger/login
```
Body (JSON):
```json
{
    "username": "john_doe",
    "password": "your_password"
}
```
Response will include an `access_token`. Copy this token for subsequent requests.

## Setting Up Authentication in Postman

1. For protected endpoints, add an Authorization header:
   - Click on "Headers"
   - Add a new header:
     - Key: `Authorization`
     - Value: `Bearer your_access_token`
     (Replace `your_access_token` with the token received from login)

## Passenger Endpoints

### Get All Passengers
```
GET /passenger/all
```

### Get Passenger by ID
```
GET /passenger/:id
```
Replace `:id` with the actual passenger ID

### Update Passenger
```
PUT /passenger/:id
```
Body (JSON):
```json
{
    "fullName": "John Doe Updated",
    "mail": "john.updated@example.com",
    "phone": "12345678902"
}
```

### Delete Passenger
```
DELETE /passenger/:id
```

### Upload Passenger Photo
```
POST /passenger/upload/:id
```
Form-data:
- Key: `photo`
- Value: Select file (jpg, jpeg, png, or webp)

## Ticket Management

### Create Ticket
```
POST /passenger/:id/tickets
```
Body (JSON):
```json
{
    "routeName": "Dhaka to Chittagong",
    "seatNumber": "A1",
    "price": 500,
    "journeyDate": "2025-08-20T10:00:00.000Z"
}
```

### Get Passenger's Tickets
```
GET /passenger/:id/tickets
```

### Cancel Ticket
```
DELETE /passenger/:passengerId/tickets/:ticketId
```
Replace `:passengerId` and `:ticketId` with actual IDs

## Testing Steps

1. **First Time Setup**:
   - Start the NestJS server
   - Ensure your database is running
   - Create a new collection in Postman

2. **Authentication Flow**:
   - Register a new passenger
   - Login to get the access token
   - Set up the Authorization header in Postman

3. **Testing Protected Routes**:
   - Try accessing protected routes without token (should fail)
   - Add the token and try again (should succeed)
   - Test CRUD operations for passengers and tickets

## Common HTTP Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (e.g., duplicate username)
- 500: Internal Server Error

## Environment Variables
Consider setting up environment variables in Postman:
- Create a new environment
- Add variables:
  - `baseUrl`: http://localhost:3000
  - `token`: Your JWT token
  
Then use {{baseUrl}} and {{token}} in your requests for easier management.

## Collection Setup Tips

1. Create folders for:
   - Authentication
   - Passenger Management
   - Ticket Management

2. Use pre-request scripts to automatically add the token to requests

3. Set up tests to validate responses

Example test script for login:
```javascript
pm.test("Login successful", function () {
    pm.response.to.have.status(200);
    pm.response.to.have.jsonBody("access_token");
    
    // Automatically set the token for other requests
    var jsonData = pm.response.json();
    pm.environment.set("token", jsonData.access_token);
});
```
