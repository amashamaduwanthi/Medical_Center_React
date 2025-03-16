export default class Doctor{
    id:number;
    name:string;
    specialty:string;
    yearOfExperience:number;
    bio:string;
    constructor(name:string, specialty:string, yearOfExperience:number, bio:string) {
        this.name = name;
        this.specialty = specialty;
        this.yearOfExperience = yearOfExperience;
        this.bio = bio;
    }

}