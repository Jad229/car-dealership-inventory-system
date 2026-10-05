import MetricsOverview from "../Dashboard/MetricsOverview";
import CustomersTable from "./CustomersTable";

export default function Customers() {
    return (
        <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
            <MetricsOverview />
            <CustomersTable />
        </div>
    )
}
