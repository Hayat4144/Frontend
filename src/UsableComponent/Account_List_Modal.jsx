import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
export default function Account_List_Modal() {
    return (
        <Fragment>
            <div className='account_modal_container w-full h-full absolute bg-black bg-opacity-20 top-14'>
                <div className='model_body bg-white w-[35%] absolute right-10'>
                    <div className='accounts text-black mx-10 w-3/4 text-center py-5 border-b border-gray-300'>
                        <button className='border-2 border-indigo-800 rounded-md shadow-md bg-indigo-800 px-11 w-3/5 py-1 text-white'><Link to="/V2/auth/sign_in">Sign in</Link></button>
                        <h3 className='new-account text-sm my-2'>New customer ? <span className='text-blue-700 px-1 hover:text-blue-900 cursor-pointer'> <Link to='/V2/auth/sign_up'> Start here</Link></span></h3>
                    </div>
                    <section className='grid grid-cols-2 mx-10 my-5'>
                        <div className='list text-black'>
                            <h3 className='font-bold '>Your List</h3>
                            <ul className='space-y-1 my-3 text-slate-800'>
                                <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>Create a list</li>
                                <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>Find a list</li>
                                <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>Share a list</li>
                            </ul>
                        </div>
                        <div className='account-details text-black'>
                            <h3 className='font-bold '>Account Details</h3>
                            <ul className='space-y-1 my-3 text-slate-800'>
                                <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>Account</li>
                                <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>Order & order history</li>
                                <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>Purchase</li>
                                <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>Settings</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    )
}
