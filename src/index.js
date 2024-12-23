import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';import FileUpload from './Pages/FileUpload';
import Error404 from './Pages/Error404';
;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='' element={<Login/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/fileupload' element={<FileUpload/>} />
        <Route path='*' element={<Error404/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
