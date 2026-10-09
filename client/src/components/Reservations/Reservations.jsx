import { useState } from "react";
import MetricsOverview from "../shared/MetricsOverview";
import ReservationsTable from "./ReservationsTable";
import AddReservation from "./AddReservation";

export default function Reservations() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
            <MetricsOverview />
            <div className="mb-4 flex justify-end">
                <AddReservation onCreated={() => setRefreshKey((current) => current + 1)} />
            </div>
            <ReservationsTable refreshKey={refreshKey} />
        </div>
    );
}
