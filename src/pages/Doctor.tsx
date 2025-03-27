import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import { deleteDoctors, getAllDoctors, saveDoctor } from "../slice/DoctorSlice.ts";
import backgroundImage from "../assets/medical-equipment-with-copy-space.jpg";
import Swal from "sweetalert2";

function Doctor() {
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [yearOfExperience, setYearOfExperience] = useState("");
    const [bio, setBio] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const doctors = useSelector((state: any) => state.doctor) || [];
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    useEffect(() => {
        setFilteredDoctors(doctors);
    }, [doctors]);

    const addDoctor = (e: React.FormEvent) => {
        e.preventDefault();
        const newDoctorData = { name, specialty, yearOfExperience: Number(yearOfExperience), bio };

        dispatch(saveDoctor(newDoctorData)).then(() => {
            Swal.fire({
                icon: "success",
                title: "Doctor Added",
                text: "Doctor has been successfully added!",
                confirmButtonColor: "#3085d6",
            });
            dispatch(getAllDoctors());
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
            dispatch(getAllDoctors());
        });
    };

    const searchDoctor = () => {
        setFilteredDoctors(doctors.filter((doctor: any) => doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())));
    };

    const clearFields = () => {
        setName("");
        setSpecialty("");
        setYearOfExperience("");
        setBio("");
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-cover bg-center p-6" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300 p-8">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-gradient bg-gradient-to-br from-indigo-500 via-blue-600 to-green-500">
                    Doctor Management
                </h1>
                <div className="flex items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search Doctor by Speciality"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={searchDoctor} className="bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition duration-300">
                        Search
                    </button>
                </div>
                <form onSubmit={addDoctor} className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="Doctor Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" required />
                        <input type="text" placeholder="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" required />
                        <input type="number" placeholder="Years of Experience" value={yearOfExperience} onChange={(e) => setYearOfExperience(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" required />
                        <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" required></textarea>
                    </div>
                    <button type="submit" className="bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 transition duration-300 mt-4">
                        Add Doctor
                    </button>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDoctors.map((doctor: any) => (
                        <div key={doctor.id} className="bg-white bg-opacity-90 p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                            <p className="text-gray-700 mb-2">Specialty: {doctor.specialty}</p>
                            <p className="text-gray-700 mb-2">Years of Experience: {doctor.yearOfExperience}</p>
                            <p className="text-gray-700 mb-4">Bio: {doctor.bio}</p>
                            <div className="flex justify-between mt-4">
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
