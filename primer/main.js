"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var team_1 = require("./team");
//create one team object with director and a trainer and at least 3 players correctly
var director = {
    name: "nnamdi",
    surname: "eze",
    dateOfBirth: 20 - 3 - 1990,
    placeOfBirth: "onitsha",
    id: 1, role: "  director",
    validity: 5,
    toString: function () { return this.name + " " + this.surname + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.role + " " + this.validity; }
};
var trainer = {
    name: "slot",
    surname: "arne",
    dateOfBirth: 20 - 3 - 1960,
    placeOfBirth: "holland",
    id: 2, role: "trainer",
    validity: 3,
    toString: function () { return this.name + " " + this.surname + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.role + " " + this.validity; }
};
var myteam = new team_1.team("liverpool", 1950, { name: "nnamdi",
    surname: "eze",
    dateOfBirth: 20 - 3 - 1990,
    placeOfBirth: "onitsha",
    id: 1,
    role: "  director",
    validity: 5 }, { name: "slot",
    surname: "arne",
    dateOfBirth: 20 - 3 - 1960,
    placeOfBirth: "holland",
    id: 2,
    role: "trainer",
    validity: 3 }, []);
/*
//demonstrate add player function
myteam.addplayer({
    name: "Alison",
    surname: "becker",
    dateOfBirth: 20-3-1990,
    placeOfBirth: "onitsha",
    id: 7,
    height: 170,
    weight: 75,
    injured: false,
    toString: function ()
        {return this.name + " " + this.surname + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.height + " " + this.weight + " " + this.injured;}
})


myteam.addplayer({
    name: "Mohammed",
    surname: "Salah",
    dateOfBirth: 15-6-1992,
    placeOfBirth: "Egypt",
    id: 11,
    height: 175,
    weight: 70,
    injured: false,
    toString: function ()
        {return this.name + " " + this.surname + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.height + " " + this.weight + " " + this.injured;}
})

myteam.addplayer({
    name: "Virgil",
    surname: "Van Dijk",
    dateOfBirth: 8-7-1991,
    placeOfBirth: "Netherlands",
    id: 4,
    height: 195,
    weight: 90,
    injured: false,
    toString: function ()
        {return this.name + " " + this.surname + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.height + " " + this.weight + " " + this.injured;}
})

myteam.addplayer({
    name: "Ryan",
    surname: "Gravenberch",
    dateOfBirth: 16-5-2002,
    placeOfBirth: "Netherlands",
    id: 6,
    height: 190,
    weight: 80,
    injured: false,
    toString: function ()
        {return this.name + " " + this.surname + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.height + " " + this.weight + " " + this.injured;}
})

//demonstrate update player function

myteam.updatePlayer(7, {
    name: "Alison",
    surname: "Becker",
    dateOfBirth: 20-3-1990,
    placeOfBirth: "Colombia",
    id: 7,
    height: 170,
    weight: 75,
    injured: false,
    toString: function ()
        {return this.name + " " + this.surname + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.height + " " + this.weight + " " + this.injured;}
})

//demonstrate delete player function
//myteam.deleteplayer(6);
*/
console.log(myteam.players);
//print all data of the team
console.log(myteam.printAllData());
