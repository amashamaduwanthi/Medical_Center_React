import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";


import Swal from "sweetalert2";
import {AppDispatch} from "../redux/store.ts";
import {User} from "../model/User.ts";
import {loginUser} from "../slice/UserSlice.ts";
import backgroundImage from "../assets/medical-equipment-with-copy-space.jpg"; // Replace with your actual path


export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    function handleLogIn(e: React.FormEvent) {
        e.preventDefault();
        const user: User = { email, password, role };
        dispatch(loginUser(user))
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: "You are successfully logged in!",
                    confirmButtonColor: "#3085d6",
                }).then(() => {
                    navigate("/Dashboard");
                });
            })
            .catch((error) => {
                console.error("Error Logging: ", error);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "An error occurred while logging in. Please try again.",
                });
            });
    }

    return (
        <section
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="w-full max-w-md bg-gradient-to-br from-indigo-500 via-blue-600 to-green-500 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300">
                <div className="p-8">
                    <h2 className="text-4xl font-bold text-white mb-6 text-center">Welcome Back!</h2>

                    <form className="w-full space-y-6" onSubmit={handleLogIn}>
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
                                className="w-full p-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
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
                                className="w-full p-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-white font-medium">Role</label>
                            <select
                                required
                                defaultValue=""
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full p-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
                            >
                                <option disabled value="">Choose Your Role</option>
                                <option value="ADMIN">Admin</option>
                                <option value="MANAGER">Manager</option>
                                <option value="SCIENTIST">Scientist</option>
                            </select>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-yellow-500 to-red-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:from-yellow-600 hover:to-red-700"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Signup Redirect */}
                    <p className="text-white text-center mt-6">
                        Don't have an account?{" "}
                        <Link to="/signUp" className="text-yellow-300 font-medium hover:underline">
                            Sign Up here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
