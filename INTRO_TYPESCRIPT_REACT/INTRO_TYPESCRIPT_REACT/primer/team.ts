import { functionar, player } from "./Person_Interface";
export { team };
class team {
    name: string;
    yearOfEstablishment: number;
    director: functionar;
    trainer: functionar;
    players: player[];

    constructor(name: string, yearOfEstablishment: number, director: functionar, trainer: functionar, players: player[]) {
        this.name = name;
        this.yearOfEstablishment = yearOfEstablishment;
        this.director = director;
        this.trainer = trainer;
        this.players = players;
    }

    addplayer(player: player) {
        this.players.push(player);
    }

    updateplayer(player: player) {
        for (let p of this.players) {
            if (p.id === player.id) {
                this.players.push(player);
                break;
            }
        } 
    }

    deleteplayer(id: number) {
        for (let p of this.players) {
            if (p.id === id) {
                this.players.splice(this.players.indexOf(p), 1);
                break;
            }
        }
    }

    printAllData(): string {
       return `Team: ${this.name}, 
       Founded: ${this.yearOfEstablishment}, 
       Director: 
       Name:${this.director.name}, 
       Surname: ${this.director.surnmame}, 
       DateofBirth: ${this.director.dateOfBirth}, 
       PlaceofBirth: ${this.director.placeOfBirth}, 
       ID: ${this.director.id}, 
       Role: ${this.director.role}, 
       Validity: ${this.director.validity}, 
       
       Trainer:
       Name: ${this.trainer.name} 
       Surname: ${this.trainer.surnmame},
       DateofBirth: ${this.trainer.dateOfBirth}, 
       PlaceofBirth: ${this.trainer.placeOfBirth}, 
       ID: ${this.trainer.id}, 
       Role: ${this.trainer.role}, 
       Validity: ${this.trainer.validity}, 

       Players: 
       ${this.players.map(p => p.toString())}`;
    }
}

