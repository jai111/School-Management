
import axios from 'axios'
import React, { useEffect, useState, useReducer } from 'react'
import {useParams} from 'react-router-dom'
import './AssginStudent.css'

const initialFormState = {

    };


let AssginStudent = () => {

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

    const [data, setData] = useState([])
    const [message, setMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    
    let subjects = ['english', 'hindi', 'maths', 'social', 'science']

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

    useEffect(()=>{
        axios.get('/api/teachers/findteachers')
        .then(response =>{
            setData(response.data.teachers)
        })
    }, [])

    let handleSubmit = () =>{
        
        axios.post(`/api/students/updateteachers/${id}`, Object.values(formState))
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
                <h2>Assgin</h2>
            </div>
            <div className="row clearfix">
                <div className="">
                    <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{message}</div>
                    <div style={{color: 'green', textAlign: 'center', marginBottom: '10px'}}>{successMessage}</div>
                    <form >
                        <div className="input_field select_option">
                            {
                                subjects.map( (subject, ind) =>{
                                    return (
                                        <React.Fragment key={ind}>
                                            <select name={subject} className='clasic'  style={{height:'50px', marginBottom:'10px'}} onChange={(e)=>handleTextChange(e)} required>
                                                <option value="" disabled selected>{subject}</option>
                                                {
                                                    data[subject] && data[subject].map((teacher, id) =>{
                                                        return(
                                                            <React.Fragment key={id}>
                                                                <option value={teacher._id}>{`${teacher.firstname} ${teacher.lastname}`}</option>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <div className="arrow"></div>
                                            
                                        </React.Fragment>
                                    )
                                })
                            }
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

export default AssginStudent