import { useEffect, useState } from "react";
import RecordRow from "../shared/RecordRow";

// Headers for the inventory table
const headers = [
    { label: 'Year', key: 'year' },
    { label: 'Make', key: 'make' },
    { label: 'Model', key: 'model' },
    { label: 'Mileage', key: 'mileage' },
    { label: 'Price', key: 'price' },
    { label: 'Purchase Price', key: 'purchasePrice' },
    { label: 'Status', key: 'status' },
    { label: 'Color', key: 'color' },
    { label: 'VIN', key: 'vin' },
]

// Formatter for the price
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// Status badge classes for the inventory table
const statusBadge = {
    available: 'bg-green-500',
    reserved: 'bg-yellow-400',
    sold: 'bg-red-500',
    maintenance: 'bg-red-500',
};

// Status styles for the inventory table
const statusStyles = {
    available: 'bg-green-300 text-green-900',
    reserved: 'bg-yellow-300 text-yellow-900',
    sold: 'bg-red-300 text-red-900',
    maintenance: 'bg-red-300 text-red-900',
};

// Color styles for the inventory table
const colorStyles = {
    silver: 'bg-stone-200 text-stone-800',
    gray: 'bg-gray-300 text-gray-900',
    grey: 'bg-gray-300 text-gray-900',
    blue: 'bg-blue-300 text-blue-900',
    black: 'bg-stone-900 text-white',
    white: 'bg-white text-stone-900',
    red: 'bg-red-300 text-red-900',
    green: 'bg-green-300 text-green-900',
    gold: 'bg-amber-300 text-amber-900',
};

export default function InventoryTable({ query, refreshKey }) {
    const [vehicles, setVehicles] = useState([]);

    // Fetch the vehicles from the API
    useEffect(() => {
        const fetchVehicles = async () => {
            // Build the query parameters
            const params = new URLSearchParams();
            // Add the query parameters to the URL
            Object.entries(query).forEach(([key, value]) => {
                if (value !== "") params.set(key, value);
            });

            const response = await fetch(`http://localhost:3000/api/vehicles?${params}`);
            const data = await response.json();
            setVehicles(data);
        }
        fetchVehicles();
    }, [query, refreshKey]);


    return (
        <div className="w-full">
            <div className="flex mb-4 items-center justify-between p-6 shadow-md border border-gray-200 text-sm">
                {headers.map(header => <VehicleCell key={header.key} value={header.label} />)}
            </div>
            <div className="text-start space-y-2">
                {vehicles.map(vehicle => <VehicleRow key={vehicle.vehicle_id} {...vehicle} />)}
            </div>
        </div>

    )
}

export const VehicleRow = ({ vin, make, model, year, mileage, asking_price, purchase_cost, status, color }) => {
    return (
        <RecordRow statusClass={statusBadge[status] ?? 'bg-stone-300'}>
            <span className="w-1/12">{year}</span>
            <span className="w-1/12">{make}</span>
            <span className="w-1/12">{model}</span>
            <span className="w-1/12">{mileage}</span>
            <span className="w-1/12">{formatter.format(asking_price)}</span>
            <span className="w-1/12">{formatter.format(purchase_cost)}</span>
            <span className={`w-1/12 p-0.5 rounded-full capitalize border border-stone-300 ${statusStyles[status] ?? 'bg-stone-100 text-stone-700'}`}>{status}</span>
            <span className={`w-1/12 p-0.5 rounded-full border border-stone-300 ${colorStyles[color?.toLowerCase()] ?? 'bg-stone-100 text-stone-700'}`}>{color}</span>
            <span className="w-1/12 truncate">{vin}</span>
        </RecordRow>
    )
}

export const VehicleCell = ({ value }) => {
    return (
        <div className="text-center w-1/12">{value}</div>
    )
}
