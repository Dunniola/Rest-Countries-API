import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import ReadMore from './pages/ReadMore';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path = "/read-more" element={<ReadMore/>} />
        
        
      </Route>
    )
  );

  return (

     

      <RouterProvider router={router} />
   
  );
}

export default App;
