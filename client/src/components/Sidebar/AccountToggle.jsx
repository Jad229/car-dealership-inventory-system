import { FiChevronDown, FiChevronUp } from 'react-icons/fi'


export default function AccountToggle() {
    return (
        <div className='border-b mb-4 mt-2 pb-4 border-stone-300'>
            <button className='flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center'>
                <img src="https://api.dicebear.com/10.x/voxel-bot/svg" alt="avatar" className='size-8 rounded shrink-0 shadow bg-violet-400' />
                <div className='text-start'>
                    <span className='text-sm font-bold block'>Ideal Car Corp</span
                    ><span className='text-stone-500 text-xs block'>Admin@idealcar.com</span>
                </div>
                <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                    <FiChevronUp className='size-4 text-stone-500' />
                    <FiChevronDown className='size-4 text-stone-500' />
                </div>
            </button>
        </div>
    )
}