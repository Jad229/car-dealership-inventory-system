import MetricsOverview from "../Dashboard/MetricsOverview";
import ReservationsTable from "./ReservationsTable";

export default function Reservations() {
    return (
        <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
            <MetricsOverview />
            <ReservationsTable />
        </div>
    )
}