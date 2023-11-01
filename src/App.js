import Home from "./components/home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./common/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
