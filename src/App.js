
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomePage';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import NotesScreen from './screens/Notes/index';
import { Component } from 'react';
import Header from './components/Header';
import {useState} from 'react'
import NewNote from './screens/Notes/newnotes';


        let userId = localStorage.getItem("user")
        
        
        let id = JSON.parse(userId)
        export let token= id



function App() {
      
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/newnote" element={<NewNote/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/notesscreen" element={<NotesScreen/>}/>
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
