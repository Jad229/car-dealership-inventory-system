import { useState } from "react";
import { FiPlus } from "react-icons/fi";

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

const fieldClassName = "w-full rounded-md border border-gray-300 p-2 text-sm";

export default function AddVehicle({ onCreated }) {
    // State for the vehicle form to be open or closed
    const [isOpen, setIsOpen] = useState(false);
    // State for the vehicle form data
    const [vehicle, setVehicle] = useState(emptyVehicle);
    // State for the error message
    const [error, setError] = useState("");
    // Update the vehicle state

    // Update the vehicle state
    const updateVehicle = (event) => {
        const { name, value } = event.target;
        setVehicle((current) => ({ ...current, [name]: value }));
    };

    // Handle the submission of the vehicle form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        // Build the request body
        const response = await fetch("http://localhost:3000/api/vehicles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...vehicle,
                year: Number(vehicle.year),
                mileage: Number(vehicle.mileage),
                asking_price: Number(vehicle.asking_price),
                purchase_cost: Number(vehicle.purchase_cost),
            }),
        });

        // If the response is not ok, set the error message
        if (!response.ok) {
            setError("Could not add vehicle");
            return;
        }

        // Reset the vehicle form
        setVehicle(emptyVehicle);
        setIsOpen(false);
        onCreated();
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex items-center justify-center gap-2 rounded border border-cyan-800 px-3 py-2 text-sm text-cyan-800"
                aria-expanded={isOpen}
            >
                <FiPlus className="size-4" />
                Add
            </button>
            <form
                onSubmit={handleSubmit}
                className={`${isOpen ? "block" : "hidden"} absolute right-0 top-full z-10 mt-2 w-80 rounded-lg bg-white p-4 shadow-md`}
            >
                <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1 text-sm">
                        VIN
                        <input name="vin" value={vehicle.vin} onChange={updateVehicle} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Make
                        <input name="make" value={vehicle.make} onChange={updateVehicle} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Model
                        <input name="model" value={vehicle.model} onChange={updateVehicle} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Year
                        <input name="year" type="number" value={vehicle.year} onChange={updateVehicle} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Mileage
                        <input name="mileage" type="number" value={vehicle.mileage} onChange={updateVehicle} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Asking price
                        <input name="asking_price" type="number" step="0.01" value={vehicle.asking_price} onChange={updateVehicle} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Purchase price
                        <input name="purchase_cost" type="number" step="0.01" value={vehicle.purchase_cost} onChange={updateVehicle} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Color
                        <input name="color" value={vehicle.color} onChange={updateVehicle} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Status
                        <select name="status" value={vehicle.status} onChange={updateVehicle} className={fieldClassName}>
                            <option value="available">Available</option>
                            <option value="reserved">Reserved</option>
                            <option value="sold">Sold</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </label>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    <button type="submit" className="rounded bg-cyan-500 px-3 py-2 text-sm text-stone-950">
                        Save vehicle
                    </button>
                </div>
            </form>
        </div>
    );
}
