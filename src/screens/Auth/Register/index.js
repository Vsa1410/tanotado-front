import React, { useState } from "react";
import { TextField, Button,Grid, Paper} from "@mui/material";
import '../Login/index.css'
import {Link, Navigate} from 'react-router-dom'
import Header from "../../../components/Header";
import axios from "axios";
import baseURL from "../../../services/api";






function Register(){
    const [name, setName] = useState("");
    const [ email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);
    
    async function handleSubmit(e){
        
        e.preventDefault();
        
        
        axios
        .post(`${baseURL}/users/register`,{
            name: name,
            email: email.toLowerCase(), 
            password: password
            })
            
        .then((response)=> {
            console.log("Registrado com sucesso")
            setRedirectToLogin(true)
            
        })
        .catch((err)=>{
            console.log(err)
            setError(true)
        })
        
    }

    if(redirectToLogin === true){
        return <Navigate  to="/login" replace={true} />
        
    }
        
        
        return(
        <div className="body">
            <Paper className="login-table" elevation={6}>

                <Grid item xs={4}>
        
    
                    

                        <h4>Please register to use the features of the App</h4>
                        <form onSubmit={handleSubmit()}>
                            <div className="name">

                                <TextField
                                className="name"
                                required
                                id="outlined-required"
                                label="Name"
                                type="text"
                                onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="name">
                                
                                <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="name">
                                
                                <TextField
                                className="name"
                                required
                                id="outlined-required"
                                label="Password"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                                <Button variant="contained" onClick={(event)=>handleSubmit(event)}  color="warning">Send</Button>
                                
                                <h5> Already registered?</h5>
                                <Button variant="contained" component={Link} to='/login' color="primary">
                                 Sign In
                                </Button>
                            
                        </form>
                    
                </Grid>
            </Paper>
            
        </div>
    )
}
export default Register