import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { deletePatient, getAllPatients, savePatient } from "../slice/PatientSlice.ts";
import backgroundImage from "../assets/medical-equipment-with-copy-space.jpg"; // Adjust path as needed
import Swal from "sweetalert2";

function Patient() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [condition, setCondition] = useState("");
    const [editingPatient, setEditingPatient] = useState<any>(null);

    const patients = useSelector((state: any) => state.patient) || [];
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllPatients());
    }, [dispatch]);

    const addPatient = (e: React.FormEvent) => {
        e.preventDefault();
        const patientData = { name, email, age: parseInt(age), condition };

        dispatch(savePatient(patientData)).then(() => {
            Swal.fire({
                icon: "success",
                title: "Patient Added",
                text: "The patient has been successfully added!",
                confirmButtonColor: "#3085d6",
            });
        });

        clearFields();
    };

    const deletePatients = (email: string) => {
        dispatch(deletePatient(email)).then(() => {
            Swal.fire({
                icon: "success",
                title: "Patient Deleted",
                text: "The patient has been successfully deleted!",
                confirmButtonColor: "#d33",
            });
        });
        dispatch(getAllPatients());
    };

    const editPatient = (patient: any) => {
        setEditingPatient(patient);
        setName(patient.name);
        setEmail(patient.email);
        setAge(patient.age.toString());
        setCondition(patient.condition);
    };

    const updatePatient = () => {
        if (editingPatient) {
            const updatedPatient = { ...editingPatient, name, email, age: parseInt(age), condition };
            dispatch(savePatient(updatedPatient)).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Patient Updated",
                    text: "Patient details have been successfully updated!",
                    confirmButtonColor: "#3085d6",
                });
            });
            setEditingPatient(null);
            clearFields();
        }
    };

    const clearFields = () => {
        setName("");
        setEmail("");
        setAge("");
        setCondition("");
    };

    return (
        <section
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-5xl  rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300 p-8">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-bg-gradient-to-br from-indigo-500 via-blue-600 to-green-500">Patient Management</h1>

                {/* Patient Form */}
                <div className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{editingPatient ? "Edit Patient" : "Add New Patient"}</h2>
                    <input type="text" placeholder="Patient's Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="Patient's Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="Condition" value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />

                    {editingPatient ? (
                        <button onClick={updatePatient} className="w-full bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition duration-300">Update Patient</button>
                    ) : (
                        <button onClick={addPatient} className="w-full bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 transition duration-300">Add Patient</button>
                    )}
                </div>

                {/* Patient List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {patients.map((patient: any) => (
                        <div key={patient.id} className="bg-white bg-opacity-90 p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-2">{patient.name}</h3>
                            <h3 className="text-lg font-medium mb-2 text-gray-600">{patient.email}</h3>
                            <p className="text-gray-700 mb-2"><strong>Age:</strong> {patient.age}</p>
                            <p className="text-gray-700 mb-2"><strong>Condition:</strong> {patient.condition}</p>
                            <div className="flex justify-between mt-4">
                                <button onClick={() => editPatient(patient)} className="bg-yellow-500 text-white p-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300">Edit</button>
                                <button onClick={() => deletePatients(patient.email)} className="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition duration-300">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Patient;
