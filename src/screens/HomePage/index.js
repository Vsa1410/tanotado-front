import * as React from 'react'
import {Fragment} from 'react'
import Header from '../../components/Header'
import './indexHome.css'
import { Link } from 'react-router-dom'
import presentationImg from '../../assets/imgs/PngItem_938040.png'
import { Grid, Button } from '@mui/material'



const HomeScreen = ()=> (
    
    <div>

        
        <div className='background'>
            <div className='space'></div>
            <div className='information' >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
                    <Grid item xs={6} className='textGrid'>
                        
                    <div className='text'>
                        <h1>Create notes easily and access where do you want on the cloud</h1>
                        <p>Don't loose your notes anymore, access your notes everywhere and every time on your Smartphone or on your browser</p>
                    </div>
                    </Grid>

                    <Grid item xs={6} className="presentation-image">

                        <img src={presentationImg} alt='Use everywhere'/>
                    </Grid>
                </Grid>
            </div>
            <div className='space2'>
                <Button variant="contained" component={Link} to='/register'>Register for FREE now!</Button>
                <p>If do you already have an account:</p>
                <Button variant="outlined" color="inherit" component={Link} to='/login'>Sign in</Button>
            </div>
            
        </div>
    </div>


    
)


export default HomeScreen