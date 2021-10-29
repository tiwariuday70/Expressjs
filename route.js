const express= require('express')

const students=require('./students')

const app=express()
app.use(express.json())



app.listen(3000, () => {
    console.log('Listening on port 3000 for routing');
})

app.get('/', (req, res) => {
    res.json({message: "This is api"})
  })

  
app.get('/api/students', function (req, res) {
    res.json(students)
  })



app.post('/api/students', (req, res) => {

    if(!req.body.email){
        res.status(400)
        return res.json({error:"email is  required......"})
    }
    // console.log(req.body);
    const user={
        id:students.name+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }

    students.push(user)
    // res.send("students post request")
    res.json(user)
  })


  app.put('/api/students/:id', function (req, res) {
      let id=req.params.id
      let first_name=req.body.first_name
      let last_name=req.body.last_name
      let email=req.body.emailid

      let index=students.findIndex((student)=>{
          return(student.id== Number.parseInt(id))
      })
      if (index>=0) {
          let std= students[index]
          std.last_name=last_name
          std.first_name=first_name
          std.email=email
          console.log(std)
          res.json(std)
      }
      else{
          res.status(404)
      }
  })

  





  app.delete('/api/students/:id', function (req, res) {
  let id= req.params.id;
  let index= students.findIndex((student) =>{
      return (student.id==Number.parseInt(id))


  })
  console.log(id, req.body,index);


  if (index>=0) {
      let std=students[index]
      students.splice(index, 1)
      res.json(std)
      
  }else{
      res.status(404)
      res.end()
  }



  })
