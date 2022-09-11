
import './NavBar.css'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'

const NavBar = () => {

    let navigate = useNavigate()

    let logoutHandler = ()=>{
        axios.get('/api/users/logout')
        .then( response =>{
            if(response.status == 200){
                localStorage.setItem('user', '')
                navigate("../login", { replace: true });
            }
            else{
                alert('logout failed')
            }
        })
    }
    let role
    if(localStorage.getItem('user')){
        role = JSON.parse(localStorage.getItem('user')).role
    }
    
    return(
        <header className='navbar'>
            <div className='navbar__title navbar__item'>SchoolManagement</div>
            {role == 'admin' ? <Link to = "/adduser"><div className='navbar__title navbar__item'>addUser</div></Link> : null}
            {role == 'admin' ? <Link to = "/modifyuser"><div className='navbar__title navbar__item'>modifyUser</div></Link> : null}
            {role == 'admin' ? <Link to = "/deleteuser"><div className='navbar__title navbar__item'>deleteUser</div></Link> : null}
            {role ? <Link to = "/forgotpassword"><div className='navbar__title navbar__item'>Change Password</div></Link> : null}
            {
                localStorage.getItem('user')
                ?
                <a className='btn' onClick={logoutHandler}>LogOut</a>        
                :
                null
            }
        </header>
    )
}

export default NavBar;
