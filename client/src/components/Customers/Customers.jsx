import { useState } from "react";
import MetricsOverview from "../shared/MetricsOverview";
import CustomersTable from "./CustomersTable";
import AddCustomer from "./AddCustomer";

export default function Customers() {
    // State used for refreshing the customers table
    // This is used to force a re-render of the customers table when a customer is created
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
            <MetricsOverview />
            <div className="mb-4 flex justify-end">
                <AddCustomer onCreated={() => setRefreshKey((current) => current + 1)} />
            </div>
            <CustomersTable refreshKey={refreshKey} />
        </div>
    );
}
