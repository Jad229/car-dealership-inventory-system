import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const emptySale = {
    customer_id: "",
    staff_id: "",
    vehicle_id: "",
    sale_date: "",
    sale_price: "",
};

const fieldClassName = "w-full rounded-md border border-gray-300 p-2 text-sm";

export default function AddSale({ onCreated }) {
    // State for the sale form to be open or closed
    const [isOpen, setIsOpen] = useState(false);
    // State for the sale form data
    const [sale, setSale] = useState(emptySale);
    // State for the error message
    const [error, setError] = useState("");

    // Update the sale state
    const updateSale = (event) => {
        const { name, value } = event.target;
        setSale((current) => ({ ...current, [name]: value }));
    };

    // Handle the submission of the sale form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const response = await fetch("http://localhost:3000/api/sales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer_id: Number(sale.customer_id),
                staff_id: Number(sale.staff_id),
                vehicle_id: Number(sale.vehicle_id),
                sale_date: new Date(sale.sale_date).toISOString(),
                sale_price: Number(sale.sale_price),
            }),
        });
        const data = await response.json().catch(() => ({}));

        // If the response is not ok, set the error message
        if (!response.ok) {
            setError(data.message || "Could not complete sale");
            return;
        }

        // Reset the sale form
        setSale(emptySale);
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
                        <input name="customer_id" type="number" value={sale.customer_id} onChange={updateSale} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Staff ID
                        <input name="staff_id" type="number" value={sale.staff_id} onChange={updateSale} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Vehicle ID
                        <input name="vehicle_id" type="number" value={sale.vehicle_id} onChange={updateSale} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Date
                        <input name="sale_date" type="datetime-local" value={sale.sale_date} onChange={updateSale} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Sale price
                        <input name="sale_price" type="number" step="0.01" value={sale.sale_price} onChange={updateSale} required className={fieldClassName} />
                    </label>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    <button type="submit" className="rounded bg-cyan-500 px-3 py-2 text-sm text-stone-950">
                        Complete sale
                    </button>
                </div>
            </form>
        </div>
    );
}
