import "./App.css";
import { useState, useEffect } from "react";
import MyReads from "./components/Reads";
import SearchPage from "./components/SearchPage";
import { Route, Routes } from "react-router-dom";
import * as API from "./BooksAPI";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    let search = true;
    const getBooks = async () => {
      if (search) {
        const res = await API.getAll();
        console.log("All BOOKs", res);
        setAllBooks(allBooks.concat(res));
      }
    };
    getBooks();
    return () => {
      search = false;
    };
  }, []);

  const changeShelf = (book, shelf) => {
    API.update(book, shelf);
    book.shelf = shelf;
    setAllBooks(allBooks.filter((b) => b.id !== book.id).concat(book));
  };

  return (
    <Routes>
      <Route
        exact
        path={"/"}
        element={<MyReads books={allBooks} changeShelf={changeShelf} />}
      />

      <Route
        exact
        path={"/search"}
        element={<SearchPage allBooks={allBooks} changeShelf={changeShelf} />}
      />
    </Routes>
  );
}

export default App;
