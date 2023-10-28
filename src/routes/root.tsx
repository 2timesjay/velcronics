import * as React from "react";
import {
  Link,
  Routes,
  Route,
} from "react-router-dom";
import Personal from "./personal/Personal";
import Books from "./books/Books";

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
          <div>
            <Link to="/books">Book and Article Reviews</Link>
          </div>
          <div> 
            <Link to="/personal">Personal</Link>
          </div>
          <h2>Project Gallery</h2>
          <a href="/projects/visualizations/">
            <img src="/p5js_logo.png" className="logo" title="P5JS Projects" height="256px" alt="P5JS Projects" />
          </a>
          <a href="/projects/botorch/">
            <img src="/botorch.png" className="logo" title="Botorch and Ax Projects" height="256px" alt="Botorch and Ax Projects" />
          </a>
          <a href="/projects/sidebyside/">
            <img src="/react_logo.png" className="logo" title="Single Page Webapp" height="256px" alt="Single Page Webapp" />
          </a>
          <a href="/projects/basictable/">
            <img src="/react_logo.png" className="logo" title="Single Page Webapp" height="256px" alt="Single Page Webapp" />
          </a>
          <a href="/projects/prompttable/">
            <img src="/react_logo.png" className="logo" title="Single Page Webapp" height="256px" alt="Single Page Webapp" />
          </a>
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