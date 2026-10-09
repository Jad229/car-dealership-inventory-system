import { useState } from "react";
import SearchBar from "./SearchBar";
import MetricsOverview from "../shared/MetricsOverview";
import InventoryTable from "./InventoryTable";

export default function Inventory() {
    // Query state for the inventory table
    const [refreshKey, setRefreshKey] = useState(0);
    const [query, setQuery] = useState({
        search: "",
        make: "",
        model: "",
        year: "",
        color: "",
        sort: "year",
        order: "DESC",
    });

    // Update the query state
    const updateQuery = (event) => {
        const { name, value } = event.target;
        setQuery((current) => ({ ...current, [name]: value }));
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
            <MetricsOverview />
            <SearchBar
                query={query}
                updateQuery={updateQuery}
                onCreated={() => setRefreshKey((current) => current + 1)}
            />
            <InventoryTable query={query} refreshKey={refreshKey} />
        </div>
    );
}
