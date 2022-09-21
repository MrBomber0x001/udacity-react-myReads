import React, { useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as API from "../BooksAPI";

const SearchPage = ({ allBooks, changeShelf }) => {
  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);

  console.log(allBooks);
  const updateQuery = (query) => {
    console.log(query.length);
    if (query.length !== 0) {
      setQuery(query.trim());
      API.search(query, 10).then((books_) => {
        setSearchBooks(books_.error ? [] : books_);
      });
    } else {
      setSearchBooks([]);
    }
  };

  console.log(searchBooks);
  let merged = searchBooks.map((sBook) => {
    const intersectBook = allBooks.find((book) => {
      return book.id === sBook.id;
    });
    sBook.shelf = intersectBook ? intersectBook.shelf : "none";

    return sBook;
  });

  console.log("Merged", merged);
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => {
              updateQuery(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {merged.map((book, index) => {
            return (
              <Book
                key={index}
                book={book}
                changeShelf={changeShelf}
                shelf={book.shelf}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
