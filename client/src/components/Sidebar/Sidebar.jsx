import AccountToggle from "./AccountToggle";
import RouteSelector from "./RouteSelector";

export default function Sidebar() {
    return (
        <div>
            <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-2rem)]">
                <AccountToggle />
                <RouteSelector />
            </div>
            {/* TODO FOOTER */}
        </div>
    )
}
