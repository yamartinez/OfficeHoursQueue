const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

let OH = {
    Students: [],
    TAs: [],
}

app.post('/student/joinqueue', (req,res)=>{
    let body = req.body
    let ci = body.computing_id
    console.log(body)
    if(!OH.Students.includes(ci)){
        OH.Students.push(ci)
        res.status(200).end()
    } else {
        res.status(400).send("Student already in queue")
    }
    
})

app.post('/student/leave', (req,res)=>{
    let body = req.body
    let ci = body.computing_id

    let i = OH.Students.indexOf(ci)

    if(i > -1){
        OH.Students.splice(i,1)
        res.status(200).end()
    } else {
        res.status(400).send("Student not in queue")
    }
})

app.post('/ta/joinoh', (req,res)=>{
    let body = req.body
    let ci = body.computing_id
    if(!OH.TAs.includes(ci)){
        OH.TAs.push(ci)
        res.status(200).end()
    } else {
        res.status(400).send("TA already in oh")
    }
})

app.post('/ta/leave', (req,res)=>{
    let body = req.body
    let ci = body.computing_id

    let i = OH.TAs.indexOf(ci)

    if(i > -1){
        OH.TAs.splice(i,1)
        res.status(200).end()
    } else {
        res.status(400).send("TA not in OH")
    }
})

app.get('/ta/requeststudent', (req,res)=>{
    console.log(OH)
    const student = OH.Students.shift()
    console.log(student)
    res.send({student})
})

app.get('/ohstatus', (req,res)=>{
    res.send({TAsOnline:OH.TAs.length,StudentsOnline:OH.Students.length})
})

app.get('/student/mestatus', (req,res)=>{
    const ci = req.id
    if (!ci){
        res.status(400).send("Missing Computing ID")
        return
    }
    res.send({QueuePos:OH.Students.indexOf(ci)})
})

app.listen(80)