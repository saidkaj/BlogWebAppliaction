import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
    return (
        <form onSubmit={e => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-40'
        >
            <h1 className='text-lg text-white text-center'>Registration</h1>
            <label className='text-xs text-gray-400'>
                Username:
                <input
                    type="text"
                    placeholder='Username'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder: text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Password:
                <input
                    type="password"
                    placeholder='Password'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder: text-gray-700'
                />
            </label>

            <div className="flex gap-8 justify-center mt-4">
                <button
                    type='submit'
                    className='flex justify-center bg-gray-600 items-center textx-xs text-white rounded-sm py-w px-4'

                >
                    Register
                </button>
                <Link
                    to="/login"
                    className="flex justify-center text-white text-xs items-center"
                >Already have an account ?</Link>
            </div>
        </form>
    )
}
