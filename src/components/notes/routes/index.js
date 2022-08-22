import axios from "axios"
import baseURL from "../../../services/api"


let userId = localStorage.getItem("user")
    let id = JSON.parse(userId)
    let token=id.token
const NotesService = {

    

    update:(id, params) => axios.put(`${baseURL}/notes/${id}`, params, {
    headers:{ "x-access-token" : token}})
}
export default NotesService