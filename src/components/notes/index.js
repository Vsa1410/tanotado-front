import { Grid, TextField, Button } from '@mui/material';
import React, {useState, Fragment, useEffect} from 'react'
import {push as Menu} from 'react-burger-menu';
import TocIcon from '@mui/icons-material/Toc';
import { IconButton, Alert, AlertTitle } from "@mui/material";
import '../../screens/Notes/index.css'
import axios from 'axios';
import baseURL from '../../services/api';
import ListNotes from './list';
import dayjs from 'dayjs';
import Editor from '../../screens/Notes/editor';
import NotesService from './routes';
import SearchIcon from '@mui/icons-material/Search';



function Notes(props){
    const [info,setInfo] = useState("")
    const [opened, setOpened] = useState(false)
    const [current_note, setCurrentNote] = useState({title:"", body:"", id:""});
    const [length, setLength]= useState('')
    const [catchNote, setCatchNote]= useState('')
    const [notes,setNotes] = useState([])
    const [searchQuery, setSearchQuery]=useState("")
    const [empty, setEmpty] = useState(false)



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

     //Search a Note
     async function handleSubmit(query){
        query.preventDefault()
        axios
        .get(`${baseURL}/notes/search?query=${searchQuery}`,config)
        .then((response) =>{
            
            if (response.data.length === 0){
                setEmpty(true)
            }
            setNotes(response.data)
        })
     
    }
    
    //Get all notes
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


    //select a Note
    const selectNote = (id) => {
        const note = notes.find((note)=> {
            return note._id == id;
        })
        setCurrentNote(note)
        setOpened(false)
    }
    

    //Open the lateral list
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
        
       } 

       //create a note
       async function createNote() {
          axios.post(URL, {title: "Nova nota", body: "Nova nota..."}, config)

            fetchNotes()
        }
        //If no notes show a message
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

                            <h2>Olá, {id.user.name}</h2>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={0}>
                                    <Grid item xs={10}>

                                        <TextField id="outlined-search" label="Buscar" type="search" onChange={(e) => setSearchQuery(e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton aria-label="search" type="submit" className="search-button">
                                            <SearchIcon />
                                        </IconButton>
                                        
                                    </Grid>
                                </Grid>
                            </form>

                            <Button variant="contained" onClick={createNote}>Nova Nota</Button>
                            {empty && <Alert severity="error">
                                    <AlertTitle>Erro</AlertTitle>
                                    Nenhuma nota encontrada com o termo <strong>{searchQuery}</strong>
                                    </Alert>}
                            <Button onClick={fetchNotes}>Voltar</Button>

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

                                <h2>Olá, {id.user.name}, Você ainda não tem nenhuma nota</h2>
                                <Button variant="contained" onClick={createNote}>Nova Nota</Button>
                                

                            </div>
                        </div>
                        

            </Grid>
        </Fragment>
            )
        }else{
            
        //if receive notes return the app     

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
                    <h2>Olá, {id.user.name}</h2>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={0}>
                            <Grid item xs={10}>

                                <TextField id="outlined-search" label="Buscar" type="search" onChange={(e) => setSearchQuery(e.target.value)}/>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton aria-label="search" type="submit" className="search-button">
                                    <SearchIcon />
                                </IconButton>
                                
                            </Grid>
                        </Grid>
                    </form>
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