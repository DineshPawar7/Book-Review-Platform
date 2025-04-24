import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-header text-text">
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-yellow-500">Book Review Platform</Link>
      </div>

      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-hover">Home</Link>
          </li>
          <li>
            <Link to="/booklist" className="hover:text-hover">Book List</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-hover">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
