import { NavLink } from 'react-router-dom'
import { FiHome, FiClock } from 'react-icons/fi'
import { GiHomeGarage } from "react-icons/gi";
import { TbUserQuestion } from "react-icons/tb";
import { BsPersonLinesFill } from "react-icons/bs";

const routes = [
    { Icon: FiHome, title: "Dashboard", to: "/", end: true },
    { Icon: GiHomeGarage, title: "Inventory", to: "/inventory" },
    { Icon: FiClock, title: "Reservations", to: "/reservations" },
    { Icon: TbUserQuestion, title: "Inquiries", to: "/inquiries" },
    { Icon: BsPersonLinesFill, title: "Customers", to: "/customers" },
]

export default function RouteSelector() {
    return (
        <div className='space-y-2'>
            {routes.map(({ Icon, title, to, end }) => (
                <Route key={to} Icon={Icon} title={title} to={to} end={end} />
            ))}
        </div>
    )
}

const routeClassName = ({ isActive }) =>
    `flex items-center justify-start w-full gap-2 px-2 py-1.5 text-sm rounded transition-[box-shadow,_background-color,_color] duration-300 ${
        isActive
            ? 'bg-cyan-500 text-stone-950 shadow'
            : 'hover:bg-stone-200 text-stone-500 shadow-none'
    }`

const Route = ({ Icon, title, to, end }) => {
    return (
        <NavLink to={to} end={end} className={routeClassName}>
            <Icon className='size-5' />
            <span className='text-md'>{title}</span>
        </NavLink>
    )
}
