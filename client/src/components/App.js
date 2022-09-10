
import {Routes, Route} from 'react-router-dom'
import { Suspense } from 'react';
import NavBar from "./views/NavBar/NavBar";
import AddUser from './views/AddUser/AddUser'
import LoginPage from "./views/LoginPage/LoginPage"

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <Routes>
          <Route path= "/register" element = {<AddUser/>} />
          <Route path = "/login" element = {<LoginPage/>}/>
        </Routes>
  </Suspense>
  );
}

export default App;
