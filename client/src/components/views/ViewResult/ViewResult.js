import React, { useEffect, useState} from 'react'
import axios from 'axios'
import './ViewResult.css'

let ViewResult = (props) =>{

    const [message, setMessage] = useState('')
    const [marks, setMarks] =useState('')
    const [semester, setSemester] = useState()
    const [percentage, setPercentage] = useState()
    

    const handleTextChange = (e) => {
        setSemester(e.target.value)
    }

    let handleSubmit = () =>{
        
        axios.get('/api/students/getmarks')
        .then(response =>{
            if(response.data.success){
                setMessage('')
                setMarks(response.data.marks)
            }
            else{
                setMessage(response.data.message)
                setMarks([])
            }
        })
        .catch((err)=>setMessage('Error occured please try again'))
    }
    let user = JSON.parse(localStorage.getItem('user'))
    var name = `${user.firstname} ${user.lastname}`
    
    let calculatePercentage = () =>{

        let subjects = ['maths', 'science', 'social', 'hindi', 'english']
        var percentage = {}
        for ( let subject =0; subject < subjects.length; subject++){
            let semester1 = marks['semester1'][subjects[subject]] ? marks['semester1'][subjects[subject]] : 0
            let semester2 = marks['semester2'][subjects[subject]] ? marks['semester2'][subjects[subject]] : 0
            let midterm1 = marks['midterm1'][subjects[subject]] ? marks['midterm1'][subjects[subject]] : 0
            let midterm2 = marks['midterm2'][subjects[subject]] ? marks['midterm2'][subjects[subject]] : 0
            let midtermPercentage
            if(midterm1 > midterm2){
                midtermPercentage = midterm1*0.3 + midterm2 * 0.1
            } 
            else{
                midtermPercentage = midterm2*0.3 + midterm1 * 0.1
            }
            let semesterPercentage = ((semester1 + semester2)/2)*0.6
            percentage[subjects[subject]] = midtermPercentage + semesterPercentage

        }
        setPercentage(percentage)
    }

    useEffect(() =>{
        if(marks && Object.keys(marks['semester2']).length!==0){
            calculatePercentage()
        }    
    }, [marks])
    

    return (
        <>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>View Result</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="">
                            <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{message}</div>
                            <form >
                                    <div className="input_field select_option">
                                        <select name='grade'  value={semester} onChange={(e)=>handleTextChange(e)} required>
                                            <option value="" disabled selected>Semester</option>
                                            <option value='midterm1'>Mid Term1</option>
                                            <option value='semester1'>Semester1</option>
                                            <option value='midterm2'>Mid Term2</option>
                                            <option value='semester2'>Semester2</option>
                                        </select>
                                        <div className="select_arrow"></div>
                                    </div>
                                <input className="button" type="button" value="Find" onClick={handleSubmit}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {
                marks!=='' &&  <div className='container'>
                            <h2>{  `Marks for ${semester}`}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Maths</th>
                                        <th>Science</th>
                                        <th>Social</th>
                                        <th>Hindi</th>
                                        <th>English</th>
                                    </tr>
                                </thead>
                               { Object.keys(marks[semester]).length!==0 && <tbody>
                                    <td>{name}</td>
                                    <td>{marks[semester]['maths']}</td>
                                    <td>{marks[semester]['science']}</td>
                                    <td>{marks[semester]['social']}</td>
                                    <td>{marks[semester]['hindi']}</td>
                                    <td>{marks[semester]['english']}</td>
                                    
                                </tbody>
                                } 
                            </table>
                            {
                                    Object.keys(marks[semester]).length === 0 && 
                                    <div style = {{color: 'red', textAlign:'center', marginTop:'50px'}}><h3>No result to Show</h3></div>
                            }
                            <div style = {{marginTop: '10px', fontSize: '20px33'}}>
                                {
                                    Object.keys(marks['semester2']).length!==0 && <div>
                                        <div style = {{textAlign: 'center'}}><h2>Annual Percentage:</h2></div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Maths</th>
                                                    <th>Science</th>
                                                    <th>Social</th>
                                                    <th>Hindi</th>
                                                    <th>English</th>
                                                </tr>
                                            </thead>
                                            
                                           { percentage && <tbody>
                                                    <td>{name}</td>
                                                    <td>{percentage['maths']}</td>
                                                    <td>{percentage['science']}</td>
                                                    <td>{percentage['social']}</td>
                                                    <td>{percentage['hindi']}</td>
                                                    <td>{percentage['english']}</td>
                                                        
                                            </tbody>}
                                            
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
            
            }
      
        </>
    )
}

export default ViewResult;