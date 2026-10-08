import { FiSearch } from "react-icons/fi";
import FilterPanel from "../shared/FilterPanel";

export default function SearchBar() {
    return (
        <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex relative items-center bg-stone-200 rounded p-2 max-w-sm">
                <FiSearch className="mr-2" />
                <input type="text" placeholder="Search" className="w-full bg-transparent  placeholder:text-stone-400 focus:outline-none" />
            </div>
            <div>
                <FilterPanel></FilterPanel>
            </div>
        </div>
    )
}
