import React from 'react'
import AdminSidebar from '../admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <div className='flex h-screen p-1 gap-2'>
                <AdminSidebar />
                <div className="flex-1 p-2 bg-gray-100 rounded">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminLayout