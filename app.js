//define the route handlers
const express = require("express");
const app = express();

const {students} = require('./studentData.json');
//define our routes
//root path
app.get('/', (request, response) => {
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
    if(isNaN( Number(id))) throw new Error ("invalid id.");
    const student = students.find(el => el.id===id);
    if(student){
      response.json({data: student});
    }else {
      response.json({error: `No student with id of ${id}`});
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({error: error.message});
  }
});


module.exports = app;