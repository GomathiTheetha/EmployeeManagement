var AWS = require("aws-sdk");
const express = require ('express');
var GUID = require("guid");
var config = require("./config/config.json");

AWS.config.update({
    region: config.region,
    endpoint: config.endpoint,
    accessKeyId: config.accessKey, 
    secretAccessKey: config.secretAccessKey
});

const app=express();
var docClient = new AWS.DynamoDB.DocumentClient();


app.get('/api/employee/getEmpID/',  (req,res)=> {

    console.log('req.query.empid : ', req.query.empid);
    var table = "EmployeeDetails";
    var employeeid = req.query.empid;

    var params = {
        TableName: table,
        Key:{
            "EmpID": employeeid
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get succeeded :", JSON.stringify(data, null, 2));
            res.send(data);
        }
    });
})
app.put('/api/employee/UpdateEmpDetails/:id/:FirstName/:LastName/:EmailID/:Phone/:Gender', (req,res) => {
    console.log('EmpID:',req.params.id );
    console.log('FirstName:',req.params.FirstName);
    console.log('LastName : ', req.params.LastName);
    console.log('Email : ', req.params.EmailID);
    console.log('Phone : ', req.params.Phone);
    console.log('Gender : ', req.params.Gender);
    const params = {
        TableName: "EmployeeDetails",
        Key:{ 
            "EmpID" : req.params.id
        },
        UpdateExpression: "set Email = :EmailID, FirstName = :FirstName , LastName = :LastName, Phone = :Phone, Gender = :Gender", 
        ConditionExpression: "EmpID = :EmpID",
        ExpressionAttributeValues : {
            ":EmailID" : req.params.EmailID ,
            ":FirstName" :  req.params.FirstName ,
            ":LastName" : req.params.LastName ,
            ":Phone" : req.params.Phone ,
            ":Gender" : req.params.Gender ,
            ":EmpID": req.params.id                        
        },

    };
    docClient.update(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Successfully updated");
            res.send(data);
        }
    });
})
app.put('/api/employee/CreateEmpDetails/:FirstName/:LastName/:EmailID/:Phone/:Gender', (req,res) => {

    var guid = GUID.create().value;
    console.log('Gemp ID :', guid);
    console.log('FirstName:',req.params.FirstName);
    console.log('LastName : ', req.params.LastName);
    console.log('Email : ', req.params.EmailID);
    console.log('Phone : ', req.params.Phone);
    console.log('Gender : ', req.params.Gender);
    const params = {
        TableName: "EmployeeDetails",
        Item:{ 
            "EmpID" : guid,
            "FirstName" : req.params.FirstName,
            "LastName" : req.params.LastName,
            "Email" :  req.params.EmailID,
            "Phone" : req.params.Phone,
            "Gender" : req.params.Gender
        }
    }
    docClient.put(params,function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.send(data);
        }
    });
})
app.delete('/api/employee/DeleteEmpDetails/:id', (req,res)=>{
    console.log('EmpID:',req.params.id );

    const params = {
        TableName: "EmployeeDetails",
        Key:{ 
            "EmpID" : req.params.id
        },
        ConditionExpression: "EmpID = :EmpID",
        ExpressionAttributeValues : {
            ":EmpID": req.params.id       
        },

    };
    docClient.delete(params, function(err, data) {

        if (err) {
            console.log("Error", err);
        } else {
            console.log("Successfully Deleted");
            res.send(data);
        }
    });

});
const port=process.env.PORT || 5000;

app.listen(port,() => console.log(`Server started on ${port}`));