"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.team = void 0;
var team = /** @class */ (function () {
    function team(name, yearOfEstablishment, director, trainer, players) {
        this.name = name;
        this.yearOfEstablishment = yearOfEstablishment;
        this.director = director;
        this.trainer = trainer;
        this.players = players;
    }
    team.prototype.addplayer = function (player) {
        this.players.push(player);
    };
    team.prototype.updateplayer = function (player) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.id === player.id) {
                this.players.push(player);
                break;
            }
        }
    };
    team.prototype.deleteplayer = function (id) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.id === id) {
                this.players.splice(this.players.indexOf(p), 1);
                break;
            }
        }
    };
    team.prototype.printAllData = function () {
        return "Team: ".concat(this.name, ", \n       Founded: ").concat(this.yearOfEstablishment, ", \n       Director: \n       Name:").concat(this.director.name, ", \n       Surname: ").concat(this.director.surnmame, ", \n       DateofBirth: ").concat(this.director.dateOfBirth, ", \n       PlaceofBirth: ").concat(this.director.placeOfBirth, ", \n       ID: ").concat(this.director.id, ", \n       Role: ").concat(this.director.role, ", \n       Validity: ").concat(this.director.validity, ", \n       \n       Trainer:\n       Name: ").concat(this.trainer.name, " \n       Surname: ").concat(this.trainer.surnmame, ",\n       DateofBirth: ").concat(this.trainer.dateOfBirth, ", \n       PlaceofBirth: ").concat(this.trainer.placeOfBirth, ", \n       ID: ").concat(this.trainer.id, ", \n       Role: ").concat(this.trainer.role, ", \n       Validity: ").concat(this.trainer.validity, ", \n\n       Players: \n       ").concat(this.players.map(function (p) { return p.toString(); }));
    };
    return team;
}());
exports.team = team;
