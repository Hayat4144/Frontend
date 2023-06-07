import React, { Fragment, lazy, Suspense, useState, useEffect } from 'react'
const Navbar = lazy(() => import('../../layout/Nav/Navbar'))
const AddressCheckout = lazy(() => import('./AddressCheckout'))
import NavbarSkeleton from '../../Skeleton/NavbarSkeleton'
import Stepper from './Steps';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const checkoutSession = sessionStorage.getItem('checkOutSession');
        if (checkoutSession !== 'active') {
            navigate('/checkout/session-expired')
        }
    }, [])

    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <div className='checkout_container'>
                <div className="stepper_container my-10">
                    <Stepper activestep={activeStep} />
                </div>
                <Suspense fallback={<p>loading</p>}>
                    <AddressCheckout />
                </Suspense>
            </div>
        </Fragment >
    )
}
