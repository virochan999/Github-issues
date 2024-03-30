import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './RootLayout/RootLayout';
import Code from './pages/Code/Code';
import Issues from './pages/Issues/Issues';
import PullRequest from './pages/PullRequest/PullRequest';

const App = () => {
   const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout/>,
    errorElement: <Error/>,
    children: [{
      path: '/',
      element: <Code/>
    },{
      path: '/issues',
      element: <Issues/>
    },{
      path: '/pullrequest',
      element: <PullRequest/>
    }]
   }])

  return (
    <div className='App'>
       <RouterProvider router={router}/>
    </div>
  );
};

export default App;
