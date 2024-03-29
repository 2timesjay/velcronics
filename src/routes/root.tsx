import * as React from "react";
import {
  Link,
  Routes,
  Route,
} from "react-router-dom";
import Personal from "../../content/personal/Personal";
import Books from "../../content/books/Books";
import BasicTable from "../../projects/basictable/BasicTable";
import PromptTable from "../../projects/prompttable/PromptTable";
import SideBySideTable from "../../projects/sidebysidetable/SideBySideTable";
import ThreeGallery from "./projects/visualizations/ThreeGallery";
import BoTorch from "../../projects/botorch/BoTorch";
import IFrameDemo from "../components/IFrameDemo";
import WebcamDisplay from "../components/WebcamDisplay";

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
          <Link to="/projects/visualizations">
            <img src="/p5js_logo.png" className="logo" title="P5JS Projects" height="256px" alt="P5JS Projects" />
          </Link>
          <Link to="/projects/botorch">
            <img src="/botorch.png" className="logo" title="Botorch and Ax Projects" height="256px" alt="Botorch and Ax Projects" />
          </Link>
          <Link to="/projects/uidemos/sidebysidetable">
            <img src="/react_logo.png" className="logo" title="A Demo React Table" height="256px" alt="A demo react table" />
          </Link>
          <Link to="/projects/uidemos/basictable">
            <img src="/react_logo.png" className="logo" title="A Demo React Table" height="256px" alt="A demo react table" />
          </Link>
          <Link to="/projects/uidemos/prompttable">
            <img src="/react_logo.png" className="logo" title="A Demo React Table" height="256px" alt="A demo react table" />
          </Link>
          <Link to="/projects/visiondemos/webcam">
            <img src="/kornia_logo.png" className="logo" title="Vision Projects" height="256px" alt="Computer Vision Projects" />
          </Link>
        </div>
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/projects/BoTorch" element={<BoTorch />} />
          <Route path="/projects/visualizations" element={<ThreeGallery />} />
          <Route path="/projects/uidemos/basictable" element={<BasicTable />} />
          <Route path="/projects/uidemos/prompttable" element={<PromptTable />} />
          <Route path="/projects/uidemos/sidebysidetable" element={<SideBySideTable />} />
          <Route path="/projects/visiondemos/webcam" element={<WebcamDisplay />} />
        </Routes>
      </div>
    </>
  );
};

export default Root;