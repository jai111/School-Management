import React, {useReducer, useState} from 'react'
import './ModifyUser.css'
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa"
import axios from 'axios'
    import { useNavigate} from 'react-router-dom'

const initialFormState = {
};


let ModifyUser = (props) =>{

    let navigate = useNavigate()

    const formReducer = (state, action) => {
        switch(action.type){
            case "HANDLE_INPUT_TEXT":
                return {
                        ...state,
                        [action.field]: action.payload,
                }
            default:
                return state;
        }
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    let Validate = (form)=>{
        if(!validateEmail(form.oldemail)){
            setMessage('Enter valid Old email')
            setSuccessMessage('')
            return false
        }
        if(!form.email){
            return true
        }
        if(!validateEmail(form.email)){
            setMessage('Enter valid email')
            setSuccessMessage('')
            return false
        }
        return true
    }

    let handleSubmit = () =>{
        if(!Validate(formState)){
            return
        }
        axios.post('/api/users/modifyuser', formState)
        .then(response => {
            if(response.data.success){
                    setSuccessMessage(response.data.message)
                    setMessage('')
            }
            else{
                setMessage(response.data.message)
                setSuccessMessage('')
            }
        })
        .catch(err=> alert(err))
    }

    const [formState, dispatch] = useReducer(formReducer, initialFormState)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [message, setMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleTextChange = (e) => {
        dispatch(
            {
                type: 'HANDLE_INPUT_TEXT',
                field: e.target.name,
                payload: e.target.value,
            }
        )
    }
    return (
        <div className="form_wrapper">
            <div className="form_container">
            <div className="title_container">
                <h2>Modify User</h2>
            </div>
            <div className="row clearfix">
                <div className="">
                    <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{message}</div>
                    <div style={{color: 'green', textAlign: 'center', marginBottom: '10px'}}>{successMessage}</div>
                    <form >
                        <div className="input_field">
                            <span><FaEnvelope style={{marginTop:'8px'}}/></span>
                            <input type="email" name="oldemail" placeholder="Old Email*" value={formState.oldemail}  onChange={(e)=>handleTextChange(e)} required />
                        </div>
                        <div className="input_field">
                            <span><FaEnvelope style={{marginTop:'8px'}}/></span>
                            <input type="email" name="email" placeholder="New Email" value={formState.email}  onChange={(e)=>handleTextChange(e)} required />
                        </div>
                        <div className="row clearfix">
                            <div className="col_half">
                                <div className="input_field">
                                    <span><FaUserAlt style={{marginTop:'8px'}}/></span>
                                    <input type="text" name="firstname" placeholder="First Name" value={formState.firstname}  onChange={(e)=>handleTextChange(e)} required />
                                </div>                                
                            </div>
                            <div className="col_half">
                                <div className="input_field"> <span><FaUserAlt style={{marginTop:'8px'}}/></span>
                                    <input type="text" name="lastname" placeholder="Last Name" value={formState.lastname}  onChange={(e)=>handleTextChange(e)}  />
                                </div>
                            </div>
                        </div>
                        <div className="input_field select_option">
                            <select name='role' value={formState.role}  onChange={(e)=>handleTextChange(e)} required>
                                <option value="" disabled selected>Role</option>
                                <option value='non-teacher'>Non-Teacher</option>
                                <option value='teacher'>Teacher</option>
                                <option value='student'>Student</option>
                            </select>
                            <div className="select_arrow"></div>
                        </div>
                        {
                            formState.role == 'student'
                            ?
                            <div className="input_field select_option">
                                <select name='grade' value={formState.grade}  onChange={(e)=>handleTextChange(e)} required>
                                    <option value="" disabled selected>Grade</option>
                                    <option value={6}>6th</option>
                                    <option value={7}>7th</option>
                                    <option value={8}>8th</option>
                                    <option value={9}>9th</option>
                                    <option value={10}>10th</option>
                                </select>
                                <div className="select_arrow"></div>
                            </div>
                            :
                            null
                        }
                         {
                            formState.role == 'teacher'
                            ?
                            <div className="input_field select_option">
                                <select name='subject' value={formState.subject}  onChange={(e)=>handleTextChange(e)} required>
                                    <option value="" disabled selected>Subject</option>
                                    <option value='maths'>Maths</option>
                                    <option value='science'>Science</option>
                                    <option value='social'>Social</option>
                                    <option value='english'>English</option>
                                    <option value='hindi'>Hindi</option>
                                </select>
                                <div className="select_arrow"></div>
                            </div>
                            :
                            null
                        }
                        <input className="button" type="button" value="Update" disabled={isSubmiting} onClick={handleSubmit}  />
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ModifyUser;