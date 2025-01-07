import { functionar, player } from "./Person_Interface";
export { team };
class team {
    name: string;
    yearOfEstablishment: number;
    director: functionar;
    trainer: functionar;
    players: Array<any>;

    constructor(name: string, yearOfEstablishment: number, director: functionar, trainer: functionar, players: player[]) {
        this.name = name;
        this.yearOfEstablishment = yearOfEstablishment;
        this.director = director;
        this.trainer = trainer;
        this.players = [];
    }

    //add new player to the team
    //check if existing player id is not the same as the new player id
    addplayer(player: any) {
        const existingPlayer = this.players.find(p => p.id === player.id);
        if (!existingPlayer) {
            this.players.push(player);
            console.log("Player added successfully!");
        } else {
            console.log("Player already exists!");
        }
    }

    //update player data parameter(payer data)
    updatePlayer(playerId: number, playerDetails: any) {
        for (let p of this.players) {
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
    }

    deleteplayer(id: number) {
        for (let p of this.players) {
            if (p.id === id) {
                this.players.splice(this.players.indexOf(p), 1);
                break;
            }
            console.log("Player deleted successfully!");
        }
    }

    printAllData(): string {
       return `Team: ${this.name}, 
       Founded: ${this.yearOfEstablishment}, 
       Director: 
       Name:${this.director.name}, 
       Surname: ${this.director.surname}, 
       DateofBirth: ${this.director.dateOfBirth}, 
       PlaceofBirth: ${this.director.placeOfBirth}, 
       ID: ${this.director.id}, 
       Role: ${this.director.role}, 
       Validity: ${this.director.validity}, 
       
       Trainer:
       Name: ${this.trainer.name} 
       Surname: ${this.trainer.surname},
       DateofBirth: ${this.trainer.dateOfBirth}, 
       PlaceofBirth: ${this.trainer.placeOfBirth}, 
       ID: ${this.trainer.id}, 
       Role: ${this.trainer.role}, 
       Validity: ${this.trainer.validity}, 

       Players: 
       ${this.players.map(p => p.toString())}`;
    }
}

