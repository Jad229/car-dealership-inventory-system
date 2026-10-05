import { useEffect, useState } from "react";
import RecordRow from "../shared/RecordRow";

const statusBadge = {
    pending: "bg-yellow-400",
    confirmed: "bg-green-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
    expired: "bg-red-500",
}

const headers = [
    { label: 'Customer', key: 'customer_id' },
    { label: 'Vehicle', key: 'vehicle_id' },
    { label: 'Date Reserved', key: 'reservation_date' },
    { label: 'Status', key: 'status' },
]

export default function ReservationsTable() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            const response = await fetch('http://localhost:3000/api/reservations');
            const data = await response.json();
            setReservations(data);
        }
        fetchReservations();
    }, []);
    console.log(reservations);
    return (
        <div className="w-full">
            <div className="flex mb-4 items-center justify-between p-6 shadow-md border border-gray-200 text-sm">

                {headers.map(header => <span className="text-center w-1/4" key={header.key}>{header.label}</span>)}
            </div>
            <div className="text-start space-y-2">
                {reservations.map(reservation => <ReservationRow key={reservation.reservatuib_id} {...reservation} />)}
            </div>
        </div>
    )
}

const ReservationRow = ({ customer_id, vehicle_id, reservation_date, status }) => {
    const date = new Date(reservation_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <RecordRow statusClass={statusBadge[status] ?? "bg-stone-300"}>
            <span className="w-1/4">{customer_id}</span>
            <span className="w-1/4">{vehicle_id}</span>
            <span className="w-1/4">{date}</span>
            <span className="w-1/4">{status}</span>
        </RecordRow>
    )
}