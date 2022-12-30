import React, { Fragment, lazy, Suspense, useEffect } from 'react'
const Navbar = lazy(() => import('../../UsableComponent/Navbar'))
import NavbarSkeleton from '../../Skeleton/NavbarSkeleton'
const OrderSummary = lazy(() => import('../Cart/OrderSummary'))
import Stepper from '../Steps';
import { useSelector } from 'react-redux';

export default function Payment() {
    const { IsLogdin } = useSelector(state => state.Signin)
    useEffect(() => {
        !IsLogdin ? navigate({
            pathname: "/V2/auth/sign_in",
            search: `?${createSearchParams({ 'next': Location.pathname })}`
        }) : null;
    }, [])

    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <div className="stepper_container my-10">
                <Stepper activestep={2} />
            </div>
            <section className='payment_container grid grid-cols-1 md:grid-cols-3 mx-10 my-10 gap-5'>
                <div className="payment_option_box md:col-span-2">
                    <h3 className='text-xl px-5 mb-5'>Choose a payment method</h3>
                    <form className='payment_option_form'>
                        <section className='payment_ooption border border-gray-300
                    px-5 py-5  mb-5 mx-5 rounded-md cursor-pointer'>
                            <input type="radio" hidden checked id='online-banking' className='online_banking' />
                            <label htmlFor="online-banking">
                                <h3>Online banking</h3>
                            </label>
                        </section>
                        <section className='payment_ooption border border-gray-300
                    px-5 py-5  mb-5 mx-5 rounded-md cursor-pointer'>
                            <input type="radio" hidden id='upi-payment' className='online_banking' />
                            <label htmlFor="upi-payment">
                                <h3>Upi payment</h3>
                            </label>
                        </section>
                        <section className='payment_ooption border border-gray-300
                    px-5 py-5  mb-5 mx-5 rounded-md cursor-pointer'>
                            <input type="radio" hidden id='cash-on-delivary' className='online_banking' />
                            <label htmlFor="cash-on-delivary">
                                <h3>Cash on Delivary</h3>
                            </label>
                        </section>
                    </form>

                </div>
                <Suspense fallback={<p>loadingg..</p>}>
                    <OrderSummary />
                </Suspense>
            </section>
        </Fragment>
    )
}
