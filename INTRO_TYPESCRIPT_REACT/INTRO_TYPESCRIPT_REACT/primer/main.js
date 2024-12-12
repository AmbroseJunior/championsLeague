"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var team_1 = require("./team");
//create one team object with director and a trainer and at least 3 players correctly
var director = {
    name: "nnamdi",
    surnmame: "eze",
    dateOfBirth: 20 - 3 - 1990,
    placeOfBirth: "onitsha",
    id: 1, role: "  director",
    validity: 5,
    toString: function () { return this.name + " " + this.surnmame + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.role + " " + this.validity; }
};
var trainer = {
    name: "slot",
    surnmame: "arne",
    dateOfBirth: 20 - 3 - 1960,
    placeOfBirth: "holland",
    id: 2, role: "trainer",
    validity: 3,
    toString: function () { return this.name + " " + this.surnmame + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.role + " " + this.validity; }
};
var player1 = {
    name: "luiz",
    surnmame: "diaz",
    dateOfBirth: 20 - 3 - 1990,
    placeOfBirth: "onitsha",
    id: 3,
    height: 180,
    weight: 80,
    injured: true,
    toString: function () { return this.name + " " + this.surnmame + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.height + " " + this.weight + " " + this.injured; }
};
var player2 = {
    name: "Mo",
    surnmame: "salah",
    dateOfBirth: 20 - 3 - 1990,
    placeOfBirth: "onitsha",
    id: 4,
    height: 190,
    weight: 90,
    injured: false,
    toString: function () { return this.name + " " + this.surnmame + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.height + " " + this.weight + " " + this.injured; }
};
var player3 = {
    name: "cody",
    surnmame: "gagkpo",
    dateOfBirth: 20 - 3 - 1990,
    placeOfBirth: "onitsha",
    id: 5,
    height: 200,
    weight: 100,
    injured: true,
    toString: function () { return this.name + " " + this.surnmame + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.height + " " + this.weight + " " + this.injured; }
};
var player4 = {
    name: "curtis",
    surnmame: "jones",
    dateOfBirth: 20 - 3 - 2000,
    placeOfBirth: "leeds",
    id: 6,
    height: 150,
    weight: 70,
    injured: false,
    toString: function () { return this.name + " " + this.surnmame + " " + this.dateOfBirth + " " + this.placeOfBirth + " " + this.id + " " + this.height + " " + this.weight + " " + this.injured; }
};
var myteam = new team_1.team("liverpool", 1950, { name: "nnamdi",
    surnmame: "eze",
    dateOfBirth: 20 - 3 - 1990,
    placeOfBirth: "onitsha",
    id: 1,
    role: "  director",
    validity: 5 }, { name: "slot",
    surnmame: "arne",
    dateOfBirth: 20 - 3 - 1960,
    placeOfBirth: "holland",
    id: 2,
    role: "trainer",
    validity: 3 }, [player1, player2, player3, player4]);
console.log(myteam.printAllData());
