import MetricsOverview from "../shared/MetricsOverview";
import InquiriesTable from "./InquiriesTable";

export default function Inquiries() {
    return (
        <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
            <MetricsOverview />
            <InquiriesTable />
        </div>
    )
}
