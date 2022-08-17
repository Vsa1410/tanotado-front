import React, { Fragment } from "react";
import dayjs from 'dayjs'
import {Grid, Button, CardContent, Typography, Card, CardActions} from '@mui/material'

function NotesCard(props){
    return(
           <Fragment>

                
                    <Grid item xs={4} sx={{ minWidth: 320 }}>
                        

                        <Card >
                            <CardContent>
                                <Typography sx={{ fontSize: 20, minWidth:320 }} color="text.secondary" gutterBottom>
                                    {props.title}
                                </Typography>
                                
                                <Typography variant="body2">
                                    {(props.body).substring(0,40) + "..."}
                                                        
                                </Typography>
                                
                            </CardContent>
                            <CardActions className="date">
                                <Button size="small">Learn More</Button>
                                <Typography variant="caption text">
                                    {props.date}
                                                        
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>    
                
           </Fragment>     
    )
}

export default NotesCard