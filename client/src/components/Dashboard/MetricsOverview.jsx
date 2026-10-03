import { IoStatsChart } from "react-icons/io5";

export default function MetricsOverview() {
    return (
        <div className="grid grid-cols-4 gap-4 rounded-lg items-center justify-center text-center mb-4">
            <MetricsCard title="Stock" value={102} Icon={IoStatsChart} />
            <MetricsCard title="Inventory Value" value={"$856k"} Icon={IoStatsChart} />
            <MetricsCard title="Total Customers" value={56} Icon={IoStatsChart} />
            <MetricsCard title="Sales" value={"$157k"} Icon={IoStatsChart} />
        </div>
    )
}

const MetricsCard = ({ title, value, Icon }) => {
    return (
        <div className="grid shadow-md border border-stone-200 rounded w-full h-32">
            <div className="flex items-center justify-center gap-2">
                <Icon className='size-5 bg-cyan-500 rounded-full p-0.5 text-cyan-800' />
                <span className="text-md"> {title}</span>
            </div>
            <div className="text-4xl">{value}</div>
        </div>
    )
}