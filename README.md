# Rule Engine Application

## Overview
This **Rule Engine Application** dynamically creates, combines, evaluates, and updates rules using an **Abstract Syntax Tree (AST)**. It allows defining rules based on user attributes like age, department, income, and spend to determine eligibility. The application follows a **3-tier architecture**, comprising a backend API, data storage, and a simple frontend for interaction.

### Key Features
- **Create** rules using simple expressions like `(age > 30 && salary > 60000)`.
- **Combine** rules logically (e.g., using 'AND' or 'OR').
- **Evaluate** rules against user data to check eligibility.
- **Update** rules by modifying existing expressions.
- **Validation** for valid attributes and handling of invalid rules.

### Tech Stack
- **Backend**: Node.js, Express.js, Mongoose, MongoDB
- **Frontend**: React.js (basic UI for interacting with the backend)
- **Database**: MongoDB (for storing rules and metadata)
- **Testing**: Jest, Supertest

## Getting Started

### Prerequisites
- Ensure you have **Node.js** and **npm** installed.
- Have access to **MongoDB Atlas** or a local instance of **MongoDB**.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kshitijcodesstuff/zeotap_rule_engine
   ```

2. **Navigate to the backend directory**
   ```bash
   cd zeotap_rule_engine/backend
   ```

3. **Install backend dependencies**
   ```bash
   npm install
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```

   The backend server will run on **http://localhost:5001** by default.

5. **Navigate to the frontend directory**
   ```bash
   cd ../frontend
   ```

6. **Install frontend dependencies**
   ```bash
   npm install
   ```

7. **Start the frontend server**
   ```bash
   npm start
   ```

   The frontend will run on **http://localhost:3000** by default.

### Testing

1. **Navigate to the backend directory**
   ```bash
   cd ../backend
   ```

2. **Run tests**
   ```bash
   npm test
   ```

   This will run the **unit and integration tests** for the rule engine's backend.

## API Endpoints

- **Create Rule**: `POST /api/rules/create`
  - Request Body: `{ "ruleString": "(age > 30 && salary > 60000)", "name": "High Earners" }`
  - Response: JSON object containing the created rule.

- **Combine Rules**: `POST /api/rules/combine`
  - Request Body: `{ "ruleIds": ["<ruleId1>", "<ruleId2>"], "name": "Combined Rule" }`
  - Response: JSON object containing the combined rule.

- **Evaluate Rule**: `POST /api/rules/evaluate`
  - Request Body: `{ "ruleId": "<ruleId>", "data": { "age": 35, "salary": 70000 } }`
  - Response: `{ "result": true/false }`

- **Update Rule**: `PUT /api/rules/update/:id`
  - Request Body: `{ "ruleString": "(age > 25)" }`
  - Response: JSON object containing the updated rule.

- **Get All Rules**: `GET /api/rules`
  - Response: JSON array containing all rules.

## Example Usage

- **Create a Rule**
  ```json
  {
    "ruleString": "(age > 30 && department == 'Sales')",
    "name": "Sales Eligibility"
  }
  ```

- **Evaluate a Rule**
  ```json
  {
    "ruleId": "<ruleId>",
    "data": {
      "age": 35,
      "department": "Sales",
      "salary": 70000
    }
  }
  ```

## Additional Information

- The backend uses **Mongoose** for defining models and interacting with MongoDB.
- Rules are stored as ASTs, making evaluation and modification efficient.
- The frontend provides a simple UI to create, view, combine, and evaluate rules.

## Contributing

Feel free to open issues or submit pull requests for improvements and new features.


---
