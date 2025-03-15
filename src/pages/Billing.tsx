import { useState } from "react";

// Sample Payment Data for initial load
const initialPayments = [
    { id: 1, patient: "John Doe", amount: 100, method: "Credit Card" },
    { id: 2, patient: "Jane Smith", amount: 50, method: "Cash" },
    { id: 3, patient: "Samuel Green", amount: 75, method: "PayPal" }
];

function Billing() {
    const [payments, setPayments] = useState(initialPayments);
    const [newPayment, setNewPayment] = useState({ patient: "", amount: "", method: "" });
    const [editingPayment, setEditingPayment] = useState(null);

    // Function to add a new payment
    const addPayment = () => {
        if (newPayment.patient && newPayment.amount && newPayment.method) {
            const payment = { ...newPayment, id: payments.length + 1 };
            setPayments([...payments, payment]);
            setNewPayment({ patient: "", amount: "", method: "" });
        } else {
            alert("Please fill all fields.");
        }
    };

    // Function to delete a payment
    const deletePayment = (id) => {
        const filteredPayments = payments.filter((payment) => payment.id !== id);
        setPayments(filteredPayments);
    };

    // Function to update a payment
    const updatePayment = () => {
        if (editingPayment) {
            const updatedPayments = payments.map((payment) =>
                payment.id === editingPayment.id ? editingPayment : payment
            );
            setPayments(updatedPayments);
            setEditingPayment(null);
        }
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingPayment) {
            setEditingPayment({ ...editingPayment, [name]: value });
        } else {
            setNewPayment({ ...newPayment, [name]: value });
        }
    };

    // Function to edit a payment
    const editPayment = (payment) => {
        setEditingPayment(payment);
    };

    return (
        <div className="max-w-screen-xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Payment Management</h1>

            {/* Form to add or update a payment */}
            <div className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">{editingPayment ? "Edit Payment" : "Add New Payment"}</h2>

                <input
                    type="text"
                    name="patient"
                    placeholder="Patient's Name"
                    value={editingPayment ? editingPayment.patient : newPayment.patient}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={editingPayment ? editingPayment.amount : newPayment.amount}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="method"
                    placeholder="Payment Method"
                    value={editingPayment ? editingPayment.method : newPayment.method}
                    onChange={handleInputChange}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />

                {editingPayment ? (
                    <button
                        onClick={updatePayment}
                        className="w-full bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                    >
                        Update Payment
                    </button>
                ) : (
                    <button
                        onClick={addPayment}
                        className="w-full bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 transition duration-300"
                    >
                        Add Payment
                    </button>
                )}
            </div>

            {/* Payment Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {payments.map((payment) => (
                    <div key={payment.id} className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-2">{payment.patient}</h3>
                        <p className="text-gray-700 mb-2">Amount: ${payment.amount}</p>
                        <p className="text-gray-700 mb-2">Method: {payment.method}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => editPayment(payment)}
                                className="bg-yellow-500 text-white p-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deletePayment(payment.id)}
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

export default Billing;