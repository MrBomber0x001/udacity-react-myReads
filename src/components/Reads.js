import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Book from "./Book";
import PropTypes from "prop-types";

const MyReads = (props) => {
  const books = props.books;
  const shelves = [
    { type: "currentlyReading", title: "Currently Reading" },
    { type: "wantToRead", title: "Want to Read" },
    { type: "read", title: "Read" },
  ];
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf_, index) => (
            <div className="bookshelf" key={index}>
              <h2 className="bookshelf-title">{shelf_.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter((book) => book.shelf === shelf_.type)
                    .map((book) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          changeShelf={props.changeShelf}
                          shelf={shelf_.type}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" />
      </div>
    </div>
  );
};
MyReads.propTypes = {
  books: PropTypes.array.isRequired,
};
export default MyReads;
