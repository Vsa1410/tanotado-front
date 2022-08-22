import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {
    let userId = localStorage.getItem("user")
    if (!userId){
        return <Navigate to="/login" exact/>
    }
    let id = JSON.parse(userId)
    let token=id.token

   

  
    return(
        token ? <Outlet/> : <Navigate to="/login" exact/>

       
    )
} 
export default PrivateRoutes