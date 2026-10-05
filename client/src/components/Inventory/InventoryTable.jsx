import { useEffect, useState } from "react";
import RecordRow from "../shared/RecordRow";

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

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const statusBadge = {
    available: 'bg-green-500',
    reserved: 'bg-yellow-400',
    sold: 'bg-red-500',
    maintenance: 'bg-red-500',
};

const statusStyles = {
    available: 'bg-green-300 text-green-900',
    reserved: 'bg-yellow-300 text-yellow-900',
    sold: 'bg-red-300 text-red-900',
    maintenance: 'bg-red-300 text-red-900',
};

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

export default function InventoryTable() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const response = await fetch('http://localhost:3000/api/vehicles');
            const data = await response.json();

            setVehicles(data);
        }
        fetchVehicles();
    }, []);


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

export const VehicleRow = ({ vin, make, model, year, mileage, asking_price, purchase_price, status, color }) => {
    return (
        <RecordRow statusClass={statusBadge[status] ?? 'bg-stone-300'}>
            <span className="w-1/12">{year}</span>
            <span className="w-1/12">{make}</span>
            <span className="w-1/12">{model}</span>
            <span className="w-1/12">{mileage}</span>
            <span className="w-1/12">{formatter.format(asking_price)}</span>
            <span className="w-1/12">{purchase_price}</span>
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
