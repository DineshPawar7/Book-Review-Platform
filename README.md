# Book Review Platform

This is a **Book Review Platform** built using **React** for the frontend and **Node.js/Express** for the backend. The platform allows users to view, add, and review books. Users can also register/login to access the platform features.

## **Tech Stack & Tools Used**

### **Frontend**
- **React**: JavaScript library for building user interfaces.
- **React Router**: For handling routing/navigation between different views (e.g., Login, Register, Books List, etc.).
- **Axios**: For making HTTP requests to the backend API.
- **Tailwind CSS**: For styling and building responsive designs quickly.
- **Vite**: Build tool and development server for faster builds and HMR.

### **Backend**
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database for storing book and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB to interact with the database.
- **JWT (JSON Web Token)**: For handling authentication and authorization.
- **Bcryptjs**: For password hashing and comparison.
- **Multer**: For handling file uploads (used for book image uploads).
- **dotenv**: For managing environment variables.

### **Development Tools**
- **Nodemon**: For auto-restarting the server during development.
- **ESLint**: For maintaining code quality and consistency.

## **Features**

1. **User Authentication:**
   - Register and login functionality with JWT-based authentication.
   - Password hashing and comparison using Bcrypt.js.

2. **Book Management:**
   - Users can add a new book with details like title, author, ISBN, description, and published date.
   - Books are displayed in a paginated list.

3. **Book Reviews:**
   - Users can leave reviews for books with a rating and comment.
   - Reviews are linked to users and displayed under the respective book.

4. **Image Upload:**
   - Books can have an associated image (cover) uploaded by the user.

5. **Responsive Design:**
   - The frontend is styled with Tailwind CSS and is fully responsive across devices.

6. **Admin and User Roles:**
   - Only registered users can leave reviews.
   - Admins can manage books and reviews (future enhancement).

## **Setup Instructions**

### **Clone the repository:**

   ```bash
   git clone https://github.com/DineshPawar7/Book-Review-Platform.git
   cd book-review-platform
