import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, FileText, Stethoscope, DollarSign, Calendar } from "lucide-react";

const patientData = [
    { name: "Jan", recovered: 150, death: 20 },
    { name: "Feb", recovered: 180, death: 25 },
    { name: "Mar", recovered: 140, death: 15 },
    { name: "Apr", recovered: 190, death: 30 },
    { name: "May", recovered: 200, death: 35 },
];

function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-600 text-white p-6">
                <h1 className="text-2xl font-bold mb-6">Hospital App</h1>
                <nav>
                    <ul>
                        <li className="mb-4 p-2 bg-blue-500 rounded-lg">🏠 Dashboard</li>
                        <li className="mb-2 p-2 hover:bg-blue-500 rounded-lg">🩺 Doctors</li>
                        <li className="mb-2 p-2 hover:bg-blue-500 rounded-lg">👥 Patients</li>
                        <li className="mb-2 p-2 hover:bg-blue-500 rounded-lg">📩 Messages</li>
                        <li className="mb-2 p-2 hover:bg-blue-500 rounded-lg">💊 Medications</li>
                        <li className="mb-2 p-2 hover:bg-blue-500 rounded-lg">📄 Documents</li>
                        <li className="mb-2 p-2 hover:bg-blue-500 rounded-lg">⚙️ Settings</li>
                        <li className="mt-6 p-2 bg-red-500 rounded-lg">🚪 Logout</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <input className="p-2 rounded-lg border" type="search" placeholder="Search..." />
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard icon={<Users className="w-8 h-8 text-blue-500" />} title="New Patients" value="45" />
                    <StatCard icon={<Stethoscope className="w-8 h-8 text-green-500" />} title="Our Doctors" value="23" />
                    <StatCard icon={<FileText className="w-8 h-8 text-yellow-500" />} title="Operations" value="14" />
                    <StatCard icon={<DollarSign className="w-8 h-8 text-purple-500" />} title="Income" value="$5728" />
                </div>

                {/* Patient Status Graph */}
                <div className="bg-white p-6 shadow rounded-xl mt-6">
                    <h2 className="text-xl font-semibold mb-4">Patient Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={patientData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="recovered" stroke="#3b82f6" />
                            <Line type="monotone" dataKey="death" stroke="#ef4444" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Doctor Highlight & Appointment List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Best Doctor Card */}
                    <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold">Best Doctor</h3>
                        <div className="flex items-center mt-4">
                            <img
                                src="https://via.placeholder.com/80"
                                alt="Doctor"
                                className="rounded-full w-16 h-16 mr-4"
                            />
                            <div>
                                <p className="text-lg font-bold">Dr. James Smith</p>
                                <p>Endocrinologist - City Hospital</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <p className="text-sm">Experience</p>
                                <p className="text-xl font-bold">8 Years</p>
                            </div>
                            <div>
                                <p className="text-sm">Patients</p>
                                <p className="text-xl font-bold">2,598</p>
                            </div>
                            <div>
                                <p className="text-sm">Reviews</p>
                                <p className="text-xl font-bold">1,537</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Patients Table */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Recent Patients</h3>
                        <table className="w-full text-left">
                            <thead>
                            <tr className="border-b">
                                <th className="p-2">Name</th>
                                <th className="p-2">Disease</th>
                                <th className="p-2">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-b">
                                <td className="p-2">Glenn Stanley</td>
                                <td className="p-2">Cancer</td>
                                <td className="p-2 text-green-500">Outpatient</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2">Johanna Blake</td>
                                <td className="p-2">Diabetes</td>
                                <td className="p-2 text-blue-500">Recovered</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2">Dustin Ramsey</td>
                                <td className="p-2">Liver</td>
                                <td className="p-2 text-yellow-500">Under Treatment</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

const StatCard = ({ icon, title, value }: { icon: JSX.Element; title: string; value: string }) => (
    <div className="p-4 flex items-center justify-between bg-white shadow rounded-2xl">
        {icon}
        <div>
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

export default Dashboard;