
import {Routes, Route} from 'react-router-dom'
import { Suspense } from 'react';
import NavBar from "./views/NavBar/NavBar";
import AddUser from './views/AddUser/AddUser'
import LoginPage from "./views/LoginPage/LoginPage"
import Auth from "../HOC/auth"
import LandingPage from "./views/LandingPage"
import ModifyUser from './views/ModifyUser/ModifyUser';
import DeleteUser from './views/DeleteUser/DeleteUser';
import StudentList from './views/StudentList/StudentList';
import AssginStudent from './views/AssginStudent/AssginStudent';
import EditMarks from './views/EditMarks/EditMarks';
import ViewResult from './views/ViewResult/ViewResult';
import ForgotPassword from './views/ForgotPassword/ForgotPassword';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <Routes>
          <Route path="/" element = {<LandingPage/>}/>
          <Route path= "/adduser" element = {Auth(<AddUser/>,['admin'])} />
          <Route path = "/login" element = {<LoginPage/>}/>
          <Route path = "/forgotpassword" element = {<ForgotPassword/>}/>
          <Route path= "/modifyuser" element = {Auth(<ModifyUser/>,['admin'])} />
          <Route path= "/deleteuser" element = {Auth(<DeleteUser/>,['admin'])} />
          <Route path= "/studentlist" element = {Auth(<StudentList/>,['teacher', 'non-teacher'])} />
          <Route path= "/assgin/:id" element = {Auth(<AssginStudent/>,['non-teacher'])} />
          <Route path= "/editmarks/:id" element = {Auth(<EditMarks/>,['teacher'])} />
          <Route path= "/viewresult" element = {Auth(<ViewResult/>,['student'])} />
        </Routes>
  </Suspense>
  );
}

export default App;
