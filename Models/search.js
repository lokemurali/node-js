
const mongooseOnCall = require('mongoose');

var callTrackerSchema = mongooseOnCall.Schema([{

  SNo:Number,
  ReportedDateTime: String,
  IA: String,
  IR: String,
  Severity: Number,
  FunctionalArea: String,
  ReportedBy: String,
  ProblemReported: String,
  RootCause: String,
  ActionResolutionWorkaround: String,
  LongTermSolutionNeeded: String,
  RedirectedtoOtherTeams: String,
  Timetakentoresolvetheproblem: String,
  Team: String
  }]);

  module.exports = mongooseOnCall.model('Oncall', callTrackerSchema);