export default class Patient{
    id:number;
    name:string;
    email:string;
    age:number;
    condition: string;


    constructor(name:string,email:string, age:number, condition:string) {
       this.name = name;
       this.email = email;
       this.age = age;
       this.condition = condition;

    }
}