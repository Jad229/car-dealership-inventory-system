
import { FiHome, FiClock } from 'react-icons/fi'
import { GiHomeGarage } from "react-icons/gi";
import { TbUserQuestion } from "react-icons/tb";
import { BsPersonLinesFill } from "react-icons/bs";

export default function RouteSelector() {
    return (
        <div className='space-y-2'>
            <Route Icon={FiHome} selected={true} title="Dashboard" />
            <Route Icon={GiHomeGarage} selected={false} title="Inventory" />
            <Route Icon={FiClock} selected={false} title="Reservations" />
            <Route Icon={TbUserQuestion} selected={false} title="Inquiries" />
            <Route Icon={BsPersonLinesFill} selected={false} title="Customers" />


        </div>
    )
}

const Route = ({ Icon, selected, title }) => {
    return (
        <button className={`flex items-center justify-start w-full gap-2 px-2 py-1.5 text-sm rounded transition-[box-shadow,_background-color,_color] duration-300
         ${selected ? 'bg-white text-stone-950 shadow' : 'hover:bg-stone-200 text-stone-500 shadow-none'}`}>
            <Icon className='size-5' />
            <span className='text-md'>{title}</span>
        </button>
    )
}