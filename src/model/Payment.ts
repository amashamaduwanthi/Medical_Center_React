export default class Payment{
    AppointmentNo:string;
    PatientName:string;
    Amount:string;
    PaymentMethod:string;

    constructor(AppointmentNo:string,PatientName:string, Amount:string, PaymentMethod:string) {
        this.AppointmentNo=AppointmentNo;
        this.PatientName = PatientName;
        this.Amount = Amount;
        this.PaymentMethod = PaymentMethod;
    }

}