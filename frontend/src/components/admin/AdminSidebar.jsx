import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// Icons from react-icons library
import { MdDashboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { HiTrophy } from "react-icons/hi2";

const AdminSidebar = () => {

    const location = useLocation();

    const sidebarItems = [
        { icon: MdDashboard, title: 'Dashboard', path: '/admin/dashboard' },
        { icon: FaPlus, title: 'Add Tournament', path: '/admin/add-tournament' },
        { icon: HiTrophy, title: 'Tournaments', path: '/admin/all-tournaments' },
    ]

    return (
        <div className="w-72 bg-blue-900 text-white py-5 px-2 rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">Hello Admin</h2>
            <ul>
                {sidebarItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    const IconComponent = item.icon;
                    return (
                        <li key={index} className="mb-2">
                            <Link
                                to={item.path}
                                className={`block px-4 py-2 rounded-sm transition-colors ${isActive
                                    ? 'bg-white text-blue-900 font-bold'
                                    : 'hover:bg-blue-700'
                                    }`}
                            >
                               <p className='flex items-center gap-3 tracking-wide'><IconComponent className='h-5 w-5 flex-shrink-0'/> {item.title}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default AdminSidebar