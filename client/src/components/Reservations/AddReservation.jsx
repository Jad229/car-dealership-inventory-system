import { useState } from "react";
import { FiPlus } from "react-icons/fi";

// helpful object to reset the reservation form or initialize the form
const emptyReservation = {
    customer_id: "",
    vehicle_id: "",
    reservation_date: "",
    status: "pending",
};

const fieldClassName = "w-full rounded-md border border-gray-300 p-2 text-sm";

export default function AddReservation({ onCreated }) {
    // State for the reservation form to be open or closed
    const [isOpen, setIsOpen] = useState(false);
    // State for the reservation form data
    const [reservation, setReservation] = useState(emptyReservation);
    // State for the error message
    const [error, setError] = useState("");
    // Update the reservation state

    const updateReservation = (event) => {
        const { name, value } = event.target;
        setReservation((current) => ({ ...current, [name]: value }));
    };

    // Handle the submission of the reservation form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        // Build the request body
        const response = await fetch("http://localhost:3000/api/reservations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer_id: Number(reservation.customer_id),
                vehicle_id: Number(reservation.vehicle_id),
                reservation_date: new Date(reservation.reservation_date).toISOString(),
                status: reservation.status,
            }),
        });
        const data = await response.json().catch(() => ({}));
        // If the response is not ok, set the error message
        if (!response.ok) {
            setError(data.message || "Could not add reservation");
            return;
        }
        // Reset the reservation form
        setReservation(emptyReservation);
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
                        Customer ID
                        <input name="customer_id" type="number" value={reservation.customer_id} onChange={updateReservation} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Vehicle ID
                        <input name="vehicle_id" type="number" value={reservation.vehicle_id} onChange={updateReservation} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Date
                        <input name="reservation_date" type="datetime-local" value={reservation.reservation_date} onChange={updateReservation} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Status
                        <select name="status" value={reservation.status} onChange={updateReservation} className={fieldClassName}>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="expired">Expired</option>
                        </select>
                    </label>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    <button type="submit" className="rounded bg-cyan-500 px-3 py-2 text-sm text-stone-950">
                        Save reservation
                    </button>
                </div>
            </form>
        </div>
    );
}
