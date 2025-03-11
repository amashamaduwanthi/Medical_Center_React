import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, FileText, Stethoscope, Activity } from "lucide-react";

const patientData = [
    { name: "Jan", patients: 400 },
    { name: "Feb", patients: 300 },
    { name: "Mar", patients: 500 },
    { name: "Apr", patients: 600 },
];

const revenueData = [
    { name: "Jan", revenue: 5000 },
    { name: "Feb", revenue: 7000 },
    { name: "Mar", revenue: 8000 },
    { name: "Apr", revenue: 9000 },
];

function Dashboard() {
    return (
        <div className="p-6 bg-blue-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-center">Medical Center Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 flex items-center justify-between bg-white shadow rounded-2xl">
                    <Users className="w-10 h-10 text-blue-500" />
                    <div>
                        <p className="text-lg font-semibold">Total Patients</p>
                        <p className="text-2xl font-bold">1,230</p>
                    </div>
                </div>
                <div className="p-4 flex items-center justify-between bg-white shadow rounded-2xl">
                    <Stethoscope className="w-10 h-10 text-green-500" />
                    <div>
                        <p className="text-lg font-semibold">Appointments Today</p>
                        <p className="text-2xl font-bold">45</p>
                    </div>
                </div>
                <div className="p-4 flex items-center justify-between bg-white shadow rounded-2xl">
                    <FileText className="w-10 h-10 text-yellow-500" />
                    <div>
                        <p className="text-lg font-semibold">Reports Pending</p>
                        <p className="text-2xl font-bold">12</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-6 bg-white shadow rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4">Patient Visits</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={patientData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="patients" fill="#3b82f6" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Additional Dashboard Section */}
            <div className="mt-12 bg-gray-100 p-6 rounded-xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Financial Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 flex items-center justify-between bg-white shadow rounded-2xl">
                        <Activity className="w-10 h-10 text-purple-500" />
                        <div>
                            <p className="text-lg font-semibold">Monthly Revenue</p>
                            <p className="text-2xl font-bold">$25,000</p>
                        </div>
                    </div>
                    <div className="p-6 bg-white shadow rounded-2xl">
                        <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#f59e0b" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
