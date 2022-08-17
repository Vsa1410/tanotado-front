import { Container } from "@mui/system";
import React from "react";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import MyEditor from "./note";
import EditorComponent from "./note";
import NoteText from "./note";
import RichEditorExample from "./note/richEditor";

function NewNote(){
    return(
        <Container>
            <h2>New Note</h2>
            <NoteText/>
            <RichEditorExample/>
        </Container>

    )
}
export default NewNote