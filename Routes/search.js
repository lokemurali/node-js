const express = require('express');
const searchRout = express.Router(); // to config router
const searchDb = require('../Models/search');
const cors = require('cors');
searchRout.use(cors());



searchRout.get('/results', (req,res)=>{
    console.log('inside search get method');
    searchDb.find()
.then(Incidents => {
    console.log(Incidents);
    res.send(Incidents);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving Incidents."
    });
});
});

searchRout.get('/params', (req,res)=>{
    console.log('inside search params');
    console.log(req.query);
    console.log(req.body);
    let params = req.query.params;
    searchDb.ensureIndexes({IA: "text", IR: "text",Severity: "text",  FunctionalArea: "text",ReportedBy: "text",
    ProblemReported: "text", RootCause: "text", ActionResolutionWorkaround: "text", RedirectedtoOtherTeams:"text",Team:"text"});
    searchDb.find({"$text":{"$search":params}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
.then(Incidents => {
    console.log(Incidents);
    res.send(Incidents);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving Incidents."
    });
});
});


searchRout.post('/insert', (req,res)=>{
    searchDb.insertMany(req.body).then((docs) => {
        res.send(docs)
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    })
});

module.exports = searchRout;