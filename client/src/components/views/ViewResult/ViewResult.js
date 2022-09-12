import React, { useState} from 'react'
import axios from 'axios'
import './ViewResult.css'

let ViewResult = (props) =>{

    const [message, setMessage] = useState('')
    const [marks, setMarks] =useState('')
    const [semester, setSemester] = useState()
    

    const handleTextChange = (e) => {
        setSemester(e.target.value)
    }

    let handleSubmit = () =>{
        
        axios.get('/api/students/getmarks')
        .then(response =>{
            if(response.data.success){
                console.log(response.data.marks)
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
        let semester1 =  Object.values(marks['semester1']).reduce((a, b) => a + b);
        let semester2 =  Object.values(marks['semester2']).reduce((a, b) => a + b);
        let midterm1 =  Object.values(marks['midterm1']).reduce((a, b) => a + b);
        let midterm2 =  Object.values(marks['midterm2']).reduce((a, b) => a + b);

        console.log(semester1, semester2, midterm1, midterm2)
        let midtermPercentage 
        if(midterm1 > midterm2){
            midtermPercentage = midterm1*0.3 + midterm2 * 0.1
        } 
        else{
            midtermPercentage = midterm2*0.3 + midterm1 * 0.1
        }
        let semesterPercentage = ((semester1 + semester2)/2)*0.6
        console.log(midtermPercentage, semesterPercentage)

        return midtermPercentage + semesterPercentage
    }

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
                            <h2></h2>
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
                                    
                                </tbody>}
                            </table>
                            <div style = {{marginTop: '10px', fontSize: '20px33'}}>
                                {
                                    Object.keys(marks['semester2']).length!==0 && <div>
                                        Annual Percentage: {calculatePercentage()}
                                    </div>
                                }
                            </div>
                        </div>
            
            }
            
                    {/* <tbody>
                    <tr>
                        <td>01</td>
                        <td>Ali</td>
                        <td>86</td>
                        <td>77</td>
                        <td>87</td>
                        <td>92</td>
                        <td>95</td>
                    </tr>
                    </tbody> */}
      
        </>
    )
}

export default ViewResult;