
var fs = require('fs');
var cors = require('cores');
var ratings = fs.readFileSync('reviews.json');
var system = JSON.parse(ratings);

console.log('server is starting')
var express = require('express');
var item = express();
var port = item.listen(3000);

item.use(cors());
item.use(express.static('site'));
item.get('/mood/:person/:selfrating', rate)
item.get("/overall", all);
item.get('/assessment/:person', piece);

function rate(request, response){
    var items = request.params;
    var person = items.person;
    var value = Number(items.selfrating);
    system[person] = value;
    var piece = JSON.stringify(system, null, 3);
    fs.writeFile('reviews.json', piece, received);
    var letter = String(person[0]).toUpperCase();
    var name = letter + String(person).substr(1, person.length);
    response.send( name +"'s mood rating" + " sent");
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
