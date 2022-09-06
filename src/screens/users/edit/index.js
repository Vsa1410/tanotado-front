import { Box,  } from "@mui/system";
import React, { useEffect } from "react";
import {Typography, Grid,TextField } from "@mui/material"
import {useState} from 'react'


function UserEdit(){
    const [tokenInfo, setTokenInfo] = useState("")

    function getToken(){
        let userId = localStorage.getItem("user")
        let id = JSON.parse(userId)
        let user = id.user
        setTokenInfo(user)
       
        
        
    }
    
    useEffect(()=>{

        getToken()
        

    },[])

    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState(tokenInfo.name)
    console.log(tokenInfo.name)



    async function handleSubmit(){

    }
    return (

        <Box>
            <div className="space">

            </div>
            <Typography variant="h4"> Editar</Typography>
            <Grid container spacing={1}>
                <Grid item>
                    <TextField id="outlined-basic" value={userName} label="Nome" variant="outlined" onChange={(e)=> setUserName(e.target.value)} />    
                    
                    <TextField id="outlined-basic" value={userName} label="Email" variant="outlined" />  

                    <TextField
                                required
                                id="outlined-required"
                                label="Password"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                </Grid>

            </Grid>
        </Box>
    )
}
export default UserEdit