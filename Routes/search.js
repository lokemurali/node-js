const express = require('express');
const searchRout = express.Router(); // to config router
const searchDb = require('../Models/search');
const mongo = require('mongodb').ObjectID;
const cors = require('cors');
searchRout.use(cors());


searchDb.collection.createIndexes(
    {
        IA: "text", 
        IR: "text", 
        FunctionalArea: "text",
        ReportedBy: "text", 
        ProblemReported: "text", 
        RootCause: "text", 
        ActionResolutionWorkaround: "text", 
        RedirectedtoOtherTeams:"text",
        Team:"text"
    }, { unique: true }
)

searchDb.collection.getIndexes({full: true}).then(indexes => {
    console.log("indexes:", indexes);
    // ...
}).catch(console.error);

//Display all the records

searchRout.get('/All', (req,res)=>{
    console.log('inside get all');
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
    // searchDb.ensureIndexes({IA: "text", IR: "text", FunctionalArea: "text",ReportedBy: "text", ProblemReported: "text", RootCause: "text", ActionResolutionWorkaround: "text", RedirectedtoOtherTeams:"text",Team:"text"});
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

searchRout.put('/update', (req,res)=>{
    console.log('inside Update');
    console.log("request", req.body);
    let params = {_id: req.body.ID};     // Query to find the correct record.
    searchDb.findOne(params, function(err, foundobj) {
        if(err)
        {
            console.log("Findone-Err",err);
            res.status(500).send();
        } else {
            if(!foundobj){
                res.status(404).send();
            } else{
                // foundobj = Data;
                console.log("updated-Info",foundobj);
                foundobj.ReportedDateTime = req.body.editData.ReportedDateTime;
                foundobj.IA=req.body.editData.IA;
                foundobj.IR=req.body.editData.IR;
                foundobj.Severity=req.body.editData.Severity;
                foundobj.FunctionalArea=req.body.editData.FunctionalArea;
                foundobj.ReportedBy=req.body.editData.ReportedBy;
                foundobj.ProblemReported=req.body.editData.ProblemReported;
                foundobj.RootCause=req.body.editData.RootCause;
                foundobj.ActionResolutionWorkaround=req.body.editData.ActionResolutionWorkaround;
                foundobj.LongTermSolutionNeeded=req.body.editData.LongTermSolutionNeeded;
                foundobj.RedirectedtoOtherTeams=req.body.editData.Redirectedtootherteams;
                foundobj.Timetakentoresolvetheproblem=req.body.editData.Timetakentoresolvetheproblem;
                foundobj.Team=req.body.editData.Team;
                foundobj.save(function (err, updatedobj) {
                    if(err)
                    {
                        console.log("save-err",err);
                        res.status(500).send();
                    } else{
                        console.log("Updated-Details", updatedobj);
                        res.send(updatedobj);
                    }
                })
            }
        }
    })
});


searchRout.post('/insert', (req,res)=>{
    console.log("New-Data",req.body.newData)
    searchDb.insertMany(req.body.newData).then((docs) => {
        res.send(docs)
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    })
});

searchRout.delete('/delete', (req,res)=>{
    console.log('inside delete');
    console.log("request", req.query.params);
    let params = {_id: req.query.params};     // Query to find the correct record.
    searchDb.findOne(params, function(err, foundobj) {
        if(err)
        {
            console.log("Findone-Err",err);
            res.status(500).send();
        }else{
            console.log("Delted-Details", foundobj);
            foundobj.remove(function(err, deltedobj){
                if(err)
                {
                    console.log("delete-err", err);
                    res.status(500).semd();
                }else{
                    console.log("Delted-Details", deltedobj);
                    res.send(deltedobj);
                }
            })
        }

        })
});

module.exports = searchRout;