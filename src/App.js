import './App.css';
import React from 'react';
import {Landing, Register, Error, Dashboard, ProtectedRoute, UserPage, PostPage, LoginPage} from "./pages/index.js"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {SharedLayout} from "./components/index.js"

function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
        <Route path="/user/:id" element={<><UserPage></UserPage></>}></Route>
        <Route path="/post/:id" element={<PostPage></PostPage>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
   </BrowserRouter>
  ); 
}

export default App;
