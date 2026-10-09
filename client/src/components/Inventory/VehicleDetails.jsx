import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const fieldClassName = "w-full rounded-md border border-gray-300 p-2 text-sm";

const emptyVehicle = {
    vin: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    asking_price: "",
    purchase_cost: "",
    color: "",
    status: "available",
};

export default function VehicleDetails() {
    // Get the vehicle ID from the URL
    const { vehicleId } = useParams();
    // State for the vehicle data
    const [vehicle, setVehicle] = useState(null);
    // State for the vehicle form data
    const [form, setForm] = useState(emptyVehicle);
    // State for the vehicle form to be open or closed
    const [isEditing, setIsEditing] = useState(false);
    // State for the error message
    const [error, setError] = useState("");
    // State for the missing vehicle
    const [missing, setMissing] = useState(false);

    useEffect(() => {
        const fetchVehicle = async () => {
            // Fetch the vehicle from the API
            const response = await fetch(`http://localhost:3000/api/vehicles/${vehicleId}`);
            const data = await response.json();
            const record = Array.isArray(data) ? data[0] : null;

            // If the vehicle is not found, set the missing state
            if (!record) {
                setMissing(true);
                return;
            }

            // Set the vehicle data
            setVehicle(record);
            // Set the vehicle form data
            setForm({
                vin: record.vin,
                make: record.make,
                model: record.model,
                year: record.year,
                mileage: record.mileage,
                asking_price: record.asking_price,
                purchase_cost: record.purchase_cost,
                color: record.color,
                status: record.status,
            });
        };

        fetchVehicle();
    }, [vehicleId]);

    // Update the vehicle form data
    const updateForm = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    // Handle the submission of the vehicle form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        // Build the request body
        const response = await fetch(`http://localhost:3000/api/vehicles/${vehicleId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                vin: form.vin,
                make: form.make,
                model: form.model,
                year: Number(form.year),
                mileage: Number(form.mileage),
                asking_price: Number(form.asking_price),
                purchase_cost: Number(form.purchase_cost),
                color: form.color,
                status: form.status,
            }),
        });
        const data = await response.json().catch(() => ({}));

        // If the response is not ok, set the error message
        if (!response.ok) {
            setError(data.message || "Could not update vehicle");
            return;
        }

        // If the vehicle is updated, set the vehicle data and form data
        const updated = Array.isArray(data) ? data[0] : null;
        // If the vehicle is updated, set the vehicle data and form data
        if (updated) {
            setVehicle(updated);
            setForm({
                vin: updated.vin,
                make: updated.make,
                model: updated.model,
                year: updated.year,
                mileage: updated.mileage,
                asking_price: updated.asking_price,
                purchase_cost: updated.purchase_cost,
                color: updated.color,
                status: updated.status,
            });
        }
        // Close the editing mode
        setIsEditing(false);
    };

    // If the vehicle is missing, show the missing vehicle page
    if (missing) {
        return (
            <div className="min-h-[calc(100vh-2rem)] rounded-lg bg-white p-4 shadow">
                <p className="text-sm text-stone-500">Vehicle not found.</p>
                <Link to="/inventory" className="mt-4 inline-block text-sm text-cyan-800">Back to inventory</Link>
            </div>
        );
    }

    // If the vehicle is not found, show the loading vehicle page
    if (!vehicle) {
        return (
            <div className="min-h-[calc(100vh-2rem)] rounded-lg bg-white p-4 shadow">
                <p className="text-sm text-stone-500">Loading vehicle...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-2rem)] rounded-lg bg-white p-4 shadow">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <Link to="/inventory" className="text-sm text-cyan-800">Back to inventory</Link>
                    <h1 className="mt-2 text-xl font-semibold text-stone-900">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={() => setIsEditing((open) => !open)}
                    className="rounded border border-cyan-800 px-3 py-2 text-sm text-cyan-800"
                >
                    {isEditing ? "Close" : "Edit"}
                </button>
            </div>

            <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                <Detail label="VIN" value={vehicle.vin} />
                <Detail label="Year" value={vehicle.year} />
                <Detail label="Make" value={vehicle.make} />
                <Detail label="Model" value={vehicle.model} />
                <Detail label="Mileage" value={Number(vehicle.mileage).toLocaleString()} />
                <Detail label="Asking price" value={currency.format(vehicle.asking_price)} />
                <Detail label="Purchase price" value={currency.format(vehicle.purchase_cost)} />
                <Detail label="Color" value={vehicle.color} />
                <Detail label="Status" value={vehicle.status} />
            </dl>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="mt-6 grid max-w-xl gap-3">
                    <label className="flex flex-col gap-1 text-sm">
                        VIN
                        <input name="vin" value={form.vin} onChange={updateForm} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Make
                        <input name="make" value={form.make} onChange={updateForm} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Model
                        <input name="model" value={form.model} onChange={updateForm} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Year
                        <input name="year" type="number" value={form.year} onChange={updateForm} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Mileage
                        <input name="mileage" type="number" value={form.mileage} onChange={updateForm} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Asking price
                        <input name="asking_price" type="number" step="0.01" value={form.asking_price} onChange={updateForm} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Purchase price
                        <input name="purchase_cost" type="number" step="0.01" value={form.purchase_cost} onChange={updateForm} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Color
                        <input name="color" value={form.color} onChange={updateForm} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Status
                        <select name="status" value={form.status} onChange={updateForm} className={fieldClassName}>
                            <option value="available">Available</option>
                            <option value="reserved">Reserved</option>
                            <option value="sold">Sold</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </label>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    <button type="submit" className="w-fit rounded bg-cyan-500 px-3 py-2 text-sm text-stone-950">
                        Save changes
                    </button>
                </form>
            ) : null}
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div className="rounded border border-stone-200 p-3">
            <dt className="text-stone-500">{label}</dt>
            <dd className="mt-1 capitalize text-stone-900">{value}</dd>
        </div>
    );
}
