import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AxiosProvider } from "./config/axios";
import { useAuthen } from "./context/authentication";
import PrivateRoute from "./components/PrivateRoute";

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
