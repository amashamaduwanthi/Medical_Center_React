import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { deletePatient, getAllPatients, savePatient } from "../slice/PatientSlice.ts";

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
        const patientData = {
            name,
            email,
            age: parseInt(age),
            condition,
        };
        dispatch(savePatient(patientData));
        clearFields();
    };

    const deletePatients = (email: string) => {
        dispatch(deletePatient(email));
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
            dispatch(savePatient(updatedPatient));
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
        <div className="max-w-screen-xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Patient Management</h1>

            <div className="max-w-xl mx-auto bg-blue-100 p-8 shadow-lg rounded-lg mb-8">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {patients.map((patient: any) => (
                    <div key={patient.id} className="bg-blue-100 p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-2">{patient.name}</h3>
                        <h3 className="text-xl font-semibold mb-2">{patient.email}</h3>
                        <p className="text-gray-700 mb-2">Age: {patient.age}</p>
                        <p className="text-gray-700 mb-2">Condition: {patient.condition}</p>
                        <div className="flex justify-between">
                            <button onClick={() => editPatient(patient)} className="bg-yellow-500 text-white p-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300">Edit</button>
                            <button onClick={() => deletePatients(patient.email)} className="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition duration-300">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Patient;