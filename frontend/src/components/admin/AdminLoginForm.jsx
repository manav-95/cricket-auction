import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLoginForm = () => {
    const navigate = useNavigate();

    const correctUsername = "admin"
    const correctPassword = "admin"

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: "", password: "", invalid: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Hide errors while typing
        setErrors({ ...errors, [name]: "", invalid: false });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = { username: "", password: "", invalid: false };

        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";

        if (formData.username !== correctUsername || formData.password !== correctPassword) {
            newErrors.invalid = true;
        }

        setErrors(newErrors);

        if (!newErrors.username && !newErrors.password && !newErrors.invalid) {
            setFormData({ username: "", password: "" });
            navigate("/admin/dashboard");
        }

    }

    return (
        <>
            <div className='flex justify-center items-center h-screen w-full'>
                <form onSubmit={handleSubmit} className='bg-gray-100 w-[500px] p-8 rounded-sm'>
                    
                    {errors.invalid && (
                        <p className='font-medium text-red-500 tracking-wider text-sm text-center mb-8'>
                            Invalid Credentials
                        </p>
                    )}

                    <div className='mb-4'>
                        <input
                            type='text'
                            name='username'
                            placeholder='Enter Username'
                            className='bg-white w-full mb-1 py-2 px-4 rounded-sm'
                            value={formData.username}
                            onChange={handleChange}
                            
                        />
                        {errors.username && (
                            <p className='mb-4 font-medium text-red-500 tracking-wider text-sm'>{errors.username}</p>
                        )}
                    </div>

                    <div className='mb-4'>
                        <input
                            type='text'
                            name='password'
                            placeholder='Enter Password'
                            className='bg-white w-full mb-1 py-2 px-4 rounded-sm'
                            value={formData.password}
                            onChange={handleChange}
                           
                        />
                        {errors.password && (
                            <p className='mb-4 font-medium text-red-500 tracking-wider text-sm'>{errors.password}</p>
                        )}
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-green-500 bg-opacity-85 py-2 px-4 mb-1 text-white font-semibold hover:bg-opacity-100 transition-colors rounded-sm'
                    >
                        Login
                    </button>

                </form>
            </div>
        </>
    )
}

export default AdminLoginForm