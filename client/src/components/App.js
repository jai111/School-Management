
import {Routes, Route} from 'react-router-dom'
import { Suspense } from 'react';
import NavBar from "./views/NavBar/NavBar";
import AddUser from './views/AddUser/AddUser'

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <Routes>
            <Route path="/" element = {<AddUser/>} />
            {/* <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} /> */}
        </Routes>
  </Suspense>
  );
}

export default App;
