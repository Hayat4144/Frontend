import React, { Fragment, lazy, Suspense, useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, createSearchParams, useLocation, useSearchParams } from 'react-router-dom'
const Navbar = lazy(() => import('../../UsableComponent/Navbar'))
const AddressCheckout = lazy(() => import('../AddressCheckout'))
import NavbarSkeleton from '../../Skeleton/NavbarSkeleton'
import Stepper from '../Steps';

export default function Checkout() {
    const { IsLogdin } = useSelector(state => state.Signin)
    const [activeStep, setActiveStep] = useState(0)
    const navigate = useNavigate();
    const Location = useLocation()
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
