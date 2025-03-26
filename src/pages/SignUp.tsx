import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { User } from "../model/User.ts";

import { AppDispatch } from "../redux/store.ts";
import { useDispatch } from "react-redux";
import { registerUser } from "../slice/UserSlice.ts";

// Import the background image
import backgroundImage from '../assets/medical-equipment-with-copy-space.jpg';  // Adjust the path to your image

export function Signup() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    function handleRegister(e: React.FormEvent) {
        e.preventDefault();

        if (!email || !password || !role) {
            Swal.fire({
                icon: 'warning',
                title: 'Validation Error',
                text: 'All fields are required. Please fill in all the fields before saving.',
                confirmButtonColor: '#3085d6',
            });
            return;
        }
        const user: User = { email: email, password: password, role: role };
        dispatch(registerUser(user)).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'User Registered !',
                text: 'The User has been successfully Registered.',
                confirmButtonColor: '#3085d6',
            }).then(() => {
                navigate("/SignIn");
            });
        }).catch((error) => {
            console.error('Error adding User: ', error);
            Swal.fire({
                icon: 'error',
                title: 'Register Failed',
                text: 'An error occurred while saving the User. Please try again.',
            });
        });
    }

    return (
        <section
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}  // Use imported image as background
        >
            <div className="w-full max-w-md bg-gradient-to-br from-indigo-500 via-blue-600 to-green-500 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300 bg-opacity-80">
                <div className="p-8">
                    <h2 className="text-4xl font-bold text-white mb-6 text-center">Create an Account</h2>

                    <form className="w-full space-y-6" onSubmit={handleRegister}>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-white font-medium">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-white font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-white font-medium">Role</label>
                            <select
                                required
                                defaultValue=""
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full p-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                            >
                                <option disabled value="">Choose Your Role</option>
                                <option value="ADMIN">Admin</option>
                                <option value="MANAGER">Manager</option>
                                <option value="SCIENTIST">Scientist</option>
                            </select>
                        </div>

                        {/* Sign-Up Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:from-teal-600 hover:to-blue-700"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Sign-In Redirect */}
                    <p className="text-white text-center mt-6">
                        Already have an account?{" "}
                        <Link to="/signIn" className="text-teal-300 font-medium hover:underline">
                            Sign In here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
