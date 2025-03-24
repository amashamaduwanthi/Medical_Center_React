import { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store.ts";
import Appointments from "../model/Appointments.ts";
import {saveAppointment} from "../slice/AppiontmentSlice.ts";

function Appointment() {
    // State for doctor list
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    //const generatePatientId = () => `P-${Math.floor(Math.random() * 10000)}`;
    const dispatch = useDispatch<AppDispatch>();
    // State for appointment details
    const [appointmentDetails, setAppointmentDetails] = useState({
        name: "",
        appointmentDate: "",
        appointmentTime: "",
        doctorName: "",
        email:"",
    });

    // Generate a random patient ID


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:3000/doctor/view");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setDoctors(data);
                    setAppointmentDetails((prev) => ({
                        ...prev,
                        doctorName: data.length > 0 ? data[0] : "", // Set first doctor
                    }));
                } else {
                    console.error("Invalid response format:", data);
                    setDoctors([]); // Fallback to empty array
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setDoctors([]); // Handle errors by ensuring doctors remains an array
            }
        };


        const fetchPatients = async () => {
            try {
                const response = await fetch("http://localhost:3000/patient/view");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setPatients(data);
                } else {
                    console.error("Invalid patient response format:", data);
                    setPatients([]);
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
                setPatients([]);
            }
        };

        fetchDoctors();
        fetchPatients();
    }, []);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAppointmentDetails({
            ...appointmentDetails,
            [name]: value,  // Dynamically updates state based on the input field's name
        });
    };


    // Handle form submission
    const handleSubmit = () => {
        // if (
        const new_appointment = new  Appointments(appointmentDetails.name, appointmentDetails.appointmentDate, appointmentDetails.appointmentTime, appointmentDetails.doctorName, appointmentDetails.email);

        dispatch(saveAppointment(new_appointment));

    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Schedule an Appointment</h1>

            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Patient Information</h2>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <input
                        type="text"
                        name="name" // Changed from 'fullName' to 'name'
                        value={appointmentDetails.name}
                        onChange={handleInputChange}
                        placeholder="Full name"
                        className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />

                    <input type="date" name="appointmentDate" value={appointmentDetails.appointmentDate} onChange={handleInputChange} className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <input type="time" name="appointmentTime" value={appointmentDetails.appointmentTime} onChange={handleInputChange} className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"/>

                    {/* Dropdown for doctor selection */}
                    <select name="doctorName" value={appointmentDetails.doctorName} onChange={handleInputChange} className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full">
                        {doctors.map((doctor) => (
                            <option key={doctor.name} value={doctor.name}>
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

                {/* Submit Button */}
                <div className="text-center">
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300">Book Appointment</button>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
