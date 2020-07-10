const router = require('express').Router();
let defects = require("./../models/defects.model");
const requireLogin = require('./../middleware/requireLogin');

router.route('/').get((req, res) => {
  defects.find()
  .populate("enteredBy","_id userName")
    .then(defects => res.json(defects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/myDefects').get((req, res)=> {
  defects.find({enteredBy:req.user._id})
  .populate("enteredBy", "_id userName")
  .then(myDefects=>{
    res.json({ myDefects })
  })
  .catch(err => {
    console.log(err)
  })
})

router.route('/add').post((req, res) => {
  const defectsId = req.body.defectsId;
  const defectsName = req.body.defectsName;
  const stepToRecreate = req.body.stepToRecreate;
  const type = req.body.type;
  const status = req.body.status;
  const severity = req.body.severity;
  const priority = req.body.priority;
  const enteredBy = req.body.enteredBy;
  const assignTo = req.body.assignTo;
  const foundIn = req.body.foundIn;
  const availableIn = req.body.availableIn;
  const module = req.body.module;
  const subModule = req.body.subModule; 

  req.user.password = undefined
  const newDefects = new defects({
    defectsId,
    defectsName,
    stepToRecreate,
    type,
    status,
    severity,
    priority,
    enteredBy:req.user,
    assignTo,
    foundIn,
    availableIn,
    module,
    subModule
  });
  newDefects
    .save()
    .then(() => res.json("Added Suucessfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req, res) => {
    defects.findById(req.params.id)
    .then(defects => res.json(defects))
    .catch(err => res.status(400).json('Error' +err));
});

router.route('/:id').delete((req, res)=>{
    defects.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Defects Deleted'))
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/update/:id').put((req, res) => {
    defects.findById(req.params.id)
    .then(defects => {
        defects.defectsId = req.body.defectsId;
        defects.defectsName = req.body.defectsName;
        defects.stepToRecreate = req.body.stepToRecreate;
        defects.type = req.body.type;
        defects.status = req.body.status;
        defects.severity = req.body.severity;
        defects.priority = req.body.priority;
        defects.enteredBy = req.body.enteredBy;
        defects.assignTo = req.body.assignTo;
        defects.foundIn = req.body.foundIn;
        defects.availableIn = req.body.availableIn;
        defects.module = req.body.module;
        defects.subModule = req.body.subModule;

        defects.save()
        .then(()=> res.json('Defects Updated'))
        .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
})

module.exports = router;