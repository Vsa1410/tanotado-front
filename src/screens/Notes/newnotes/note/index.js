import React from 'react'
import {Button, Container} from '@mui/material'
import TextField from '@mui/material/TextField';
import './index.css'
import axios from 'axios';
import baseURL from '../../../../services/api';
import { Navigate } from 'react-router-dom';


function NoteText(){
   
    const [title, setTitle] = React.useState('');
    const [body,setBody]=React.useState('')
    const [redirectToNotes, setRedirectToNotes] = React.useState(false)

    ///const handleChange = (event) => {
    //setValue(event.target.value);

   async function handleSubmit(event){
        event.preventDefault()

        let userId = localStorage.getItem("user")
        
        if( userId === "" || userId === null){
            return <Navigate to={'/'} />
        }
        let id = JSON.parse(userId)
        let token= id.token
        console.log(token)
        const config = {
            headers: {
              'x-access-token': `${token}`,
            },
          };
          
        axios
        .post(`${baseURL}/notes/`,{
            title: title,
            body: body, 
            
        },config)
        .then(()=>{
            setRedirectToNotes(true)
        })
   }
   if(redirectToNotes === true){
    return <Navigate  to="/notesscreen" replace={true} />
    
}

  
    return(
       <Container minWidth={350}>
            <form className='new-note' onSubmit={handleSubmit}>

                <h4 className='note-text'>
                    Title:
                </h4>
                <TextField fullWidth label="Title" id="fullWidth" onChange={e => setTitle(e.target.value)} />
                <h5 className='note-text'>
                    Note:
                </h5>
                <TextField
                id="outlined-multiline-static"
                label="Your Text Here"
                multiline
                fullWidth
                rows={8}
                onChange={e => setBody(e.target.value)}
                />
                <Button variant="contained" type='submit'>Send</Button>
            </form>


       </Container> 
    )
}
export default NoteText