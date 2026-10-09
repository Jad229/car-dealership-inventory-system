import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const emptyInquiry = {
    customer_id: "",
    vehicle_id: "",
    inquiry_date: "",
    status: "new",
    notes: "",
};

const fieldClassName = "w-full rounded-md border border-gray-300 p-2 text-sm";

export default function AddInquiry({ onCreated }) {

    // State for the inquiry form to be open or closed
    const [isOpen, setIsOpen] = useState(false);
    // State for the inquiry form data
    const [inquiry, setInquiry] = useState(emptyInquiry);
    // State for the error message
    const [error, setError] = useState("");

    // Update the inquiry state
    const updateInquiry = (event) => {
        const { name, value } = event.target;
        setInquiry((current) => ({ ...current, [name]: value }));
    };

    // Handle the submission of the inquiry form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        // Build the request body
        const response = await fetch("http://localhost:3000/api/inquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer_id: Number(inquiry.customer_id),
                vehicle_id: Number(inquiry.vehicle_id),
                inquiry_date: new Date(inquiry.inquiry_date).toISOString(),
                status: inquiry.status,
                notes: inquiry.notes,
            }),
        });
        const data = await response.json().catch(() => ({}));

        // If the response is not ok, set the error message
        if (!response.ok) {
            setError(data.message || "Could not add inquiry");
            return;
        }

        // Reset the inquiry form
        setInquiry(emptyInquiry);
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
                        <input name="customer_id" type="number" value={inquiry.customer_id} onChange={updateInquiry} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Vehicle ID
                        <input name="vehicle_id" type="number" value={inquiry.vehicle_id} onChange={updateInquiry} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Date
                        <input name="inquiry_date" type="datetime-local" value={inquiry.inquiry_date} onChange={updateInquiry} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Status
                        <select name="status" value={inquiry.status} onChange={updateInquiry} className={fieldClassName}>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Notes
                        <input name="notes" value={inquiry.notes} onChange={updateInquiry} className={fieldClassName} />
                    </label>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    <button type="submit" className="rounded bg-cyan-500 px-3 py-2 text-sm text-stone-950">
                        Save inquiry
                    </button>
                </div>
            </form>
        </div>
    );
}
