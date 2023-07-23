import { Route, Routes } from "react-router-dom";
import Articles from "./component/Articles";
import Article from "./component/Article";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
