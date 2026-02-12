import * as React from "react";
import {
  Link,
  Routes,
  Route,
} from "react-router-dom";
import Personal from "../../content/personal/Personal";
import Books from "../../content/books/Books";

const pageLinks = [
  { to: "/books", label: "Book and Article Reviews", populated: true },
  { to: "/personal", label: "Personal", populated: true },
];

function Root() {
  return (
    <>
      <div id="app">
        <h1>Jacob Jensen</h1>
        <div>
          <div>
            <a href="https://github.com/2timesjay" target="_blank" rel="noopener noreferrer">
              Github Profile (2timesjay)
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/jacob-jensen-96564539/" target="_blank" rel="noopener noreferrer">
              Linkedin Profile
            </a>
          </div>
          {pageLinks
            .filter((link) => link.populated)
            .map((link) => (
              <div key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </div>
            ))}
        </div>
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </div>
    </>
  );
};

export default Root;
