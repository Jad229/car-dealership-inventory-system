import { useState } from "react";
import MetricsOverview from "../shared/MetricsOverview";
import InquiriesTable from "./InquiriesTable";
import AddInquiry from "./AddInquiry";

export default function Inquiries() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
            <MetricsOverview />
            <div className="mb-4 flex justify-end">
                <AddInquiry onCreated={() => setRefreshKey((current) => current + 1)} />
            </div>
            <InquiriesTable refreshKey={refreshKey} />
        </div>
    );
}
