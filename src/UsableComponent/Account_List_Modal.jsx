import React, { Fragment, useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Account_List_Modal({ Modalopen, AccountModalToggle }) {
    const [isModalOpen, setIsModalOpen] = useState(Modalopen) // setinitalstate of false to this modal state 
    const { IsLogdin } = useSelector(state => state.Signin)
   

    // change the state of this modal every time when parent state change
    useEffect(() => {
        setIsModalOpen(Modalopen)
    }, [Modalopen])

    const dispatch = useDispatch();


    // ------------------------- logout functionality ---------------------- //
    const logoutFunc  = async()=>{
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/v3/api/user/logout` , {
            method:"GET",
            headers:{
                'Content-Type':"application/json"
            },
            credentials:'include'
        }).then(async res=>{
            const {data,error} = await res.json();
            if(res.status !== 200){
                toast.error(error, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return ;
            }
            dispatch({type:"LOGOUT"})
            toast.success(data, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
        
    }

    return (
        <Fragment>
            <div className={`model_body bg-white w-[35%] ${isModalOpen ? 'absolute' : 'hidden'}
            right-10 shadow-2xl z-50 top-[76px]`}
                onMouseLeave={() => {
                    //  --- change the modal state of this component to change the parent modal state 
                    // --- AccountModalToggle function is passed from parent to child component to change 
                    // --- the state of both component state
                    AccountModalToggle(isModalOpen)
                }}>
                <div className='accounts text-black mx-10 w-3/4 text-center py-5 border-b border-gray-300'>
                    {IsLogdin ?
                        <button className='border-2 border-indigo-800 rounded-md shadow-md bg-indigo-800 px-11 w-3/5 py-1 text-white' onClick={logoutFunc}>Log out</button>
                        :
                        <Link to="/V2/auth/sign_in">
                            <span className='border-2 border-indigo-800 rounded-md shadow-md bg-indigo-800 px-11 w-3/5 py-1 text-white'>Sign in</span>
                        </Link>
                    }
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
                            <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>
                                <Link to={'/V2/user/account'}>
                                    Account
                                </Link>
                            </li>
                            <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>
                                <Link to={'/V2/user/account/order/history'}>
                                    Order & order history
                                </Link>
                            </li>
                            {/* <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>Purchase</li>
                            <li className='text-sm hover:text-indigo-800 cursor-pointer hover:underline'>Settings</li> */}
                        </ul>
                    </div>
                </section>
            </div>
        </Fragment >
    )
}
