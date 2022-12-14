import React, { useEffect, Fragment, useState } from 'react'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import Notes from '../../../components/notes';
import '../index.css'

function Editor(props){
    const[currentContent, setCurrentContent] = useState('')
    const [timer, setTimer] = useState(null)
    const updateNote = (content) => {
         const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 15);
         props.updateNote(props.note, {'title': title, 'body': content, 'updated_at': Date.now()})
        
       }


    useEffect(()=>{
        setCurrentContent(props.note.body)

    },[props.note])

    const handleChange = (content, delta, source) =>{
         clearTimeout(timer);
         if(source == 'user'){
           setCurrentContent(content)
           setTimer(setTimeout(() => updateNote(content), 3000))}}

    const modules = {
           toolbar: [
             [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
             ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
             [{'list': 'ordered'}, {'list': 'bullet'},
              {'indent': '-1'}, {'indent': '+1'}],
             ['link'],
             ['clean'],
           ]
         }
    return(
        <Fragment >
            <div className="editor">

                <ReactQuill value={currentContent} onChange={handleChange} modules={modules}/>
            </div>

            
        </Fragment>
    )
}
export default Editor