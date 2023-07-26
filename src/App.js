import { Route, Routes } from "react-router-dom";
import Articles from "./component/Articles";
import Article from "./component/Article";
import ArticleEdit from "./component/ArticleEdit";
import ArticleWrite from "./component/ArticleWrite";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/edit/:id" element={<ArticleEdit />} />
        <Route path="/write" element={<ArticleWrite />} />
      </Routes>
    </div>
  );
}

export default App;
