# Bookstore
The project is intended to be a website that displays a list of books that the user have saved.

## Feature list
### API endpoints:

**Add** - <br/>
Handle an incoming request to add a new book. 

POST /api/books

**Get** - <br/>
Handle a request to display all the books.

GET /api/books <br/>
GET /api/books/:id

**Update** - <br/>
Handle a request to update book information.

PUT /api/books 

**Delete** - <br/>
Handle a request to remove a book.

DEL /api/books/:id

## Technology stack
### Front-end implementation:
- Technology/Language: React/Nextjs/Typescript

### Back-end implementation:
- Technology/Language: Nodejs/Express/Typescript

### Database implementation:
- Provider: Atlas MongoDB
- Database: MongoDB

## How to run the project locally
You have the option run just the frontend and use in-memory data for testing purposes, or run both the frontend and backend with a valid connection to a MongoDB database.

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB database (if running the backend).

### Configuration
- For frontend, go to next.config.js and follow the instructions to set up necessary environment variables.
- For backend, go to config/default.ts and follow the instructions to set up necessary environment variables.
