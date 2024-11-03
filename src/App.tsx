import React from 'react';
import {RouterProvider} from "react-router-dom";
import router from "./Router";
import Header from "./Components/Header";


function App() {
  return (
      <>
          <RouterProvider router={router} />
      </>
  );
}

export default App;
