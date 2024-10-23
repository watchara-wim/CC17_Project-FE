import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Table from "./pages/Table";
import Admin from "./pages/Admin";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route path="" element={<Home />} />
               <Route path="table" element={<Table />} />
               <Route path="about" element={<About />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
