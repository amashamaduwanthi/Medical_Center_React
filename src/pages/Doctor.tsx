import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import {deleteDoctors, getAllDoctors, saveDoctor} from "../slice/DoctorSlice.ts";

// Sample Doctor Data for initial load
const initialDoctors = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiology", yearOfExperience: 15, bio: "Experienced cardiologist." },
    { id: 2, name: "Dr. Jane Smith", specialty: "Neurology", yearOfExperience: 10, bio: "Specialized in brain and spine disorders." },
    { id: 3, name: "Dr. Samuel Green", specialty: "Dermatology", yearOfExperience: 8, bio: "Skin care expert." }
];

function Doctor() {
    const [doctors, setDoctors] = useState(initialDoctors);
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [yearOfExperience, setYearOfExperience] = useState("");
    const [bio, setBio] = useState("");
    const [editingDoctor, setEditingDoctor] = useState(null);
    const doctor = useSelector((state: any) => state.doctor);
    const dispatch = useDispatch<AppDispatch>();

    // Function to add a new doctor
    const addDoctor = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", { name, specialty, yearOfExperience, bio });
        alert("Doctor added successfully!");

        const newDoctorData = { id: doctors.length + 1, name, specialty, yearOfExperience, bio };

        // Dispatch the action to Redux store
        dispatch(saveDoctor(newDoctorData));

        // Reset form fields after submission
        setName("");
        setSpecialty("");
        setYearOfExperience("");
        setBio("");
    };

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    // Function to delete a doctor
    const deleteDoctor = (name:string) => {
        dispatch(deleteDoctors(name));
        alert("Doctor deleted successfully!");
        dispatch(getAllDoctors())
    };

    // Function to update a doctor's information
    const updateDoctor = () => {
        if (editingDoctor) {
            const updatedDoctors = doctors.map((doctor) =>
                doctor.id === editingDoctor.id ? editingDoctor : doctor
            );
            setDoctors(updatedDoctors);
            setEditingDoctor(null);
        }
    };

    // Function to handle input changes for new doctor or editing an existing one
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editingDoctor) {
            setEditingDoctor({ ...editingDoctor, [name]: value });
        } else {
            if (name === "name") setName(value);
            if (name === "specialty") setSpecialty(value);
            if (name === "yearOfExperience") setYearOfExperience(value);
            if (name === "bio") setBio(value);
        }
    };

    // Function to edit a doctor
    const editDoctor = (doctor) => {
        setEditingDoctor(doctor);
        setName(doctor.name);
        setSpecialty(doctor.specialty);
        setYearOfExperience(doctor.yearOfExperience);
        setBio(doctor.bio);
    };

    return (
        <div className="max-w-screen-xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Doctor Management</h1>

            {/* Form to add or update a doctor */}
            <div className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Doctor's Name"
                    value={name}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="specialty"
                    placeholder="Specialty"
                    value={specialty}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="yearOfExperience"
                    placeholder="Years of Experience"
                    value={yearOfExperience}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={bio}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 h-32"
                />

                {editingDoctor ? (
                    <button
                        onClick={updateDoctor}
                        className="w-full bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                    >
                        Update Doctor
                    </button>
                ) : (
                    <button
                        onClick={addDoctor}
                        className="w-full bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 transition duration-300"
                    >
                        Add Doctor
                    </button>
                )}
            </div>

            {/* Doctor Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctor.map((doctor) => (
                    <div key={doctor.id} className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                        <p className="text-gray-700 mb-2">Specialty: {doctor.specialty}</p>
                        <p className="text-gray-700 mb-2">Years of Experience: {doctor.yearOfExperience}</p>
                        <p className="text-gray-700 mb-4">Bio: {doctor.bio}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => editDoctor(doctor)}
                                className="bg-yellow-500 text-white p-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteDoctor(doctor.name)}
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

export default Doctor;
