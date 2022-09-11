
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom'

let LandingPage = () => {

    let navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate("../login", { replace: true });
            return 
         }
     
         let user = JSON.parse(localStorage.getItem('user'))
         if(user.role == 'admin')  navigate("../adduser", { replace: true });
         if(user.role == 'non-teacher'|| user.role == 'teacher')  navigate("../studentlist", { replace: true });
         if(user.role == 'student')  navigate("../viewresult", { replace: true });
    })
}

export default LandingPage