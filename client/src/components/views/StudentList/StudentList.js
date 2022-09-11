import React, { useState} from 'react'
import './StudentList.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

let StudentList = (props) =>{

    const [grade, setGrade] = useState()
    const [message, setMessage] = useState('')
    const [students, setStudents] =useState([])

    const handleTextChange = (e) => {
        setGrade(e.target.value)
    }

    let handleSubmit = () =>{
        
        axios.get(`/api/students/findstudents/${grade}`)
        .then(response =>{
            if(response.data.success){
                setMessage('')
                setStudents(response.data.students)
            }
            else{
                setMessage(response.data.message)
                setStudents([])
            }
        })
        .catch((err)=>setMessage('Error occured please try again'))
    }


    return (
        <>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>Find Students</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="">
                            <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{message}</div>
                            <form >
                                    <div className="input_field select_option">
                                        <select name='grade'  value={grade} onChange={(e)=>handleTextChange(e)} required>
                                            <option value="" disabled selected>Grade</option>
                                            <option value={6}>6th</option>
                                            <option value={7}>7th</option>
                                            <option value={8}>8th</option>
                                            <option value={9}>9th</option>
                                            <option value={10}>10th</option>
                                        </select>
                                        <div className="select_arrow"></div>
                                    </div>
                                <input className="button" type="button" value="Find" onClick={handleSubmit}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {students.length && <div className='list_wrapper'>
                <main>
                    {
                        students.map((student, ind) => {
                            let api = JSON.parse(localStorage.getItem('user')).role == 'non-teacher' ? `/assgin/${student._id}` : `/editmarks/${student._id}`
                            return(
                                <React.Fragment key={ind}>
                                    <Link to={api}>
                                        <article>
                                            <div>
                                            <div style = {{textAlign: 'center', marginBottom: '2px'}}>
                                                {`${student.user_id.firstname} ${student.user_id.lastname}`}
                                            </div>
                                            <div style = {{textAlign: 'center'}}>
                                                {student.user_id.email}
                                            </div>
                                            </div>
                                        </article>
                                     </Link>
                                </React.Fragment>
                            )
                        })
                    }
                </main>
            </div>}
        </>
    )
}

export default StudentList;