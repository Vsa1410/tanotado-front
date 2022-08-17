import axios from "axios";
import React from "react";
import {useEffect} from 'react'
import baseURL from "../../../services/api";
import {Navigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import { useState } from "react";
import NotesCard from "./notescard";
import './index.css';
import { Grid } from "@mui/material";
import dayjs from "dayjs";



    

function NotesScreen (){
    
    const [data,setData] = useState("")
    

        
    
        
    
        
        useEffect(() => {
            
            axios
            .get(URL, config)
            .then((response)=>{
                setData(response.data)
                console.log(data)
                
            })
            
            }, []);
    
        
        let userId = localStorage.getItem("user")
        
        if( userId === "" || userId === null){
            return <Navigate to={'/'} />
        }
        let id = JSON.parse(userId)
        let token= id.token

        const URL = `${baseURL}/notes/`;
        const config = {
          headers: {
            'x-access-token': `${token}`,
          },
        };



       
        
        
        if (data.length === 0){
            return (
                <div>
                    
                    <h3 style={{margin: "20px 5% 0 6%",  color:"#565757"}}>Nenhum lançamento encontrado</h3>
                </div>
            )
        }else{    
    

    return(
        
            <div>
                <div className="main-text">
                    <h2>My notes</h2>
                </div>
                <Box className="notes" sx={{ flexGrow: 1}}>

                    <Grid container spacing={6} >
                
                        {data.map((note, index) => (
                        <NotesCard
                        key={index}
                        date={dayjs(note.date).format('DD/MM/YYYY')}
                        title={note.title}
                        body={note.body}
                        id={note._id}
                        />
                        ))} 
                    </Grid>    
                </Box>
            
            </div>
           
    )
}}

export default NotesScreen

