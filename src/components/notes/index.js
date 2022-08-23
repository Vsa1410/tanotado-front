import { Grid, TextField, Button } from '@mui/material';
import React, {useState, Fragment, useEffect} from 'react'
import {push as Menu} from 'react-burger-menu';
import TocIcon from '@mui/icons-material/Toc';
import { IconButton } from "@mui/material";
import '../../screens/Notes/index.css'
import axios from 'axios';
import baseURL from '../../services/api';
import ListNotes from './list';
import dayjs from 'dayjs';
import Editor from '../../screens/Notes/editor';
import NotesService from './routes';
import { set } from 'mongoose';



function Notes(props){
    const [info,setInfo] = useState("")
    const [opened, setOpened] = useState(false)
    const [current_note, setCurrentNote] = useState({title:"", body:"", id:""});
    const [length, setLength]= useState('')
    const [catchNote, setCatchNote]= useState('')
    const [notes,setNotes] = useState([])



    //Get the token from LocalStorage
    let userId = localStorage.getItem("user")
    let id = JSON.parse(userId)
    let token=id.token
        
    
        
    
    const URL = `${baseURL}/notes/`;
    const config = {
       headers: {
         'x-access-token': `${token}`,
       },
     };    

    
    async function fetchNotes(){
        
        axios
        .get(URL, config)
        .then((response)=>{   
            
            setNotes(response.data.reverse())      
            
            setCurrentNote(response.data[0])                      
        })
        
    }
    
    useEffect(()=>{ 
        fetchNotes()
    },[])

    const selectNote = (id) => {
        const note = notes.find((note)=> {
            return note._id == id;
        })
        setCurrentNote(note)
        setOpened(false)
    }
    

    
    function openButton(){
        if(opened === false){
            fetchNotes()
            return setOpened(true)

        }else if(opened === true){
            
            return setOpened(false)
        }
        
    }
    //Delete Method
    async function deleteNote(note){
        // eslint-disable-next-line no-restricted-globals
        
        if(window.confirm("Deseja mesmo excluir essa nota?") === true){

            axios.delete(`${baseURL}/notes/${note._id}`,config)
            fetchNotes()     
        }
        
        
    }
    //Update Note
    


    const updateNote = async (oldNote, params) => {
         const updatedNote = await NotesService.update(oldNote._id, params);
         const index = notes.indexOf(oldNote);
         const newNotes = notes;
         newNotes[index] = updatedNote.data;
         setNotes(newNotes);
         setCurrentNote(updatedNote.data);
        fetchNotes()
       } 

       //create a note
       async function createNote() {
          axios.post(URL, {title: "Nova nota", body: "Nova nota..."}, config)

            fetchNotes()
        }
        if (notes.length < 1) {
            return(
                <Fragment>
                    <Grid container spacing={4} id="notes" className="notes">
                        <Menu
                            pageWrapId={"notes-editor"}
                            isOpen={opened}
                            noOverlay
                            disableAutoFocus
                            outerContainerId={"notes"}
                            customBurgerIcon={false}
                            customCrossIcon={false}

                        >

                            <Button variant="contained" onClick={createNote}>Nova Nota</Button>

                        </Menu>
                    </Grid>
                    <Grid className="notes-editor" id="notes-editor" container>
                        <div className='editor-show'>

                            <IconButton 
                                aria-label="List"
                                className="open-button"
                                onClick={openButton}>
                                
                                <TocIcon />
                            </IconButton>
                            <div>

                                <h2>Olá, {id.name}, Você ainda não tem nenhuma nota</h2>
                                <Button variant="contained" onClick={createNote}>Nova Nota</Button>
                            </div>
                        </div>

            </Grid>
        </Fragment>
            )
        }else{
            
            

    return(
        <Fragment>
             
            <Grid container spacing={4} id="notes" className="notes">
                <Menu
                    pageWrapId={"notes-editor"}
                    isOpen={opened}
                    noOverlay
                    disableAutoFocus
                    outerContainerId={"notes"}
                    customBurgerIcon={false}
                    customCrossIcon={false}
                >
                    <h2>Olá, {id.name}</h2>
                    <ListNotes
                        notes={notes}
                        selectNote={selectNote}
                        current_note={current_note} 
                        deleteNote={deleteNote}
                        createNote={createNote}
                    />
                    <div className='space'>

                    </div>
                   
                    
                       

                    
                </Menu>
                        
            </Grid>
            
            <Grid className="notes-editor" id="notes-editor" container>
                <div className='editor-show'>

                    <IconButton 
                        aria-label="List"
                        className="open-button"
                        onClick={openButton}>
                        
                        <TocIcon />
                    </IconButton>
                    <div>

                    <h2>{current_note.title}</h2>
                    </div>
                    <Editor 
                    updateNote={updateNote}
                    note={current_note}/>
                </div>

            </Grid>
        </Fragment>
    )
}} 
export default Notes