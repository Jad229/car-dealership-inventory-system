import { FiSearch, FiFilter } from "react-icons/fi";

export default function SearchBar() {
    return (
        <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex relative items-center bg-stone-200 rounded p-2 max-w-sm">
                <FiSearch className="mr-2" />
                <input type="text" placeholder="Search" className="w-full bg-transparent  placeholder:text-stone-400 focus:outline-none" />
            </div>
            <div>
                <Filter />
            </div>
        </div>
    )
}

const Filter = () => {
    return (
        <button className="flex items-center justify-center gap-2 rounded p-2 border border-cyan-800 text-cyan-800">
            <FiFilter className="size-3 fill-cyan-800" />
        </button>
    )
}