import MetricsOverview from "../shared/MetricsOverview";
import SalesTable from "./SalesTable";

export default function Sales() {
    return (
        <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
            <MetricsOverview />
            <SalesTable />
        </div>
    )
}