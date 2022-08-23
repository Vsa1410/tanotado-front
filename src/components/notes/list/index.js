import React, { Fragment } from "react";
import { List, FixedSizeList, ListItemButton, ListItemText, Typography,Grid, Button, ListItem } from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import baseURL from "../../../services/api";
import DeleteIcon from '@mui/icons-material/Delete';

        
function ListNotes(props) {
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
   
    
    
        return (
        <Fragment>
            <div className="lateral-top">
                <h4>
                    {props.notes.length} Notes
                </h4>
                <Button variant="contained" onClick={props.createNote} className="new-note-button">New Note</Button>
            </div>
            <List className="notes-list">
                {props.notes.map((item, key)=>
                    <ListItem className="list-itens">

                        <button key={key} onClick={()=> props.selectNote(item._id)} className="list-button">
                            <h3>
                                {item.title.replace(/(<([^>]+)>)/ig, "").substring(0,20)+"..."}
                            </h3>
                            <Typography variant="body2">
                                {item.body.replace(/(<([^>]+)>)/ig, "").substring(0,30)}
                            </Typography>
                            <Typography variant="caption">

                                {dayjs(item.created_at).format('DD/MM/YYYY hh:mm')}
                            </Typography>
                            

                            

                        </button>
                        <DeleteIcon onClick={()=> props.deleteNote(item)}/>
                    </ListItem>
                )}
            </List>
        </Fragment>




        )} 
    export default ListNotes;

           
 