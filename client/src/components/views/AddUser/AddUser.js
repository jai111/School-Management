import React, {useReducer} from 'react'
import './AddUser.css'


const initialFormState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: ""
    };


let AddUser = () =>{

    const [formState, dispatch] = useReducer
    return (
        <div className="form_wrapper">
            <div className="form_container">
            <div className="title_container">
                <h2>Add User</h2>
            </div>
            <div className="row clearfix">
                <div className="">
                    <form>
                        <div className="input_field">
                            <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                            <input type="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="input_field">
                            <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                            <input type="password" name="password" placeholder="Password" required />
                        </div>
                        <div className="row clearfix">
                            <div className="col_half">
                                <div className="input_field">
                                    <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                    <input type="text" name="name" placeholder="First Name" />
                                </div>                                
                            </div>
                            <div className="col_half">
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                    <input type="text" name="name" placeholder="Last Name" required />
                                </div>
                            </div>
                        </div>
                        <div className="input_field select_option">
                            <select>
                                <option>Non-Teacher</option>
                                <option>Admin</option>
                                <option>Teacher</option>
                                <option>Student</option>
                            </select>
                            <div className="select_arrow"></div>
                        </div>
                        <input className="button" type="submit" value="Register" />
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AddUser;