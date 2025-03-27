export default class Appointments{
    FullName:string;
    AppointmentNo:number;
    Date: string;
    Time:string;
    DoctorName:string;
    PatientEmail:string;

    constructor( FullName:string,AppointmentNo:number,Date: string,Time:string,DoctorName:string, PatientEmail:string) {
        this.FullName=FullName;
        this.AppointmentNo=AppointmentNo;
        this.Date=Date;
        this.Time=Time;
        this.DoctorName=DoctorName;
        this.PatientEmail=PatientEmail;
    }
}