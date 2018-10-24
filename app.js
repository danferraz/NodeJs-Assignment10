// require and instantiate express
//require statements -- this adds external modules from node_modules or our own defined modules
const http = require('http');
const path = require('path');
//express related
const Express = require('express');
const bodyParser = require('body-parser');

//express is the routing engine most commonly used with nodejs
var express = Express();
var server = http.createServer(express);

//tell the express router where to find static files
express.use(Express.static(path.resolve(__dirname, 'views')));

//tell the router to parse urlencoded data and JSON data for us and put it into req.query/req.body
express.use(bodyParser.urlencoded({ extended: true }));
express.use(bodyParser.json());

//set up the HTTP server and start it running
server.listen(process.env.PORT || 3030, process.env.IP || '0.0.0.0', function() {
    var addr = server.address();
    console.log('Server listening at', addr.address + ':' + addr.port);
});

// Employee details to simulate
const EMPLOYEES = [
  {
    IdNumber: 'WD10103',
    Name: 'Mr. Jonathan Banks',
    Department: 'Developer',
    Position: 'Web programmer',
    Duties: 'Design and create websites.'
  },
  {
    IdNumber: 'BD23719',
    Name: 'Mr. Dean Norris',
    Department: 'Big Data',
    Position: 'Database administrator',
    Duties: 'Keep data organized and accessible to people who need it.'
  },
  {
    IdNumber: 'ITN37190',
    Name: 'Ms. Skyler Broadbent',
    Department: 'IT Network',
    Position: 'Network administrators',
    Duties: 'Ensure that day-to-day operations work.'
  },
  {
    IdNumber: 'PM43710',
    Name: 'Mr. Walter White',
    Department: 'Manager',
    Position: 'Project Manager',
    Duties: 'Responsible for delivering the project, with authority and responsibility from the Project Board to run the project on a day-to-day basis.'
  }
]

// set the view engine to ejs
express.set('view engine', 'ejs')

// home page
express.get('/', (req, res) => {
  // render `home.ejs` with the list of details
  res.render('home', { EMPLOYEES: EMPLOYEES })
})

// EMP
express.get('/Employee/:IdNumber', (req, res) => {
  // find the Employee in the `EMPLOYEES` array
  
  const EMP = EMPLOYEES.filter((EMPLOYEE) => {
    return EMPLOYEE.IdNumber == req.params.IdNumber
  })[0];
    
  console.log("EMP Requested ID : "+req.params.IdNumber);
  
  // render the `post.ejs` page with the EMP content
  res.render('post', {
    IdNumber: EMP.IdNumber,
    Name: EMP.Name,
    Department: EMP.Department,
    Position: EMP.Position,
    Duties: EMP.Duties
  })
})

