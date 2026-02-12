import React from "react";

export const Dashboard = () => (
    <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm">Total Employees</p>
                <p className="text-3xl font-bold">128</p>
            </div>
        </div>
    </div>
);

export const Employees = () => (
    <div>
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500">Employee list will be here...</p>
        </div>
    </div>
);

export const AddEmployee = () => (
    <div>
        <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500">Form to add a new employee...</p>
        </div>
    </div>
);

export const Settings = () => (
    <div>
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500">System settings...</p>
        </div>
    </div>
);
