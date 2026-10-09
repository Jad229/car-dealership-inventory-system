import { FiFilter } from "react-icons/fi";
import { useState } from "react";

const sortOptions = [
    { value: "year", label: "Year" },
    { value: "make", label: "Make" },
    { value: "model", label: "Model" },
    { value: "color", label: "Color" },
    { value: "mileage", label: "Mileage" },
    { value: "asking_price", label: "Price" },
];

const fieldClassName = "w-full rounded-md border border-gray-300 p-2 text-sm";

export default function FilterPanel({ query, updateQuery }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex items-center justify-center gap-2 rounded border border-cyan-800 p-2 text-cyan-800"
                aria-expanded={isOpen}
                aria-label="Filters"
            >
                <FiFilter className="size-3 fill-cyan-800" />
            </button>
            <form
                onSubmit={(event) => event.preventDefault()}
                className={`${isOpen ? "block" : "hidden"} absolute right-0 top-full z-10 mt-2 w-64 rounded-lg bg-white p-4 shadow-md`}
            >
                <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1 text-sm">
                        Make
                        <input
                            name="make"
                            value={query.make}
                            onChange={updateQuery}
                            className={fieldClassName}
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Model
                        <input
                            name="model"
                            value={query.model}
                            onChange={updateQuery}
                            className={fieldClassName}
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Year
                        <input
                            name="year"
                            type="number"
                            value={query.year}
                            onChange={updateQuery}
                            className={fieldClassName}
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Color
                        <input
                            name="color"
                            value={query.color}
                            onChange={updateQuery}
                            className={fieldClassName}
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Sort
                        <select
                            name="sort"
                            value={query.sort}
                            onChange={updateQuery}
                            className={fieldClassName}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                        Order
                        <select
                            name="order"
                            value={query.order}
                            onChange={updateQuery}
                            className={fieldClassName}
                        >
                            <option value="DESC">Descending</option>
                            <option value="ASC">Ascending</option>
                        </select>
                    </label>
                </div>
            </form>
        </div>
    )
}
