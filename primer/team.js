"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.team = void 0;
var team = /** @class */ (function () {
    function team(name, yearOfEstablishment, director, trainer, players) {
        this.name = name;
        this.yearOfEstablishment = yearOfEstablishment;
        this.director = director;
        this.trainer = trainer;
        this.players = [];
    }
    //add new player to the team
    //check if existing player id is not the same as the new player id
    team.prototype.addplayer = function (player) {
        var existingPlayer = this.players.find(function (p) { return p.id === player.id; });
        if (!existingPlayer) {
            this.players.push(player);
            console.log("Player added successfully!");
        }
        else {
            console.log("Player already exists!");
        }
    };
    //update player data parameter(payer data)
    team.prototype.updatePlayer = function (playerId, playerDetails) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.id === playerId) {
                p.name = playerDetails.name;
                p.surname = playerDetails.surname;
                p.dateOfBirth = playerDetails.dateOfBirth;
                p.placeOfBirth = playerDetails.placeOfBirth;
                p.height = playerDetails.height;
                p.weight = playerDetails.weight;
                return;
            }
            console.log("Player updated successfully!");
        }
        console.log("Player not found!");
    };
    team.prototype.deleteplayer = function (id) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.id === id) {
                this.players.splice(this.players.indexOf(p), 1);
                break;
            }
            console.log("Player deleted successfully!");
        }
    };
    team.prototype.printAllData = function () {
        return "Team: ".concat(this.name, ", \n       Founded: ").concat(this.yearOfEstablishment, ", \n       Director: \n       Name:").concat(this.director.name, ", \n       Surname: ").concat(this.director.surname, ", \n       DateofBirth: ").concat(this.director.dateOfBirth, ", \n       PlaceofBirth: ").concat(this.director.placeOfBirth, ", \n       ID: ").concat(this.director.id, ", \n       Role: ").concat(this.director.role, ", \n       Validity: ").concat(this.director.validity, ", \n       \n       Trainer:\n       Name: ").concat(this.trainer.name, " \n       Surname: ").concat(this.trainer.surname, ",\n       DateofBirth: ").concat(this.trainer.dateOfBirth, ", \n       PlaceofBirth: ").concat(this.trainer.placeOfBirth, ", \n       ID: ").concat(this.trainer.id, ", \n       Role: ").concat(this.trainer.role, ", \n       Validity: ").concat(this.trainer.validity, ", \n\n       Players: \n       ").concat(this.players.map(function (p) { return p.toString(); }));
    };
    return team;
}());
exports.team = team;
