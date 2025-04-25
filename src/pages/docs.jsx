import React from 'react';

const Docs = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold text-center mb-6">Project Routes</h1>

      <section>
        <ul className="list-disc pl-5 mt-3">
        <li>
            <a href="/" className="text-blue-500 hover:underline">
              /
            </a> 
            - HomePage
          </li>
          <li>
            <a href="/login" className="text-blue-500 hover:underline">
              /login
            </a> 
            - Allows users to log in to the application with their credentials.
          </li>
          <li>
            <a href="/register" className="text-blue-500 hover:underline">
              /register
            </a> 
            - Allows users to register and create a new account.
          </li>

          <li>
            <a href="/admin/books/add" className="text-blue-500 hover:underline">
            /admin/books/add
            </a> 
            - To add new book, only admin login is required
          </li>
          <li>
            <a href="/booklist" className="text-blue-500 hover:underline">
            /booklist
            </a> 
            - BookListing Page
          </li>
          <li>
            <a href="/book/:bookId" className="text-blue-500 hover:underline">
            /book/:bookId
            </a> 
            - To give feedback and review about the book
          </li>
          <li>
            <a href="/routes" className="text-blue-500 hover:underline">
            /routes
            </a> 
            - Project and routing documentation
          </li>
         
        </ul>
      </section>

      
    </div>
  );
};

export default Docs;
