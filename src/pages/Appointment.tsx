import { useState } from "react";

function Appointment() {
    // Sample data for doctors
    const doctors = ["Dr. John Doe", "Dr. Jane Smith", "Dr. Samuel Green"];

    // Generate a random patient ID (This could be fetched from a backend in a real-world application)
    const generatePatientId = () => `P-${Math.floor(Math.random() * 10000)}`;

    const [appointmentDetails, setAppointmentDetails] = useState({
        name: "",
        email: "",
        phone: "",
        appointmentDate: "",
        appointmentTime: "",
        doctorName: doctors[0], // Default to the first doctor in the list
        patientId: generatePatientId(), // Auto-generating patient ID
    });

    const [appointments, setAppointments] = useState([]);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentDetails({
            ...appointmentDetails,
            [name]: value,
        });
    };

    // Handle the appointment form submission
    const handleSubmit = () => {
        if (
            appointmentDetails.name &&
            appointmentDetails.email &&
            appointmentDetails.phone &&
            appointmentDetails.appointmentDate &&
            appointmentDetails.appointmentTime
        ) {
            // Add new appointment to the list
            setAppointments([...appointments, appointmentDetails]);

            // Reset the form and generate a new Patient ID
            setAppointmentDetails({
                name: "",
                email: "",
                phone: "",
                appointmentDate: "",
                appointmentTime: "",
                doctorName: doctors[0],
                patientId: generatePatientId(),
            });

            alert("Appointment Scheduled Successfully!");
        } else {
            alert("Please fill all fields!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Schedule an Appointment</h1>

            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Patient Information</h2>

                {/* Appointment Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <input
                        type="text"
                        name="name"
                        value={appointmentDetails.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <input
                        type="email"
                        name="email"
                        value={appointmentDetails.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <input
                        type="text"
                        name="phone"
                        value={appointmentDetails.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
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
                        {doctors.map((doctor, index) => (
                            <option key={index} value={doctor}>
                                {doctor}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Hidden field for Patient ID */}
                <div className="mb-6">
                    <label className="block text-gray-700">Patient ID</label>
                    <input
                        type="text"
                        name="patientId"
                        value={appointmentDetails.patientId}
                        readOnly
                        className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>

            {/* Appointments Cards Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Scheduled Appointments</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.map((appointment, index) => (
                        <div key={index} className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800">{appointment.name}</h3>
                            <p className="text-gray-600">Patient ID: {appointment.patientId}</p>
                            <p className="text-gray-600">Doctor: {appointment.doctorName}</p>
                            <p className="text-gray-600">Date: {appointment.appointmentDate}</p>
                            <p className="text-gray-600">Time: {appointment.appointmentTime}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Appointment;
