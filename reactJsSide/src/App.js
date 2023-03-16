import React,{useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [course_id, setCourseId] = useState("")
  
  const [studentsList, setStudentsList] = useState([])

  const [newFirst_name, setNewFirstName] = useState("")
  const [newLast_name, setNewLastName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newCourse_id, setNewCourseId] = useState("")


  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) =>{
      setStudentsList(response.data)
    })
  }, [])


  const submitInfo = () => {
    Axios.post('http://localhost:3001/api/insert', {
      first_name: first_name,
      last_name: last_name,
      email: email,
      course_id: course_id
    })

    window.location.reload();
    
  }

  const deleteStudent = (student_id) =>{
    Axios.delete(`http://localhost:3001/api/delete/${student_id}`);
    window.location.reload();
  }

  const updateStudent = (student_id) =>{
    Axios.put(`http://localhost:3001/api/update/${student_id}`, {
      first_name: newFirst_name,
      last_name: newLast_name,
      email: newEmail,
      course_id: newCourse_id
    });
    window.location.reload();
  }

  

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className='form'>

        <label for="first_name">First Name</label>
        <input type="text" name="first_name" onChange={(e) => {
          setFirstName(e.target.value)
        }}/>

        <label for="last_name">Last Name</label>
        <input type="text" name="last_name" onChange={(e) => {
          setLastName(e.target.value)
        }} />

        <label for="email_name">Email</label>
        <input type="text" name="email" onChange={(e) => {
          setEmail(e.target.value)
        }}/>

        <select name='course_id' onChange={(e) => {
          setCourseId(e.target.value)
        }}>
          <option value="" selected hidden disabled>Select Course</option>
          <option value="1">Full-Stack Development</option>
          <option value="2">Front-End Development</option>
          <option value="3">Back-End Development</option>
        </select>

        <button onClick={submitInfo}>Submit</button>

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
          {studentsList.map((val)=> {
            return<tr>
              <td>
                {val.first_name}<br></br>
                <input type ="text" defaultValue={val.first_name} onChange={(e) => {
                  setNewFirstName(e.target.value)
                }}/>
              </td>

              <td>
                {val.last_name}<br></br>
                <input type ="text" defaultValue={val.last_name} onChange={(e) => {
                  setNewLastName(e.target.value)
                }}/>
              </td>

              <td>
                {val.email}<br></br>
                <input type ="text" defaultValue={val.email} onChange={(e) => {
                  setNewEmail(e.target.value)
                }}/>
              </td>

              <td>
                {val.course_name}<br></br>
                <select name='newCourse_id' onChange={(e) => {
                    setNewCourseId(e.target.value)
                  }}>
                    <option value="" selected hidden disabled>Select Course</option>
                    <option value="1">Full-Stack Development</option>
                    <option value="2">Front-End Development</option>
                    <option value="3">Back-End Development</option>
                </select>
              </td>

              <td>
                <button onClick={()=>{deleteStudent(val.student_id)}}>Delete</button>
              </td>

              <td>
                <button onClick={()=>{updateStudent(val.student_id)}}>Update</button>
              </td>

            </tr>
          })}
          </tbody>
          
        </table>
        

      </div>
    </div>
  );
}

export default App;
