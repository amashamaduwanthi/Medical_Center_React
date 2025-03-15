export default class Patient{
    id:number;
    name:string;
    age:number;
    condition: string;


    constructor(name:string, age:number, condition:string) {
       this.name = name;
       this.age = age;
       this.condition = condition;

    }
}