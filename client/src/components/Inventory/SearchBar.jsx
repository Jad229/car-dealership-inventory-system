import { FiSearch } from "react-icons/fi";
import FilterPanel from "../shared/FilterPanel";
import AddVehicle from "./AddVehicle";

export default function SearchBar({ query, updateQuery, onCreated }) {
    return (
        <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex relative items-center bg-stone-200 rounded p-2 max-w-sm">
                <FiSearch className="mr-2" />
                <input
                    name="search"
                    type="text"
                    placeholder="Search"
                    value={query.search}
                    onChange={updateQuery}
                    className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
                />
            </div>
            <div className="flex items-center gap-2">
                <AddVehicle onCreated={onCreated} />
                <FilterPanel query={query} updateQuery={updateQuery} />
            </div>
        </div>
    );
}
