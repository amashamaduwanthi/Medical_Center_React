import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import { deleteDoctors, getAllDoctors, saveDoctor } from "../slice/DoctorSlice.ts";
import backgroundImage from "../assets/medical-equipment-with-copy-space.jpg";// Adjust path as needed
import Swal from "sweetalert2";

function Doctor() {
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [yearOfExperience, setYearOfExperience] = useState("");
    const [bio, setBio] = useState("");
    const [editingDoctor, setEditingDoctor] = useState(null);

    const doctors = useSelector((state: any) => state.doctor) || [];
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    const addDoctor = (e: React.FormEvent) => {
        e.preventDefault();
        const newDoctorData = { name, specialty, yearOfExperience, bio };

        dispatch(saveDoctor(newDoctorData)).then(() => {
            Swal.fire({
                icon: "success",
                title: "Doctor Added",
                text: "Doctor has been successfully added!",
                confirmButtonColor: "#3085d6",
            });
        });
        clearFields();
    };

    const deleteDoctor = (name: string) => {
        dispatch(deleteDoctors(name)).then(() => {
            Swal.fire({
                icon: "success",
                title: "Doctor Deleted",
                text: "Doctor has been successfully deleted!",
                confirmButtonColor: "#d33",
            });
        });
        dispatch(getAllDoctors());
    };

    const editDoctor = (doctor: any) => {
        setEditingDoctor(doctor);
        setName(doctor.name);
        setSpecialty(doctor.specialty);
        setYearOfExperience(doctor.yearOfExperience);
        setBio(doctor.bio);
    };

    const updateDoctor = () => {
        if (editingDoctor) {
            const updatedDoctor = { ...editingDoctor, name, specialty, yearOfExperience, bio };
            dispatch(saveDoctor(updatedDoctor)).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Doctor Updated",
                    text: "Doctor details have been successfully updated!",
                    confirmButtonColor: "#3085d6",
                });
            });
            setEditingDoctor(null);
            clearFields();
        }
    };

    const clearFields = () => {
        setName("");
        setSpecialty("");
        setYearOfExperience("");
        setBio("");
    };

    return (
        <section
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300 p-8">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-gradient bg-gradient-to-br from-indigo-500 via-blue-600 to-green-500">
                    Doctor Management
                </h1>

                <div className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</h2>
                    <input type="text" placeholder="Doctor's Name" value={name} onChange={(e) => setName(e.target.value)}
                           className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)}
                           className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Years of Experience" value={yearOfExperience} onChange={(e) => setYearOfExperience(e.target.value)}
                           className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                    <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)}
                              className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 h-32" />

                    {editingDoctor ? (
                        <button onClick={updateDoctor} className="w-full bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition duration-300">
                            Update Doctor
                        </button>
                    ) : (
                        <button onClick={addDoctor} className="w-full bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 transition duration-300">
                            Add Doctor
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor: any) => (
                        <div key={doctor.id} className="bg-white bg-opacity-90 p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                            <p className="text-gray-700 mb-2">Specialty: {doctor.specialty}</p>
                            <p className="text-gray-700 mb-2">Years of Experience: {doctor.yearOfExperience}</p>
                            <p className="text-gray-700 mb-4">Bio: {doctor.bio}</p>
                            <div className="flex justify-between mt-4">
                                <button onClick={() => editDoctor(doctor)} className="bg-yellow-500 text-white p-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300">
                                    Edit
                                </button>
                                <button onClick={() => deleteDoctor(doctor.name)} className="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition duration-300">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Doctor;