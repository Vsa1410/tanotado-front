
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomePage';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import NotesScreen from './screens/Notes/index';
import { Component } from 'react';
import Header from './components/Header';
import {useState} from 'react'
import UserEdit from './screens/users/edit';

import PrivateRoutes from './screens/Auth/privateroute';





function App() {
      
  return (
      <BrowserRouter>
          <Header/>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/register"   element={<Register/>} />
          <Route path="/login" element={<Login/>}/>

          <Route element={<PrivateRoutes/>}>
            <Route path="/notesscreen"   element={<NotesScreen/>} exact />
            
          </Route>

        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
