export default function RecordRow({ children, statusClass }) {
    return (
        <div className={`flex w-full items-stretch border border-gray-200 text-sm shadow-md ${statusClass ? "border-l-0" : ""}`}>
            {statusClass ? <span className={`-my-px w-1.5 shrink-0 ${statusClass}`} /> : null}
            <div className="flex flex-1 items-center justify-between p-6 text-center">
                {children}
            </div>
        </div>
    )
}
