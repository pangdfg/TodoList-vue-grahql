# Todo List (Vue.js + Express Graphql + Fiber)

This project is a full-stack Todo List application built using Vue.js for the frontend, Express with GraphQL for the API gateway, and Fiber for the backend services. The application allows users to create, manage, and track their tasks online with ease.

## Setup and Run with Docker Compose

1. Ensure you have Docker and Docker Compose installed on your machine.
2. Clone the repository:
   ```sh
   git clone https://github.com/pangdfg/TodoList-vue-grahql.git
   ```
3. Navigate to the project directory:
   ```sh
   cd todo-list-fullstack
   ```
4. Build and start the containers:
   ```sh
   docker-compose up --build
   ```
5. Open your browser and navigate to `http://localhost:4000` to access the API Gateway and `http://localhost` to access the frontend.

## Services

- **MySQL**: Database service running on port 3306.
- **Todo Service**: Backend service for managing todos running on port 8081.
- **User Service**: Backend service for managing users running on port 8080.
- **API Gateway**: Gateway service running on port 4000.
- **Frontend**: Vue.JS frontend application.

## Environment Variables

- `DB_HOST`: Hostname for the database.
- `DB_PORT`: Port for the database.
- `DB_USER`: Database user.
- `DB_PASSWORD`: Database password.
- `DB_NAME`: Database name.
- `JWT_SECRET`: Secret key for JWT authentication.
- `USER_SERVICE`: URL for the user service.
- `TODO_SERVICE`: URL for the todo service.
## Usage

 - Register a new user or log in with existing credentials.
 - Create, update, and delete tasks.
 - Update user profile information and profile image.

## License
This project is licensed under the MIT License.
