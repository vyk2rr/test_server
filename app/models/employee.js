// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  name: {
  	type: String,
  	required: [true, 'Name is required']
  },
  lastName: {
  	type: String,
  	required: [true, 'Last name is required']
  },
  created: {
    type: Number
  },
  entries : [{
    type: Schema.Types.ObjectId,
    ref: 'Entry' 
  }]
});

var EntrySchema = new Schema({
  created: {
    type: Number,
    required: [true, 'Time of created is required']
  },
  arrivedAt: {
    type: Number
  },
  leftAt: {
    type: Number
  },
  expectedArrivalTime: {
    type: Number,
    required: [true, 'Time of arrival is required']
  },
  expectedLeavingTime: {
    type: Number,
    required: [true, 'LeavingTime is required']
  },
  allowedTolerance: {
    type: Number,
    required: [true, 'Tolerance time is required']
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee ID is required']
  }
});

mongoose.model('Entry', EntrySchema, 'entries');
mongoose.model('Employee', EmployeeSchema, 'employees');