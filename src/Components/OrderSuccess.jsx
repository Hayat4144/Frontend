import React, { Fragment, useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { BsCheck2Circle } from 'react-icons/bs'

export default function OrderSuccess() {
    const [searchParams] = useSearchParams();
    const payment_method = searchParams.get('payment')
    const navigate = useNavigate()
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Set the timeout and store the ID in the ref
        timeoutRef.current = setTimeout(() => {
            navigate({ pathname: '/V2/user/account/order/history' });
        }, 5000);

        // Clear the timeout when the component unmounts or the user navigates away
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [navigate]);
    return (
        <Fragment>
            <div className={`fixed bg-gray-100 w-full inset-0 z-50 flex items-center justify-center`}>
                <div className='w-[90%] h-80 sm:w-[80%] text-center md:w-[50%] lg:w-[30%] bg-white px-5 py-5 rounded-md shadow-md'>
                    <div className="flex justify-center my-2">
                        <BsCheck2Circle className='text-5xl text-green-700 ' />
                    </div>
                    <h1 className='text-green-700 text-3xl'> {payment_method === 'online' ? 'Payment Successful' : 'Order has been placed successful.'}</h1>
                    <p className='px-2 py-2 text-gray-700'>Your {payment_method === 'online' ? 'payment' : 'order'} was successful! you will be redirect to order page soon or  you can click on the below button to check your order history.</p>
                    <button className='my-2 py-3 text-center border-none rounded-md text-white px-6 bg-indigo-700'>
                        <Link to="/V2/user/account/order/history" >Check your orders </Link>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}
