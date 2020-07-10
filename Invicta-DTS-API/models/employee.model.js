const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb+srv://lavanjan:lavan1998@invicta-dts.euh5l.mongodb.net/<dbname>?retryWrites=true&w=majority");
autoIncrement.initialize(connection);
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employeeId: { type: Number },
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true },
    employeeMobileNumber: { type: String, required: true },
    employeeDepartment: { type: String, required: true }
}, {
    timestamps: true,
});

employeeSchema.plugin(autoIncrement.plugin, {
    model: 'employees',
    field: 'employeeId',
    incrementBy: 1,
    startAt: 1
});
const employees = mongoose.model('employees', employeeSchema);

module.exports = employees;