const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aj1182014',
    database: 'schooldatabase',
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/api/get', (req,res)=>{
    const sqlSelect = "SELECT s.student_id, s.first_name, s.last_name, s.email, c.course_name FROM students s INNER JOIN course c ON c.course_id = s.course_id"
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    })
})


app.post('/api/insert', (req, res)=>{

    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const course_id = req.body.course_id
    
    const course_idInt = Number(course_id)

    const sqlInsert = "INSERT INTO students (first_name, last_name, email, course_id) VALUES (?,?,?,?)"
    db.query(sqlInsert, [first_name,last_name,email,course_idInt], (err, result)=>{
        console.log(err)
    })
})



app.delete('/api/delete/:student_id', (req,res)=>{
    const student_id = req.params.student_id
    const sqlDelete = "DELETE FROM students WHERE student_id = ?"
    db.query(sqlDelete, student_id, (err, result)=>{
        console.log(err)
    })
})

app.put('/api/update/:student_id', (req,res)=>{
    const student_id = req.params.student_id
    const {first_name, last_name, email, course_id} = req.body;
    const course_idInt = Number(course_id)
    const sqlUpdate = `UPDATE students SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', course_id = '${course_idInt}' WHERE student_id = '${student_id}'`
    db.query(sqlUpdate, (err, result)=>{
        console.log(err)
    })
})

app.listen(3001, () => {
    console.log("Running on port 3001")
});