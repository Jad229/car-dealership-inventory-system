import SearchBar from './SearchBar'
import MetricsOverview from '../shared/MetricsOverview'
import InventoryTable from './InventoryTable'
export default function Inventory() {
    return (
        <div className='bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]'>
            <MetricsOverview />
            <SearchBar />
            <InventoryTable />
        </div>
    )
}
