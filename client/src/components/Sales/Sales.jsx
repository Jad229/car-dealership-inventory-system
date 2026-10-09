import { useState } from "react";
import MetricsOverview from "../shared/MetricsOverview";
import SalesTable from "./SalesTable";
import AddSale from "./AddSale";

export default function Sales() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
            <MetricsOverview />
            <div className="mb-4 flex justify-end">
                <AddSale onCreated={() => setRefreshKey((current) => current + 1)} />
            </div>
            <SalesTable refreshKey={refreshKey} />
        </div>
    );
}
