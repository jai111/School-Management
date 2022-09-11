import React, {useReducer, useState} from 'react'
import './DeleteUser.css'
import { FaEnvelope, FaLock } from "react-icons/fa"
import axios from 'axios'

const initialFormState = {
    email: ""
    };


let DeleteUser = (props) =>{

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
        if(!validateEmail(form.email)){
            setMessage('Enter valid email')
            return false
        }
        return true
    }

    let handleSubmit = () =>{
        if(!Validate(formState)){
            return
        }
        setIsSubmiting(true)
        axios.post('/api/users/deleteuser', formState)
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
        .catch(err=> {
            setMessage('Check your email')
            setTimeout(() => {
                setMessage("")
              }, 3000);
        })
        setIsSubmiting(false)
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
                <h2>Delete User</h2>
            </div>
            <div className="row clearfix">
                <div className="">
                    <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{message}</div>
                    <div style={{color: 'green', textAlign: 'center', marginBottom: '10px'}}>{successMessage}</div>
                    <form >
                        <div className="input_field">
                            <span><FaEnvelope style={{marginTop:'8px'}}/></span>
                            <input type="email" name="email" placeholder="Email" value={formState.email}  onChange={(e)=>handleTextChange(e)} required />
                        </div>
                        <input className="button" type="button" value="Delete" disabled={isSubmiting} onClick={handleSubmit}  />
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default DeleteUser;