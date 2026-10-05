import { useEffect, useState } from "react";
import RecordRow from "../shared/RecordRow";

const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
]

export default function CustomersTable() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch("http://localhost:3000/api/customers");
            const data = await response.json();
            setCustomers(data);
        }
        fetchCustomers();
    }, []);

    return (
        <div className="w-full overflow-x-auto">
            <div className="mb-4 flex min-w-[480px] items-center justify-between border border-gray-200 p-6 text-sm shadow-md">
                {headers.map(header => (
                    <span className="w-1/3 text-center" key={header.key}>{header.label}</span>
                ))}
            </div>
            <div className="min-w-[480px] space-y-2">
                {customers.map(customer => (
                    <CustomerRow key={customer.customer_id} {...customer} />
                ))}
            </div>
        </div>
    )
}

const CustomerRow = ({ name, email, phone }) => {
    return (
        <RecordRow>
            <span className="w-1/3">{name}</span>
            <span className="w-1/3 min-w-0 truncate">{email}</span>
            <span className="w-1/3">{phone}</span>
        </RecordRow>
    )
}
