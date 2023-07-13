//define the route handlers
const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
const {students} = require('./studentData.json');
//define our routes
//root path
app.get('/', (request, response) => {
  console.log(request.socket.remoteAddress)
  response.status(200).json({ data: "Service is running!" });
})

// get /students
app.get('/students', (request, response) => {
  try {
    response.json({data: students});
  } catch (error) {
    console.error(error);
    response.status(500).json({"error": error.message});
  }
});

app.get('/student/:id', (request, response) => {
  try {
    const {id} = request.params;
    //test the user input
    if(isNaN( Number(id))) throw new Error ("invalid id.");
    //find the student info
    const student = students.find(el => el.id===id);
    //
    if(student){
      response.json({data: student});
    }else {
      response.status(404).json({error: `No student with id of ${id}`});
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({error: error.message});
  }
});

app.get('*', (request, response) => {
  response.status(404).send("Page not found.");
})

module.exports = app;