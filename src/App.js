import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/Private-route";
import { AxiosProvider } from "./config/axios";
import { useAuthen } from "./context/authentication";

function App() {
   const { role } = useAuthen();

   return (
      <AxiosProvider>
         <BrowserRouter>
            <PrivateRoute role={role} />
         </BrowserRouter>
      </AxiosProvider>
   );
}

export default App;
