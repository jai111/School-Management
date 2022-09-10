
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import AcessDenied from '../components/views/AcessDenied/AcessDenied'

let Auth = (component, role) => {
    console.log('jerererer')
    let navigate = useNavigate()
    const [show, setShow] = useState(true)

    useEffect(()=>{
        axios.get("/api/users/auth")
        .then(response => {
            if(!response.data.isAuth){
                navigate("../login", { replace: true });
            }
            else{
                console.log(response.data)
                let user = JSON.parse(localStorage.getItem('user'))
                console.log(user.role)
                if(user.role != role){
                    setShow(false)
                }
            }
        })
    }, [])

    if(show){
        return component
    }
    return <AcessDenied/>
}

export default Auth