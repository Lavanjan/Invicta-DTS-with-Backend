const router = require('express').Router();
let employees = require("./../models/employee.model");

router.route('/').get((req, res) => {
    employees.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {  
   const employeeId=req.body.employeeId;
  const employeeName = req.body.employeeName;
  const employeeEmail = req.body.employeeEmail;
  const employeeMobileNumber = req.body.employeeMobileNumber;
  const employeeDepartment = req.body.employeeDepartment;

  const newEmployees = new employees({  
    employeeId,  
    employeeName,
    employeeEmail,
    employeeMobileNumber,
    employeeDepartment
  });
  newEmployees
    .save()
    .then(() => res.json("Added Suucessfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req, res) => {
    employees.findById(req.params.id)
    .then(defects => res.json(employees))
    .catch(err => res.status(400).json('Error' +err));
});

router.route('/:id').delete((req, res)=>{
    employees.findByIdAndDelete(req.params.id)
    .then(()=> res.json('employees Deleted'))
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/update/:id').put((req, res) => {
    employees.findById(req.params.id)
    .then(employees => {        
        employees.employeeName = req.body.employeeName;
        employees.employeeEmail = req.body.employeeEmail;
        employees.employeeMobileNumber = req.body.employeeMobileNumber;
        employees.employeeDepartment = req.body.employeeDepartment;

        defects.save()
        .then(()=> res.json('Defects Updated'))
        .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
})

module.exports = router;