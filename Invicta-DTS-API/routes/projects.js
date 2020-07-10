const router = require('express').Router();
let projects = require("./../models/projects.model");

router.route('/').get((req, res) => {
  projects.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const projectId = req.body.projectId;
  const projectName = req.body.projectName;
  const projectDescription = req.body.projectDescription;
  const projectEmployees = req.body.projectEmployees;

  const newDefects = new projects({
    projectId,
    projectName,
    projectDescription,
    projectEmployees
  });
  newDefects
    .save()
    .then(() => res.json("Added Suucessfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req, res) => {
    projects.findById(req.params.id)
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error' +err));
});

router.route('/:id').delete((req, res)=>{
    projects.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Projects Deleted'))
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/update/:id').put((req, res) => {
    projects.findById(req.params.id)
    .then(projects => {
        projects.projectId = req.body.projectId;
        projects.projectName = req.body.projectName;
        projects.projectDescription = req.body.projectDescription;
        projects.projectEmployees = req.body.projectEmployees;

        projects.save()
        .then(()=> res.json('Projects Updated'))
        .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
})

module.exports = router;