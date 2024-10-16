
# Comic Book E-commerce Store Backend

This repository contains the backend implementation for a Nodejs-based comic book e-commerce store. It handles the inventory management of comic books and provides an API for store managers to manage the inventory and for users to browse available comic books. The backend supports CRUD operations, as well as pagination, filtering, and sorting for large datasets.

## Features

### 1. Comic Book Management API (For Admins)
- **Create a Comic Book**  
   Add a new comic book to the inventory by submitting details such as:
   - `Book Name`
   - `Author`
   - `Year of Publication`
   - `Price`
   - `Discount` 
   - `Number of Pages`
   - `Condition` (new, used, etc.)
   - `Description` 
   
- **Edit a Comic Book**  
   Update the details of an existing comic book (e.g., price, condition, or discount).

- **Delete a Comic Book**  
   Permanently remove a comic book from the inventory.

### 2. Comic Book List API (For Users)
- **Fetch Inventory List**  
   Retrieve a list of all available comic books in the inventory, with the following features:
   - **Pagination**: Retrieve results in a paginated format to handle large datasets.
   - **Filtering**: Filter the list of comic books based on:
     - Author
     - Year of Publication
     - Price Range
     - Condition (new, used)
   - **Sorting**: Sort the results by:
     - Price (ascending or descending)
     - Year of publication
     - Alphabetically by title

### 3. Comic Book Details API
- **Get Comic Book Details**  
   Retrieve full details of a specific comic book by its ID, including all its attributes (price, condition, description, etc.).

## Project Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [MongoDB](https://www.mongodb.com/) (for database connection)

### Environment Variables
Create a `.env` file in the root directory and include the following variables:
```
PORT=5000
MONGODB_URI=<your_mongodb_connection_url>
```

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/codder077/Backend_cosmic.git
   cd Backend_cosmic
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

   The server will run on `http://localhost:4000` by default.

## Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Nodemon**: Utility that monitors for any changes in your source and automatically restarts the server.

## API Endpoints

### Comic Book Management (Admin)
- `POST /api/comics` - Add a new comic book
- `PUT /api/comics/:id` - Edit an existing comic book
- `DELETE /api/comics/:id` - Delete a comic book

### Comic Book List & Details (Users)
- `GET /api/comics` - Fetch paginated list of comic books with filtering and sorting
- `GET /api/comics/:id` - Fetch details of a specific comic book by its ID

---
