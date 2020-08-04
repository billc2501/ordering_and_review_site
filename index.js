const express = require('express');
const { response } = require('express');
const cors = require('cors');
var fs = require('fs');
var ratings = fs.readFileSync('reviews.json');
var system = JSON.parse(ratings);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const server = express();
server.use(cors());
server.use(express.json());
server.listen(3000, function() { 
    console.log('Starting');
})

server.use(express.static('site'));
server.get('/food/:person/:selfrating', rate)
server.get("/overall", all);
server.get('/assessment/:person', piece);

function rate(request, response){
    var items = request.params;
    var person = items.person;
    var value = Number(items.selfrating);
    system[person] = value;
    var piece = JSON.stringify(system, null, 3);
    fs.writeFile('reviews.json', piece, received);
    var letter = String(person[0]).toUpperCase();
    var name = letter + String(person).substr(1, person.length);
    response.send("Rating of "+ name + " sent");
}
function received(){
    console.log("Rating received");
}
function all(request, response){
    response.send(system);
}
function piece(request, response){
    var data = request.params;
    var letter = String(data.person[0]).toUpperCase();
    var name = letter + String(data.person).substr(1, data.person.length);
    str = String(name) + "'s most recent self-rating was " + String(system[data.person]) + '.';
    response.send(str);
}

server.post('/', (request, response) => {
    var name = request.body.name;
    var order = request.body.order;
    var receipt = {"name": name, "order": order}
    MongoClient.connect(url, function(error, db) {
        if (error) throw error;
        var data = db.db('database');
        data.collection('receipts').insertOne(receipt, function(err, res) { //add item to database
            if (err) throw err;
            data.collection('receipts').find({}).toArray(function(err, result){
                response.json(result);
            })
            db.close();
        })
    
    });
})


