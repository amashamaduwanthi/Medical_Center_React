import { useState } from "react";

// Sample Patient Data for initial load
const initialPatients = [
    { id: 1, name: "John Doe", age: 30, condition: "Flu" },
    { id: 2, name: "Jane Smith", age: 40, condition: "Cold" },
    { id: 3, name: "Samuel Green", age: 50, condition: "Diabetes" }
];

function Patient() {
    const [patients, setPatients] = useState(initialPatients);
    const [newPatient, setNewPatient] = useState({ name: "", age: "", condition: "" });
    const [editingPatient, setEditingPatient] = useState(null);

    // Function to add a new patient
    const addPatient = () => {
        if (newPatient.name && newPatient.age && newPatient.condition) {
            const patient = { ...newPatient, id: patients.length + 1 };
            setPatients([...patients, patient]);
            setNewPatient({ name: "", age: "", condition: "" });
        } else {
            alert("Please fill all fields.");
        }
    };

    // Function to delete a patient
    const deletePatient = (id) => {
        const filteredPatients = patients.filter((patient) => patient.id !== id);
        setPatients(filteredPatients);
    };

    // Function to update a patient's information
    const updatePatient = () => {
        if (editingPatient) {
            const updatedPatients = patients.map((patient) =>
                patient.id === editingPatient.id ? editingPatient : patient
            );
            setPatients(updatedPatients);
            setEditingPatient(null);
        }
    };

    // Function to handle input changes for new patient or editing an existing one
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingPatient) {
            setEditingPatient({ ...editingPatient, [name]: value });
        } else {
            setNewPatient({ ...newPatient, [name]: value });
        }
    };

    // Function to edit a patient
    const editPatient = (patient) => {
        setEditingPatient(patient);
    };

    return (
        <div className="max-w-screen-xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Patient Management</h1>

            {/* Form to add or update a patient */}
            <div className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">{editingPatient ? "Edit Patient" : "Add New Patient"}</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Patient's Name"
                    value={editingPatient ? editingPatient.name : newPatient.name}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={editingPatient ? editingPatient.age : newPatient.age}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="condition"
                    placeholder="Condition"
                    value={editingPatient ? editingPatient.condition : newPatient.condition}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />

                {editingPatient ? (
                    <button
                        onClick={updatePatient}
                        className="w-full bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                    >
                        Update Patient
                    </button>
                ) : (
                    <button
                        onClick={addPatient}
                        className="w-full bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 transition duration-300"
                    >
                        Add Patient
                    </button>
                )}
            </div>

            {/* Patient Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {patients.map((patient) => (
                    <div key={patient.id} className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-2">{patient.name}</h3>
                        <p className="text-gray-700 mb-2">Age: {patient.age}</p>
                        <p className="text-gray-700 mb-2">Condition: {patient.condition}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => editPatient(patient)}
                                className="bg-yellow-500 text-white p-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deletePatient(patient.id)}
                                className="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Patient;
