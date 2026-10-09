import { useEffect, useState } from "react";
import RecordRow from "../shared/RecordRow";

const headers = [
    { label: "Customer", key: "customer_id" },
    { label: "Vehicle", key: "vehicle_id" },
    { label: "Date", key: "inquiry_date" },
    { label: "Status", key: "status" },
    { label: "Notes", key: "notes" },
]

const statusBadge = {
    new: "bg-blue-500",
    contacted: "bg-yellow-400",
    qualified: "bg-green-500",
    cancelled: "bg-red-500",
}

const statusStyles = {
    new: "bg-blue-300 text-blue-900",
    contacted: "bg-yellow-300 text-yellow-900",
    qualified: "bg-green-300 text-green-900",
    cancelled: "bg-red-300 text-red-900",
}

export default function InquiriesTable({ refreshKey }) {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        const fetchInquiries = async () => {
            const response = await fetch("http://localhost:3000/api/inquiries");
            const data = await response.json();
            setInquiries(data);
        }
        fetchInquiries();
    }, [refreshKey]);

    return (
        <div className="w-full overflow-x-auto">
            <div className="mb-4 flex min-w-[720px] items-center justify-between border border-gray-200 p-6 text-sm shadow-md">
                {headers.map(header => (
                    <span className="w-1/5 text-center" key={header.key}>{header.label}</span>
                ))}
            </div>
            <div className="min-w-[720px] space-y-2">
                {inquiries.map(inquiry => (
                    <InquiryRow key={inquiry.inquiry_id} {...inquiry} />
                ))}
            </div>
        </div>
    )
}

const InquiryRow = ({ name, vehicle_id, inquiry_date, status, notes }) => {
    const date = new Date(inquiry_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <RecordRow statusClass={statusBadge[status] ?? "bg-stone-300"}>
            <span className="w-1/5">{name}</span>
            <span className="w-1/5">{vehicle_id}</span>
            <span className="w-1/5">{date}</span>
            <span className={`w-1/5 rounded-full border border-stone-300 p-0.5 capitalize ${statusStyles[status] ?? "bg-stone-100 text-stone-700"}`}>
                {status}
            </span>
            <span className="w-1/5 min-w-0 truncate" title={notes}>{notes}</span>
        </RecordRow>
    )
}
