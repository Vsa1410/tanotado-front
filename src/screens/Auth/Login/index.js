import React, { useState, useContext } from "react";
import { TextField, Button, Paper } from "@mui/material";
import '../Login/index.css'
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import baseURL from "../../../services/api";

export let token = ""

function getToken(){
    let userId = localStorage.getItem("user")
    let id = JSON.parse(userId)
    token=id.token
}







function Login(){
    
    //information from login form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [sucess, setSucess] = useState(false)
    const [redirectToRegister, setRedirectToRegister]=useState(false);
    const [error,setError]= useState(false)
    
    
    
    async function handleSubmit(event){
        event.preventDefault()
    
        axios
        .post(`${baseURL}/users/login`, {
            email: email,
            password: password
        })
        .then((response)=> {
            console.log(response.data)
            const jsonResp = JSON.stringify(response.data)
            localStorage.setItem("user", jsonResp)

            getToken()
           
            
            
            setSucess(true) //auth to navigate to Notes page
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    if(sucess === true){
        return <Navigate to='/notesscreen' replace={true}/>
    }



    return(
        <div className="body">
            <Paper  className="login-table" elevation={6}>
                
                <div>
                    <h4>Sign In with your Email and your Password</h4>
                    <form onSubmit={handleSubmit()}>
                        <div className="name">
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                onChange={e => setEmail(e.target.value)}
                            />

                        </div>
                        <div >
                            <TextField
                                required
                                id="outlined-required"
                                label="Password"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />

                        </div>
                        <Button variant="contained" onClick={(event)=> handleSubmit(event)}  color="primary">
                        Sign In
                        </Button>
                        <h5> Do you want to Register?</h5>
                        <Button variant="contained" component={Link} to='/register' color="warning">
                        Sign Up
                        </Button>
                    </form>
                </div>

                <div className="space-login">
                    
                </div>
            </Paper>
        </div>
    )
}
export default Login