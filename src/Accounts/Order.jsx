import React, { Fragment } from 'react'
import { Suspense } from 'react'
import { lazy } from 'react'
const Navbar = lazy(() => import('../UsableComponent/Navbar'))
const Footer = lazy(() => import('../UsableComponent/Footer'))
import NavbarSkeleton from '../Skeleton/NavbarSkeleton'



export default function Order() {
    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            Order page is here
            <div className='my-10 mb-0'>
                <Suspense fallback={<p>loading....</p>}>
                    <Footer />
                </Suspense>
            </div>

        </Fragment>

    )
}
