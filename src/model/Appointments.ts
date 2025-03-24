export default class Appointments{
    FullName:string;
    Date: string;
    Time:string;
    DoctorName:string;
    PatientEmail:string;

    constructor( FullName:string,Date: string,Time:string,DoctorName:string, PatientEmail:string) {
        this.FullName=FullName;
        this.Date=Date;
        this.Time=Time;
        this.DoctorName=DoctorName;
        this.PatientEmail=PatientEmail;
    }
}