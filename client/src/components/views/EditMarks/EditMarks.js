
import axios from 'axios'
import React, { useEffect, useState, useReducer } from 'react'
import {useParams} from 'react-router-dom'

const initialFormState = {}


let EditMarks = () => {

    let {id} = useParams()

    const handleTextChange = (e) => {
        dispatch(
            {
                type: 'HANDLE_INPUT_TEXT',
                field: e.target.name,
                payload: e.target.value,
            }
        )
    }
    
    const [message, setMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    

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

    const [formState, dispatch] = useReducer(formReducer, initialFormState)

    let Validate = (form)=>{
        
        if(!form.semester){
            setMessage('Select Semester')
            return false
        }

        if(!form.marks || isNaN(form.marks)){
            setMessage('Enter marks as number')
            return false
        }
        if(!isNaN(form.marks)){
            if(form.semester == 'midterm1' || form.semester == 'midterm2'){
                if(form.marks>25){
                    setMessage('Marks Should be below 25 for mid terms')
                    return false
                }
            }
            else{
                if(form.marks > 75){
                    setMessage('Marks Should be below 75 for semesters')
                    return false
                }
            }
        }

        return true
    }

    let handleSubmit = () =>{
        setMessage('')
        setSuccessMessage('')

        if(!Validate(formState)){
            return
        }
        axios.post(`/api/students/updatemarks/${id}`, formState)
        .then(response =>{
            if(response.data.success){
                setSuccessMessage(response.data.message)
            }
            else{
                setMessage(response.data.message)
            }
        })
        .catch(err => alert(err))
    }

    return(
        <div>
            <div className="form_wrapper">
            <div className="form_container">
            <div className="title_container">
                <h2>Assgin Marks</h2>
            </div>
            <div className="row clearfix">
                <div className="">
                    <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{message}</div>
                    <div style={{color: 'green', textAlign: 'center', marginBottom: '10px'}}>{successMessage}</div>
                    <form >
                        <div className="input_field select_option">
                                <select name='semester' value={formState.subject}  onChange={(e)=>handleTextChange(e)} required>
                                    <option value="" disabled selected>Semester</option>
                                    <option value='midterm1'>Mid Term1</option>
                                    <option value='semester1'>Semester1</option>
                                    <option value='midterm2'>Mid Term2</option>
                                    <option value='semester2'>Semester2</option>
                                </select>
                                <div className="select_arrow"></div>
                        </div>
                        <div className="input_field">
                            <input type="email" name="marks" placeholder="Marks" value={formState.email}  onChange={(e)=>handleTextChange(e)} required />
                        </div>
                        <input className="button" type="button" value="Assgin" onClick={handleSubmit} />
                    </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default EditMarks