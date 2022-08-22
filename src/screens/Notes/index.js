
import {useEffect, Fragment} from 'react'

import { useState } from "react";
import './index.css';
import * as React from 'react';
import Notes from "../../components/notes";







    

function NotesScreen (props){
    const [isOpen, setisOpen] = useState(false)  

    
    
    
    

   
      
  return(
    <Fragment>
     
      <Notes setisOpen={setisOpen} isOpes={isOpen}/>
    </Fragment>
  )
}
export default NotesScreen



