import { FiFilter } from "react-icons/fi";
import { useState } from "react";

export default function FilterPanel({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className="relative">
            <button onClick={handleClick} className="flex items-center justify-center gap-2 rounded p-2 border border-cyan-800 text-cyan-800">
                <FiFilter className="size-3 fill-cyan-800" />
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} absolute top-0 right-0 bg-white rounded-lg p-4 shadow-md`}>
                <form action="">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="search">Search</label>
                        <input type="text" id="search" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="sort">Sort</label>
                        <select id="sort" className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}