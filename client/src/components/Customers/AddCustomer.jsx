import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const emptyCustomer = {
    name: "",
    email: "",
    phone: "",
};

const fieldClassName = "w-full rounded-md border border-gray-300 p-2 text-sm";

export default function AddCustomer({ onCreated }) {
    const [isOpen, setIsOpen] = useState(false);
    const [customer, setCustomer] = useState(emptyCustomer);
    const [error, setError] = useState("");

    const updateCustomer = (event) => {
        const { name, value } = event.target;
        setCustomer((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const response = await fetch("http://localhost:3000/api/customers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer),
        });

        if (!response.ok) {
            setError("Could not add customer");
            return;
        }

        setCustomer(emptyCustomer);
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
                        Name
                        <input name="name" value={customer.name} onChange={updateCustomer} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Email
                        <input name="email" type="email" value={customer.email} onChange={updateCustomer} required className={fieldClassName} />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Phone
                        <input name="phone" value={customer.phone} onChange={updateCustomer} required className={fieldClassName} />
                    </label>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    <button type="submit" className="rounded bg-cyan-500 px-3 py-2 text-sm text-stone-950">
                        Save customer
                    </button>
                </div>
            </form>
        </div>
    );
}
