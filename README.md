# School Management API

## Node JS Assignment

### Task: Develop Node.js APIs for School Management

#### Objective
Implement a set of APIs using Node.js, Express.js framework, and MySQL to manage school data. The system allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

---

## Requirements

### Database Setup
- **Table:** `schools`
- **Fields:**
  - `id` (Primary Key, INT, Auto Increment)
  - `name` (VARCHAR)
  - `address` (VARCHAR)
  - `latitude` (FLOAT)
  - `longitude` (FLOAT)

### API Endpoints

#### 1. Add School API
- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Payload:** `{ name, address, latitude, longitude }`
- **Functionality:** Validates input and adds a new school to the database.
- **Validation:** All fields required, correct data types enforced.

#### 2. List Schools API
- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Parameters:** `latitude`, `longitude` (user's location)
- **Functionality:** Fetches all schools, sorts them by proximity to the user's location, and returns the sorted list.
- **Sorting:** Uses geographical distance calculation.

### Hosting and Testing
- **Hosting:** Deploy APIs on a suitable hosting service.
- **Postman Collection:**
  - Includes both APIs with example requests and responses.
  - Share collection for stakeholder testing.

---

## Deliverables
- Source code repository with complete API implementation.
- Live API endpoints for testing.
- Postman collection shared via email or link.

---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd school-management-api
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file with your MySQL credentials and other configs.
4. **Run the server:**
   ```sh
   npm start
   ```

---

## Example Requests

### Add School
```
POST /api/addSchool
Content-Type: application/json
{
  "name": "ABC School",
  "address": "123 Main St",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

### List Schools
```
GET /api/listSchools?latitude=12.9716&longitude=77.5946
```

---

## License
MIT
