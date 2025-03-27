import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import Appointments from "../model/Appointments.ts";
import { saveAppointment } from "../slice/AppointmentSlice.ts";
import backgroundImage from "../assets/medical-equipment-with-copy-space.jpg"; // Adjust path as needed

function Appointment() {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]); // Store fetched appointments
    const dispatch = useDispatch<AppDispatch>();

    const [appointmentDetails, setAppointmentDetails] = useState({
        name: "",
        AppointmentNo:"",
        appointmentDate: "",
        appointmentTime: "",
        doctorName: "",
        email: "",
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:3000/doctor/view");
                const data = await response.json();
                setDoctors(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        const fetchPatients = async () => {
            try {
                const response = await fetch("http://localhost:3000/patient/view");
                const data = await response.json();
                setPatients(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        const fetchAppointments = async () => {
            try {
                const response = await fetch("http://localhost:3000/appointment/view");
                const data = await response.json();
                setAppointments(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchDoctors();
        fetchPatients();
        fetchAppointments();
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAppointmentDetails({ ...appointmentDetails, [name]: value });
    };

    const handleSubmit = async () => {
        const newAppointment = new Appointments(
            appointmentDetails.name,
            Number(appointmentDetails.AppointmentNo),
            appointmentDetails.appointmentDate,
            appointmentDetails.appointmentTime,
            appointmentDetails.doctorName,
            appointmentDetails.email
        );

        dispatch(saveAppointment(newAppointment));


        // Refresh appointments after adding new one
        const response = await fetch("http://localhost:3000/appointment/view");
        const data = await response.json();
        setAppointments(Array.isArray(data) ? data : []);
    };

    return (
        <section
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-4xl mx-auto p-6  bg-opacity-10 rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Schedule an Appointment</h1>

                <div className="bg-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Patient Information</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <input
                            type="text"
                            name="name"
                            value={appointmentDetails.name}
                            onChange={handleInputChange}
                            placeholder="Full name"
                            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                        />

                        <input
                            type="number"
                            name="AppointmentNo"
                            value={appointmentDetails.AppointmentNo}
                            onChange={handleInputChange}
                            placeholder="Appointment No"
                            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                        />

                        <input
                            type="date"
                            name="appointmentDate"
                            value={appointmentDetails.appointmentDate}
                            onChange={handleInputChange}
                            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <input
                            type="time"
                            name="appointmentTime"
                            value={appointmentDetails.appointmentTime}
                            onChange={handleInputChange}
                            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                        />

                        <select
                            name="doctorName"
                            value={appointmentDetails.doctorName}
                            onChange={handleInputChange}
                            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                        >
                            <option value="">Select Doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor.name}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <select
                        name="email"
                        value={appointmentDetails.email}
                        onChange={handleInputChange}
                        className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        <option value="">Select Patient Email</option>
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient.email}>
                                {patient.email}
                            </option>
                        ))}
                    </select>

                    <div className="text-center mt-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>

                {/* Displaying All Appointments */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Booked Appointments</h2>
                    {appointments.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {appointments.map((appointment) => (
                                <div key={appointment._id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                                    <p><strong>Patient:</strong> {appointment.FullName}</p>
                                    <p><strong>AppointmentNo:</strong>{appointment.AppointmentNo}</p>
                                    <p><strong>Date:</strong> {appointment.Date}</p>
                                    <p><strong>Time:</strong> {appointment.Time}</p>
                                    <p><strong>Doctor:</strong> {appointment.DoctorName}</p>
                                    <p><strong>Email:</strong> {appointment.PatientEmail}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No appointments scheduled.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Appointment;
