import { useEffect, useState } from "react";
import { IoStatsChart } from "react-icons/io5";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export default function Dashboard() {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            const response = await fetch("http://localhost:3000/api/dashboard");
            const data = await response.json();
            setMetrics(data);
        };
        fetchDashboard();
    }, []);

    return (
        <div className="min-h-[calc(100vh-2rem)] rounded-lg bg-white p-4 shadow">
            <div className="mb-4 grid grid-cols-3 gap-4 text-center">
                <MetricsCard
                    title="Inventory Value"
                    value={metrics ? currency.format(metrics.inventoryValue) : "—"}
                />
                <MetricsCard
                    title="Sales Revenue"
                    value={metrics ? currency.format(metrics.salesRevenue) : "—"}
                />
                <MetricsCard
                    title="Average Sale Price"
                    value={metrics ? currency.format(metrics.averageSalePrice) : "—"}
                />
            </div>

            <section className="mb-4">
                <h2 className="mb-2 text-sm font-medium text-stone-500">Inventory by status</h2>
                <div className="grid grid-cols-4 gap-4 text-center">
                    {(metrics?.inventoryByStatus ?? []).map((item) => (
                        <MetricsCard
                            key={item.status}
                            title={item.status}
                            value={item.count}
                        />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="mb-2 text-sm font-medium text-stone-500">Most inquired vehicles</h2>
                <div className="overflow-hidden rounded border border-stone-200 shadow-md">
                    {(metrics?.mostInquiredVehicles ?? []).map((vehicle) => (
                        <div
                            key={vehicle.vehicle_id}
                            className="flex items-center justify-between border-b border-stone-200 px-4 py-3 text-sm last:border-b-0"
                        >
                            <span>{vehicle.year} {vehicle.make} {vehicle.model}</span>
                            <span className="text-stone-500">
                                {vehicle.inquiry_count} {vehicle.inquiry_count === 1 ? "inquiry" : "inquiries"}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

const MetricsCard = ({ title, value }) => {
    return (
        <div className="grid h-32 w-full rounded border border-stone-200 shadow-md">
            <div className="flex items-center justify-center gap-2">
                <IoStatsChart className="size-5 rounded-full bg-cyan-500 p-0.5 text-cyan-800" />
                <span className="capitalize">{title}</span>
            </div>
            <div className="text-4xl">{value}</div>
        </div>
    );
};
